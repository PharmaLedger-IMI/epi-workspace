const constants = require("./../../utils").constants;

module.exports = {

    getHostDSU: async function(message){
        const tablesMappings = {
            "product": {
                tableName: constants.PRODUCTS_TABLE,
                missingDSUMessage: constants.MISSING_PRODUCT_DSU,
            },
            "batch": {
                tableName: constants.BATCHES_STORAGE_TABLE,
                missingDSUMessage: constants.MISSING_BATCH_DSU,
            }
        };
        const databaseRecordIdentifier = message.productCode ? message.productCode : message.batchCode;
        const mappingLogService = require("./../logs").createInstance(this.storageService);

        let hostDSU;
        let dsuMetadata;
        let type = message.messageType

        let dsuMapping = tablesMappings["product"];
        if (message.batchCode) {
            dsuMapping = tablesMappings["batch"];
        }

        try {
            dsuMetadata = await this.storageService.getRecord(dsuMapping.tableName, databaseRecordIdentifier);
            hostDSU = await this.loadDSU(dsuMetadata.keySSI);
        } catch (err) {
            await mappingLogService.logFailedMapping(message, "lookup", dsuMapping.missingDSUMessage);
            throw new Error(dsuMapping.missingDSUMessage);
        }

        if (!hostDSU) {
            await mappingLogService.logFailedMapping(message, "lookup", dsuMapping.missingDSUMessage);
            throw new Error(`Fail to create a ${type} for a missing ${message.productCode ? "product" : "batch"}`);
        }
        return hostDSU;
    }

}