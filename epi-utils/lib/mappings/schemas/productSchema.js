module.exports = {
  "type": "object",
  "properties":
    {
      "messageType": {"type": "string"},
      "messageTypeVersion": {"type": "number"},
      "senderId": {"type": "string"},
      "receiverId": {"type": "string"},
      "messageId": {"type": "string"},
      "messageDateTime": {"type": "string"},
      "product": {
        "type": "object",
        "properties": {
          "productCode": {"type": "string", "required": true},
          "internalMaterialCode": {"type": "string", "required": true},
          "inventedName": {"type": "string", "required": true},
          "nameMedicinalProduct": {"type": "string", "required": true},
          "strength": {"type": "string", "required": false},
          "videoLink": {"type": "string", "required": false},
          "flagEnableAdverseEventReporting": {"type": "boolean"},
          "adverseEventReportingURL": {"type": "string"},
          "flagEnableACFProductCheck": {"type": "boolean"},
          "acfProductCheckURL": {"type": "string"},
          "flagDisplayEPI_BatchRecalled": {"type": "boolean"},
          "flagDisplayEPI_SNRecalled": {"type": "boolean"},
          "flagDisplayEPI_SNDecommissioned": {"type": "boolean"},
          "flagDisplayEPI_SNUnknown": {"type": "boolean", "required": true},
          "flagDisplayEPI_EXPIncorrect": {"type": "boolean"},
          "flagDisplayEPI_BatchExpired": {"type": "boolean"},
          "patientSpecificLeaflet": {"type": "string"},
          "healthcarePractitionerInfo": {"type": "string"},
          "markets": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "marketId": {"type": "string", "required": true},
                "nationalCode": {"type": "string", "required": true},
                "mahName": {"type": "string"},
                "legalEntityName": {"type": "string"},
              }
            }
          }
        }
      }
    }
}
