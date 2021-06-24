function verifyIfProductPhotoMessage(message){
    return message.messageType === "ProductPhoto" && typeof message.productCode !== "undefined" && message.imageData !=="undefined";
}

async function processProductPhotoMessage(message){
    const constants = require("./../utils").constants;
    const productCode = message.productCode;
    const inherited = message.inherited;

    const mappingLogService = require("./logs").createInstance(this.storageService);
    let version;
    let prodDSU;
    let latestProductMetadata;

    try {
        latestProductMetadata = await this.storageService.getRecord(constants.PRODUCTS_TABLE, productCode);
        prodDSU = await this.loadDSU(latestProductMetadata.keySSI);
        this.product = JSON.parse(JSON.stringify(latestProductMetadata));
    } catch (err) {
        await mappingLogService.logFailedMapping(message, "lookup", constants.MISSING_PRODUCT_DSU);
        throw new Error("Product not found");
    }

    if (!prodDSU) {
        await mappingLogService.logFailedMapping(message,  "lookup", constants.MISSING_PRODUCT_DSU);
        throw new Error("Fail to create a batch for a missing product");
    }

    if(latestProductMetadata && latestProductMetadata.version){
        version = latestProductMetadata.version;
    }
    else{
        await mappingLogService.logFailedMapping(message, "lookup","Database corrupted");
        throw new Error("This case is not implemented. Missing product from the wallet database or database is corrupted");
    }

    let base64ToArrayBuffer = require("./../utils").base64ToArrayBuffer;
    let photoPath = `/image.png`
    let productPhotoStat  = await prodDSU.stat(photoPath);
    let previousVersionHasPhoto = true;

    if( typeof productPhotoStat === "undefined"){
        previousVersionHasPhoto = false;
    }

    await prodDSU.writeFile(photoPath, $$.Buffer.from(base64ToArrayBuffer(message.imageData)));

    await mappingLogService.logSuccessMapping(message, previousVersionHasPhoto ? "updated photo" : "created photo");

    if(typeof this.options.logService!=="undefined"){
        await $$.promisify(this.options.logService.log.bind(this.options.logService))({
            logInfo: this.product,
            username: message.senderId,
            action: previousVersionHasPhoto?"Updated Product Photo":"Edited Product Photo",
            logType: 'PRODUCT_LOG'
        });
        //this is needed in order to ensure an update event when a photo is updated from an incoming message through import file or apihub mapping
        await this.storageService.updateRecord(constants.PRODUCTS_TABLE, this.product.gtin, this.product);
    }
    else{
        throw new Error("LogService is not available!")
    }
}

require("opendsu").loadApi("m2dsu").defineMapping(verifyIfProductPhotoMessage, processProductPhotoMessage);