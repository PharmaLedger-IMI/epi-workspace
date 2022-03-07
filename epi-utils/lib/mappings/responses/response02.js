module.exports = function () {
  this.setMessageType = (type) => {
    type = type ? type.toLowerCase() : "";
    switch (type) {
      case "product":
        this.messageType = "ProductResponse";
        break;
      case "batch":
        this.messageType = "BatchResponse";
        break;
      case "productphoto":
        this.messageType = "ProductPhotoResponse";
        break;
      case "videosource":
        this.messageType = "VideoSourceResponse";
        break;
      default:
        this.messageType = "UnknownTypeResponse";
        break;
    }
  }
  this.messageTypeVersion = 0.2;
  this.setSenderId = (senderID) => {
    this.senderId = senderID
  }
  this.setReceiverId = (receiverID) => {
    this.receiverId = receiverID
  }
  this.messageId = generate(13);
  this.messageDateTime = new Date();
  this.setRequestData = (requestObj) => {
    this.requestMessageType = requestObj.messageType;
    this.requestMessageTypeVersion = requestObj.messageTypeVersion;
    this.requestMessageId = requestObj.messageId
    this.requestMessageDateTime = requestObj.messageDateTime;
  }
  this.response = [];
  this.addSuccessResponse = () => {
    if (this.response.length) {
      console.log('Possible response already set.');
      return;
    }
    this.response.push({
      "responseCounter": 1,
      "responseType": 100,
      "responseDescription": "Message successfully digested"
    });
  }
  this.addErrorResponse = (type, message, details, field) => {
    this.response.push({
      "responseCounter": this.response.length + 1,
      "responseType": type,
      "responseDescription": message,
      "errorData": details,
      "errorDataField": field
    })
  }

}

function generate(n) {
  let add = 1,
    max = 12 - add;

  if (n > max) {
    return generate(max) + generate(n - max);
  }

  max = Math.pow(10, n + add);
  var min = max / 10; // Math.pow(10, n) basically
  var number = Math.floor(Math.random() * (max - min + 1)) + min;

  return ("" + number).substring(add);
}


