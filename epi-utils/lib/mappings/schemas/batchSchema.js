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
      "batch": {
        "type": "object", "required": true,
        "properties": {
          "productCode": {"type": "string", "required": true},
          "batch": {"type": "string", "required": true},
          "expiryDate": {"type": "string", "required": true, regex: /^[\d+]{6}$/},
          "packagingSiteName": {"type": "string"},
          "epiLeafletVersion": {"type": "number"},
          "flagEnableEXPVerification": {"type": "boolean"},
          "flagEnableExpiredEXPCheck": {"type": "boolean"},
          "batchMessage": {"type": "string"},
          "flagEnableBatchRecallMessage": {"type": "boolean"},
          "recallMessage": {"type": "string"},
          "flagEnableACFBatchCheck": {"type": "boolean"},
          "acfBatchCheckURL": {"type": "string"},
          "flagEnableSNVerification": {"type": "boolean"},
          // ACDC PATCH START
          "acdcAuthFeatureSSI": {"type": "string"},
          // ACDC PATCH END
          "snValidReset": {"type": "boolean"},
          "snValid": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        }
      }
    }
}
