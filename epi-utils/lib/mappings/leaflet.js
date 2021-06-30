function verifyIfLeafletMessage(message) {
    return ["leaflet", "smpc"].includes(message.messageType)
        && Object.keys(message).some(key => ['productCode', 'batchCode'].includes(key))
}

async function processLeafletMessage(message) {
    const constants = require("./../utils").constants;
    const tablesMappings = {
        "product": {
            tableName: constants.PRODUCTS_TABLE,
            missingDSUMessage: constants.MISSING_PRODUCT_DSU,
        },
        "batch": {
            tableName: constants.BATCHES_STORAGE_TABLE,
            missingDSUMessage: constants.MISSING_BATCH_DSU,
        }
    }
    const databaseRecordIdentifier = message.productCode ? message.productCode : message.batchCode;
    const mappingLogService = require("./logs").createInstance(this.storageService);
    let language = message.language;
    let type = message.messageType

    let hostDSU;
    let dsuMetadata;

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
        throw new Error(`Fail to create a ${type} for a missing ${message.productCode?"product":"batch"}`);
    }

    const dsuKeySSI = await hostDSU.getKeySSIAsString();
    console.log("DSU keySSI", dsuKeySSI);

    let basePath = `/${type}/${language}`
    let xmlFilePath = `${basePath}/${type}.xml`;
    let base64ToArrayBuffer = require("./../utils").base64ToArrayBuffer;
    let base64XMLFileContent = base64ToArrayBuffer(message.xmlFileContent);

    try {
        await hostDSU.writeFile(xmlFilePath, $$.Buffer.from(base64XMLFileContent));

        for (let i = 0; i < message.otherFilesContent.length; i++) {
            let file = message.otherFilesContent[i];
            let filePath = `${basePath}/${file.filename}`;
            await hostDSU.writeFile(filePath, $$.Buffer.from(base64ToArrayBuffer(file.fileContent)));
        }
        await mappingLogService.logSuccessMapping(message, "updated leaflet");
    } catch (e) {
        console.log("Error writing files in DSU", e);
    }
}

require("opendsu").loadApi("m2dsu").defineMapping(verifyIfLeafletMessage, processLeafletMessage);
