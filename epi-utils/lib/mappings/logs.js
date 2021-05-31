const constants = require("./utils").constants;

function MappingLogService(storageService){
     this.storageService = storageService;

     this.getMappingLogs =  (callback) =>{
          this.storageService.filter(constants.IMPORT_LOGS, "__timestamp > 0",callback);
     }

     this.logMapping = async (message, identifier, action, status) => {
          const constants = require("./utils").constants;
          const currentDate = new Date().getTime();

          let logData = {
               timestamp: currentDate,
               action: action,
               status: status,
               message: message
          }
          await this.storageService.insertRecord(constants.IMPORT_LOGS, identifier + "|" + currentDate, logData);
     }
}


let instance;

module.exports.createInstance = function (storageService) {
     if (!instance) {
          instance = new MappingLogService(storageService);
     }
     return instance;
}