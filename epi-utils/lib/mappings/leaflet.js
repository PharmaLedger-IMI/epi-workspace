function verifyIfLeafletMessage(message){
    return message.messageType === "leaflet" || message.messageType === "smpc";
}

async function processLeafletMessage(message){
    const constants = require("./../utils").constants;
    const productCode = message.productCode;
    const mappingLogService = require("./logs").createInstance(this.storageService);
    let language = message.language;
    let type = message.messageType
    let inherited = message.inherited;

    let prodDSU;
    let latestProductMetadata;


    try {
        latestProductMetadata = await this.storageService.getRecord(constants.LAST_VERSION_PRODUCTS_TABLE, productCode);
        prodDSU = await this.loadDSU(latestProductMetadata.keySSI);
    } catch (err) {
        await mappingLogService.logFailedMapping(message, "lookup", constants.MISSING_PRODUCT_DSU);
        throw new Error("Product not found");
    }

    if (!prodDSU) {
        await mappingLogService.logFailedMapping(message,  "lookup", constants.MISSING_PRODUCT_DSU);
        throw new Error(`Fail to create a ${type} for a missing product`);
    }

    if(latestProductMetadata && latestProductMetadata.version){
        const dsuKeySSI = await prodDSU.getKeySSIAsString();
        console.log("DSU keySSI", dsuKeySSI);

        if (inherited === true && latestProductMetadata.version === 1) {
            await mappingLogService.logFailedMapping(message, "create", `${type} could not be inherited`);
            throw new Error(`Product version is too low for ${type} inheriting`);
        } else {
            if (inherited === true) {
                let sourceFolder = `/product/${latestProductMetadata.version-1}/${type}/${language}`
                let destFolder =  `/product/${latestProductMetadata.version}/${type}/${language}`
                await prodDSU.cloneFolder(sourceFolder,destFolder);
            }
            else{
                let basePath = `/product/${latestProductMetadata.version}/${type}/${language}`
                let xmlFilePath = `${basePath}/${type}.xml`;
                let base64ToArrayBuffer = require("./../utils").base64ToArrayBuffer;
                let base64XMLFileContent = base64ToArrayBuffer(message.xmlFileContent);

                try{
                    await prodDSU.writeFile(xmlFilePath, $$.Buffer.from(base64XMLFileContent));

                    for (let i = 0; i < message.otherFilesContent.length; i++) {
                        let file = message.otherFilesContent[i];
                        let filePath = `${basePath}/${file.filename}`;
                        await prodDSU.writeFile(filePath, $$.Buffer.from(base64ToArrayBuffer(file.fileContent)));
                    }
                    await mappingLogService.logSuccessMapping(message, "updated leaflet");
                }
                catch (e){
                    console.log("Error writing files in DSU",e);
                }
            }
        }

    }
    else {
        await mappingLogService.logFailedMapping(message,  "lookup", constants.MISSING_PRODUCT_VERSION);
        throw new Error(`Fail to create a ${type} for a missing product version`);
    }
}

require("opendsu").loadApi("m2dsu").defineMapping(verifyIfLeafletMessage, processLeafletMessage);