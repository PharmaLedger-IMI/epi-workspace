function verifyIfLeafletMessage(message) {
    return message.messageType === "leaflet" || message.messageType === "smpc";
}

async function processLeafletMessage(message) {
    const constants = require("./../utils").constants;
    const productCode = message.productCode;
    const mappingLogService = require("./logs").createInstance(this.storageService);
    let language = message.language;
    let type = message.messageType

    let prodDSU;
    let productMetadata;


    try {
        productMetadata = await this.storageService.getRecord(constants.PRODUCTS_TABLE, productCode);
        prodDSU = await this.loadDSU(productMetadata.keySSI);
    } catch (err) {
        await mappingLogService.logFailedMapping(message, "lookup", constants.MISSING_PRODUCT_DSU);
        throw new Error("Product not found");
    }

    if (!prodDSU) {
        await mappingLogService.logFailedMapping(message, "lookup", constants.MISSING_PRODUCT_DSU);
        throw new Error(`Fail to create a ${type} for a missing product`);
    }

    const dsuKeySSI = await prodDSU.getKeySSIAsString();
    console.log("DSU keySSI", dsuKeySSI);

    let basePath = `/${type}/${language}`
    let xmlFilePath = `${basePath}/${type}.xml`;
    let base64ToArrayBuffer = require("./../utils").base64ToArrayBuffer;
    let base64XMLFileContent = base64ToArrayBuffer(message.xmlFileContent);

    try {
        await prodDSU.writeFile(xmlFilePath, $$.Buffer.from(base64XMLFileContent));

        for (let i = 0; i < message.otherFilesContent.length; i++) {
            let file = message.otherFilesContent[i];
            let filePath = `${basePath}/${file.filename}`;
            await prodDSU.writeFile(filePath, $$.Buffer.from(base64ToArrayBuffer(file.fileContent)));
        }
        await mappingLogService.logSuccessMapping(message, "updated leaflet");
    } catch (e) {
        console.log("Error writing files in DSU", e);
    }
}

require("opendsu").loadApi("m2dsu").defineMapping(verifyIfLeafletMessage, processLeafletMessage);
