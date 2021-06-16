const gtinResolver = require("gtin-resolver");
function verifyIfProductPhotoMessage(message){
    return message.messageType === "ProductPhoto" && typeof message.productCode !== "undefined" && message.imageData !=="undefined";
}

async function processProductPhotoMessage(message){
    const constants = require("./../utils").constants;
    const productCode = message.productCode;
    const mappingLogService = require("./logs").createInstance(this.storageService);
    let version;
    const gtinSSI = gtinResolver.createGTIN_SSI(this.options.holderInfo.domain, this.options.holderInfo.subdomain, productCode);
    let prodDSU;
    try {
        prodDSU = await this.loadDSU(gtinSSI);
    } catch (err) {
        await mappingLogService.logFailedMapping(message, "lookup", constants.MISSING_PRODUCT_DSU);
        throw new Error("Product not found");
    }

    if (!prodDSU) {
        await mappingLogService.logFailedMapping(message,  "lookup", constants.MISSING_PRODUCT_DSU);
        throw new Error("Fail to create a batch for a missing product");
    }

        let latestProductMetadata;
        try{
            latestProductMetadata = await this.storageService.getRecord(constants.LAST_VERSION_PRODUCTS_TABLE, productCode);
            this.product = JSON.parse(JSON.stringify(latestProductMetadata));
        }
        catch (e){}

        if(latestProductMetadata && latestProductMetadata.version){
            version = latestProductMetadata.version;
            //TODO:increase version for photo update?
            //version = latestProductMetadata.version + 1;
        }
        else{
            await mappingLogService.logFailedMapping(message, "lookup","Database corrupted");
            throw new Error("This case is not implemented. Missing product from the wallet database or database is corrupted");
        }


    const indication =  {product:"/"+version+"/product.json"};
    await this.loadJSONS(prodDSU, indication);
    console.log(this.product);
    let hasPhoto = this.product.photo.length > 0;
    this.product.photo = message.imageData;
    await this.saveJSONS(prodDSU, indication);


    if(typeof this.options.logService!=="undefined"){
        await $$.promisify(this.options.logService.log.bind(this.options.logService))({
            logInfo: this.product,
            username: message.senderId,
            action: hasPhoto?"Updated Product Photo":"Edited Product Photo",
            logType: 'PRODUCT_LOG'
        });

        await this.storageService.updateRecord(constants.PRODUCTS_TABLE, `${this.product.gtin}|${this.product.version}`, this.product);
        await this.storageService.updateRecord(constants.LAST_VERSION_PRODUCTS_TABLE, this.product.gtin, this.product);
    }
    else{
        throw new Error("LogService is not available!")
    }

    await mappingLogService.logSuccessMapping(message, hasPhoto ? "updated photo" : "created photo");

}

require("opendsu").loadApi("m2dsu").defineMapping(verifyIfProductPhotoMessage, processProductPhotoMessage);