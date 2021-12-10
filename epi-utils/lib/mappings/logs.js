const constants = require("./../utils").constants;

function MappingLogService(storageService){
     this.storageService = storageService;

     this.getMappingLogs =  (callback) =>{
          this.storageService.filter(constants.IMPORT_LOGS, "__timestamp > 0",callback);
     }

     this.logSuccessMapping = async (message, action, status) => {
          return await logMapping(message, action, status ? status : constants.SUCCESS_MAPPING_STATUS);
     }

     this.logFailedMapping = async (message, action, status) => {
          return await logMapping(message, action, status ? status : constants.FAILED_MAPPING_STATUS);
     }

     let logMapping = async (message, action, status) => {
          const constants = require("./../utils").constants;
          const currentDate = new Date().getTime();

          let itemCode;
          let itemType;

          switch (true) {
               case typeof message.product === "object":
                    itemCode = message.product.productCode;
                    itemType = "product";
                    break;
               case typeof message.batch === "object":
                    itemCode = message.batch.batch;
                    itemType = "batch";
                    break;
               case  message.messageType === "ProductPhoto":
                    itemCode = message.productCode;
                    itemType = "product-image";
                    break;
               case  ["leaflet", "smpc"].indexOf(message.messageType) !== -1:
                    itemCode = message.productCode ? message.productCode : message.batchCode;
                    itemType = message.messageType;
                    break;
               default:
                    if (message.product && message.product.productCode) {
                         itemCode = message.product.productCode;
                    } else {
                         itemCode = "unknown"
                    }
                    if (message.messageType) {
                         itemType = message.messageType;
                    } else {
                         itemType = "unknown"
                    }

          }

          let logData = {
               itemCode: itemCode,
               itemType: itemType,
               timestamp: currentDate,
               action: action,
               status: status,
               message: message
          }
          try {
               await this.storageService.insertRecord(constants.IMPORT_LOGS, logData.itemCode + "|" + currentDate, logData);
          }
          catch (e){
               console.log(e);
          }

     }
}


let instance;

module.exports.createInstance = function (storageService) {
     if (!instance) {
          instance = new MappingLogService(storageService);
     }
     return instance;
}
