const itemValidator = function (messageValue, schemaObj, schemaKey) {

  if (!messageValue && !schemaObj.required) {
    return;
  }

  if ((messageValue === null || messageValue === undefined) && schemaObj.required) {
    invalidFields.push({field: schemaKey, message: `Required field`});
    return;
  }

  if (schemaObj.regex && !schemaObj.regex.test(messageValue)) {
    invalidFields.push({field: schemaKey, message: `Invalid format`});
    return;
  }

  if (schemaObj.type === "date") {
    let d = new Date(messageValue);
    if (d.toString() === "Invalid Date") {
      invalidFields.push({
        field: schemaKey,
        message: `Wrong date format`
      });
    }
    return;
  }

  if ((schemaObj.type !== "array" && schemaObj.type !== typeof messageValue) || (schemaObj.type === "array" && !Array.isArray(messageValue))) {
    invalidFields.push({
      field: schemaKey,
      message: `Wrong type. Found ${typeof messageValue} , expected ${schemaObj.type}`
    });
    return;
  }
}

const schemaParser = function (message, schema) {
  const schemaObject = schema.properties;
  const schemaKeys = Object.keys(schemaObject);
  for (let i = 0; i < schemaKeys.length; i++) {
    const schemaKey = schemaKeys[i];
    if (schemaObject[schemaKey].type === "object") {
      if (!message[schemaKey]) {
        itemValidator(message[schemaKey], schemaObject[schemaKey], schemaKey);
      } else {
        schemaParser(message[schemaKey], schemaObject[schemaKey]);
      }
    }
    if (schemaObject[schemaKey].type === "array" && Array.isArray(message[schemaKey])) {
      message[schemaKey].forEach(msg => {
        if (schemaObject[schemaKey].items.type === "object") {
          schemaParser(msg, schemaObject[schemaKey].items)
        } else {
          itemValidator(msg, schemaObject[schemaKey].items, schemaKey);
        }

      })
    }
    if (schemaObject[schemaKey].type !== "object" && schemaObject[schemaKey].type !== "array") {
      if (!message[schemaKey] && schemaObject[schemaKey].defaultValue) {
        message[schemaKey] = schemaObject[schemaKey].defaultValue;
      } else {
        itemValidator(message[schemaKey], schemaObject[schemaKey], schemaKey);
      }
    }
  }

}
let invalidFields;
const validateMsgOnSchema = function (message, schema) {
  invalidFields = [];
  schemaParser(message, schema);
  if (invalidFields.length > 0) {
    return {
      valid: false, invalidFields: invalidFields
    }
  }
  return {
    valid: true
  }
}
module.exports = {
  validateMsgOnSchema
}

