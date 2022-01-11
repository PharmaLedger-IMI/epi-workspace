function verifyIfVideoMessage(message) {
  return message.messageType === "VideoSource";
}

async function processVideoMessage(message) {
  const utils = require("./../utils");
  const errMap = require("opendsu").loadApi("m2dsu").getErrorsMap();
  errMap.addNewErrorType("VIDEO_SOURCE_MISSING_PRODUCT", 8, "Fail to add video source for a missing product");
  errMap.addNewErrorType("VIDEO_SOURCE_MISSING_PRODUCT", 9, "Fail to add video source for missing batch for or missing product");
  const mappingLogService = require("./logs").createInstance(this.storageService);

  const schemaValidator = require("./utils/schema-validator");
  const schema = require("./schemas/videoSchema");
  const msgValidation = schemaValidator.validateMsgOnSchema(message, schema);

  if (!msgValidation.valid) {
    message.invalidFields = msgValidation.invalidFields;
    await mappingLogService.logFailedMapping(message, "lookup", "Invalid message format");
    throw errMap.newCustomError(errMap.errorTypes.INVALID_MESSAGE_FORMAT, msgValidation.invalidFields);
  }

  const productCode = message.videos.productCode;

  let prodDSU;
  let productMetadata;
  try {
    productMetadata = await this.storageService.getRecord(constants.PRODUCTS_TABLE, productCode);
    prodDSU = await this.loadDSU(productMetadata.keySSI);
  } catch (err) {
    await mappingLogService.logFailedMapping(message, "lookup", utils.constants.MISSING_PRODUCT_DSU);
    throw new Error("Product not found");
  }

  if (!prodDSU) {
    await mappingLogService.logFailedMapping(message, "lookup", utils.constants.MISSING_PRODUCT_DSU);
    throw errMap.newCustomError(errMap.errorTypes.VIDEO_SOURCE_MISSING_PRODUCT, "productCode");
  }

  if (message.videos.batch) {
    //batch id means its saved on batch
    const batchId = message.videos.batch;
    if (!productMetadata) {
      throw errMap.newCustomError(errMap.errorTypes.DB_OPERATION_FAIL, "productCode");
    }
    batchMetadata = await this.storageService.getRecord(utils.constants.BATCHES_STORAGE_TABLE, batchId);
    batchDSU = await this.loadDSU(batchMetadata.keySSI);
    const indication = {batch: `${utils.constants.BATCH_STORAGE_FILE}`};

    await this.loadJSONS(batchDSU, indication);
    if (typeof this.batch === "undefined") {
      this.batch = JSON.parse(JSON.stringify(batchMetadata));
    }
    if (!this.batch.videos) {
      this.batch.videos = {}
    }

    if (message.videos.sources) {
      this.batch.videos = {
        defaultSource: this.batch.videos.defaultSource
      }
      message.videos.sources.forEach(docSource => {
        let key = `${docSource.documentType}/${docSource.lang}`
        this.batch.videos[key] = docSource.source;
      })
    }

    if (typeof message.videos.source !== "undefined") {
      this.batch.videos.defaultSource = message.videos.source;
    }
    await this.saveJSONS(batchDSU, indication);
    this.batch.keySSI = await batchDSU.getKeySSIAsString();
    let batchRecord;
    try {
      batchRecord = await this.storageService.getRecord(utils.constants.BATCHES_STORAGE_TABLE, this.batch.batchNumber);
    } catch (e) {
    }

    if (!batchRecord) {
      await this.storageService.insertRecord(utils.constants.BATCHES_STORAGE_TABLE, this.batch.batchNumber, this.batch);
    } else {
      await this.storageService.updateRecord(utils.constants.BATCHES_STORAGE_TABLE, this.batch.batchNumber, this.batch);
    }

  } else {
    //it's saved on product
    const indication = {product: `${utils.constants.PRODUCT_STORAGE_FILE}`};
    await this.loadJSONS(prodDSU, indication);

    if (typeof this.product === "undefined") {
      this.product = JSON.parse(JSON.stringify(productMetadata));
    }
    if (!this.product.videos) {
      this.product.videos = {}
    }

    if (message.videos.sources) {
      this.product.videos = {
        defaultSource: this.product.videos.defaultSource
      }
      message.videos.sources.forEach(docSource => {
        let key = `${docSource.documentType}/${docSource.lang}`
        this.product.videos[key] = docSource.source;
      })
    }

    if (typeof message.videos.source !== "undefined") {
      this.product.videos.defaultSource = message.videos.source;
    }

    await this.saveJSONS(prodDSU, indication);
    this.product.keySSI = await prodDSU.getKeySSIAsString();
    let prod;
    try {
      prod = await this.storageService.getRecord(constants.PRODUCTS_TABLE, this.product.gtin);
    } catch (e) {
    }

    if (prod) {
      await this.storageService.updateRecord(constants.PRODUCTS_TABLE, this.product.gtin, this.product);
    } else {
      await this.storageService.insertRecord(constants.PRODUCTS_TABLE, this.product.gtin, this.product)
    }
  }
  if (typeof this.options.logService !== "undefined") {
    await $$.promisify(this.options.logService.log.bind(this.options.logService))({
      logInfo: message,
      username: message.senderId,
      action: "Edited video source",
      logType: 'VIDEO_LOG',
      metadata: {
        attachedTo: "PRODUCT",
        itemCode: productCode
      }
    });

  } else {
    throw new Error("LogService is not available!")
  }

  await mappingLogService.logSuccessMapping(message, "updated video sources");
}

require("opendsu").loadApi("m2dsu").defineMapping(verifyIfVideoMessage, processVideoMessage);
