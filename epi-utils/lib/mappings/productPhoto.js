function verifyIfProductPhotoMessage(message) {
  return message.messageType === "ProductPhoto";
}

async function processProductPhotoMessage(message) {
  const constants = require("./../utils").constants;
  const productCode = message.productCode;
  const mappingLogService = require("./logs").createInstance(this.storageService);
  const errMap = require("opendsu").loadApi("m2dsu").getErrorsMap();
  errMap.addNewErrorType("PHOTO_MISSING_PRODUCT", 10, "Fail to create a product photo for a missing product");

  let prodDSU;
  let productMetadata;

  try {
    productMetadata = await this.storageService.getRecord(constants.PRODUCTS_TABLE, productCode);
    prodDSU = await this.loadDSU(productMetadata.keySSI);
    this.product = JSON.parse(JSON.stringify(productMetadata));
  } catch (err) {
    await mappingLogService.logFailedMapping(message, "lookup", `${err.message}` || `${constants.DSU_LOAD_FAIL}`);
    throw errMap.newCustomError(errMap.errorTypes.PHOTO_MISSING_PRODUCT, "productCode");
  }

  let base64ToArrayBuffer = require("./../utils").base64ToArrayBuffer;
  let photoPath = `/image.png`
  let productPhotoStat = await prodDSU.stat(photoPath);
  let previousVersionHasPhoto = true;

  if (typeof productPhotoStat.type === "undefined") {
    previousVersionHasPhoto = false;
  }

  await prodDSU.writeFile(photoPath, $$.Buffer.from(base64ToArrayBuffer(message.imageData)));

  await mappingLogService.logSuccessMapping(message, previousVersionHasPhoto ? "updated photo" : "created photo");

  if (typeof this.options.logService !== "undefined") {
    await $$.promisify(this.options.logService.log.bind(this.options.logService))({
      logInfo: message,
      username: message.senderId,
      action: previousVersionHasPhoto ? "Updated Product Photo" : "Edited Product Photo",
      logType: 'PRODUCT_PHOTO_LOG',
      metadata: {
        attachedTo: "PRODUCT",
        itemCode: productCode
      }
    });
    //this is needed in order to ensure an update event when a photo is updated from an incoming message through import file or apihub mapping
    await this.storageService.updateRecord(constants.PRODUCTS_TABLE, this.product.gtin, this.product);
  } else {
    throw new Error("LogService is not available!")
  }
}

require("opendsu").loadApi("m2dsu").defineMapping(verifyIfProductPhotoMessage, processProductPhotoMessage);
