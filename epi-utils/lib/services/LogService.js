const constants = require('../utils').constants;
const getSharedStorageInstance  = require("./SharedDBStorageService.js").getSharedStorageInstance;

module.exports = class LogService {

    constructor(dsuStorage, logsTable) {
        this.storageService = getSharedStorageInstance(dsuStorage);
        if (typeof logsTable === "undefined") {
            this.logsTable = constants.LOGS_TABLE;
        } else {
            this.logsTable = logsTable;
        }
    }

    log(logDetails, callback) {
        if (logDetails === null || logDetails === undefined) {
            return;
        }

        const log = {
            ...logDetails,
            timestamp: new Date().getTime()
        };

        this.storageService.insertRecord(this.logsTable, log.timestamp, log, (err) => {
            if (err) {
                return callback(err);
            }
            callback(undefined, true);
        });
    }

    getLogs(callback) {
        this.storageService.filter(this.logsTable, "__timestamp > 0", callback);
    }
}
