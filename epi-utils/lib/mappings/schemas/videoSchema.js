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
      "videos": {
        "type": "object", "required": true,
        "properties": {
          "productCode": {"type": "string", "required": true},
          "source": {"type": "string", "required": false},
          "batch": {"type": "string", "required": false},
          "sources": {
            "type": "array", "required": false,
            "items": {
              "type": "object",
              "properties": {
                "documentType": {"type": "string"},
                "lang": {"type": "string"},
                "source": {"type": "string"}
              }
            }
          }
        }
      }
    }
}
