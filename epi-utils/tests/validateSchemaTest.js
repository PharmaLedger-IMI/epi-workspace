require("../../privatesky/psknode/bundles/testsRuntime");
require("callflow").initialise();
const assert = require("double-check").assert;

const schema = {
  "type": "object",
  "properties":
    {
      "messageStr1": {"type": "string", "required": true},
      "messageStr2": {"type": "string", regex: /^[\d+]{6}$/},
      "messageStr3": {"type": "string"},
      "messageStr4": {"type": "string", "defaultValue": "test"},
      "messageDate1": {"type": "date", "required": true},
      "messageDate2": {"type": "date"},
      "messageBool1": {"type": "boolean"},
      "messageBool2": {"type": "boolean", "required": true},
      "messageObj1": {
        "type": "object",
        "properties": {
          "messageObjStr1": {"type": "string", "required": true},
          "messageObjStr2": {"type": "string", regex: /^[\d+]{6}$/},
          "messageObjStr3": {"type": "string"},
          "messageObjStr4": {"type": "string", "defaultValue": "test"},
          "messageObjDate1": {"type": "date", "required": true},
          "messageObjDate2": {"type": "date"},
          "messageObjBool1": {"type": "boolean"},
          "messageObjBool2": {"type": "boolean", "required": true},
        },
        "messageArr1": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "messageArrObjStr1": {"type": "string", "required": true},
              "messageArrObjStr2": {"type": "string", regex: /^[\d+]{6}$/},
              "messageArrObjStr3": {"type": "string"},
              "messageArrObjStr4": {"type": "string", "defaultValue": "test"},
              "messageArrObjDate1": {"type": "date", "required": true},
              "messageArrObjDate2": {"type": "date"},
              "messageArrObjBool1": {"type": "boolean"},
              "messageArrObjBool2": {"type": "boolean", "required": true},
            }
          }
        },
        "messageArr2": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    }
}
const message = {
  "messageStr1": "string 1",
  "messageStr2": "123456",
  "messageStr3": "string 3",
  "messageStr4": "",
  "messageDate1": "12-12-2020",
  "messageDate2": "12-12-2020 00:00",
  "messageBool1": true,
  "messageBool2": false,
  "messageObj1": {
    "messageObjStr1": "object string 1",
    "messageObjStr2": "654321",
    "messageObjStr3": "object string 3",
    "messageObjStr4": "",
    "messageObjDate1": "11-11-2020",
    "messageObjDate2": "12-11-2020 00:00",
    "messageObjBool1": true,
    "messageObjBool2": false
  },
  "messageArr1": [{
    "messageArrObjStr1": "array item1 object string 1",
    "messageArrObjStr2": "111111",
    "messageArrObjStr3": "array item1 object string 3",
    "messageArrObjStr4": "",
    "messageArrObjDate1": "01-01-2020",
    "messageArrObjDate2": "01-01-2020 01:00",
    "messageArrObjBool1": true,
    "messageArrObjBool2": false
  },
    {
      "messageArrObjStr1": "array item2 object string 1",
      "messageArrObjStr2": "222222",
      "messageArrObjStr3": "array item2 object string 3",
      "messageArrObjStr4": "",
      "messageArrObjDate1": "02-02-2020",
      "messageArrObjDate2": "02-02-2020 02:00",
      "messageArrObjBool1": true,
      "messageArrObjBool2": false
    },
    {
      "messageArrObjStr1": "array item3 object string 1",
      "messageArrObjStr2": "333333",
      "messageArrObjStr3": "array item3 object string 3",
      "messageArrObjStr4": "",
      "messageArrObjDate1": "03-03-2020",
      "messageArrObjDate2": "03-03-2020 03:00",
      "messageArrObjBool1": true,
      "messageArrObjBool2": false
    }
  ],
  "messageArr2": ["item1", "item2", "item3", "item4"]
}


$$.flows.describe("SchemaValidate", {
  start: function (callback) {
    this.callback = callback;

    const schemaValidator = require("./../lib/mappings/utils/schema-validator");
    let validationResult = schemaValidator.validateMsgOnSchema(message, schema);
    if (!validationResult.valid) {
      validationResult.invalidFields.forEach(item => console.log(item.message));
    }
    assert.true(validationResult.valid);
    //TODO change message values and test if test pass
    this.callback();
  }
});

assert.callback("SchemaValidate test", (callback) => {
  $$.flows.start("SchemaValidate", "start", callback);
}, 1000);
