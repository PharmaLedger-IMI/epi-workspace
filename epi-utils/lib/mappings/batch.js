const gtinResolver = require("gtin-resolver");

function verifyIfBatchMessage(message) {
  return message.messageType === "Batch" && typeof message.batch === "object";
}

async function processBatchMessage(message) {
  const utils = require("./../utils");
  const mappingLogService = require("./logs").createInstance(this.storageService);

  const schemaValidator = require("./utils/schema-validator");
  const schema = require("./schemas/batchSchema");
  const msgValidation = schemaValidator.validateMsgOnSchema(message, schema);
  if (!msgValidation.valid) {
    message.invalidFields = msgValidation.invalidFields;
    await mappingLogService.logFailedMapping(message, "lookup", "Invalid message format");
    throw new Error(`Invalid message format ${JSON.stringify(msgValidation.invalidFields)}`);
  }

  const batchId = message.batch.batch;
  const productCode = message.batch.productCode;

  if (typeof message.batch.version !== "number") {
    message.batch.version = 1;
  }


  const gtinSSI = gtinResolver.createGTIN_SSI(this.options.holderInfo.domain, this.options.holderInfo.subdomain, productCode);
  let constProdDSU;
  try {
    constProdDSU = await this.loadDSU(gtinSSI);
  } catch (err) {
    await mappingLogService.logFailedMapping(message, "lookup", utils.constants.MISSING_PRODUCT_DSU);
    throw new Error("Product not found");
  }

  if (!constProdDSU) {
    await mappingLogService.logFailedMapping(message, "lookup", utils.constants.MISSING_PRODUCT_DSU);
    throw new Error("Fail to create a batch for a missing product");
  }

  const gtinBatchSSI = gtinResolver.createGTIN_SSI(this.options.holderInfo.domain, this.options.holderInfo.subdomain, productCode, batchId);
  const {dsu: batchConstDSU, alreadyExists: batchExists} = await this.loadConstSSIDSU(gtinBatchSSI);

  let batchDSU;
  let batchMetadata = {};
  let productMetadata = {};

  try {
    productMetadata = await this.storageService.getRecord(utils.constants.PRODUCTS_TABLE, productCode);
  } catch (e) {
    await mappingLogService.logFailedMapping(message, "lookup", "Database corrupted");
    throw new Error("Missing product from the wallet database or database is corrupted");
  }


  if (!batchExists) {
    batchDSU = await this.createDSU(this.options.holderInfo.subdomain, "seed");
  } else {
    if (!productMetadata) {
      throw new Error("This case is not implemented. Missing product from the wallet database or database is corrupted");
    }

    batchMetadata = await this.storageService.getRecord(utils.constants.BATCHES_STORAGE_TABLE, batchId);
    batchDSU = await this.loadDSU(batchMetadata.keySSI);
  }

  const indication = {batch: `${utils.constants.BATCH_STORAGE_FILE}`};

  await this.loadJSONS(batchDSU, indication);

  if (typeof this.batch === "undefined") {
    this.batch = JSON.parse(JSON.stringify(batchMetadata));
  }

  utils.transformFromMessage(this.batch, message.batch, utils.batchDataSourceMapping);

  this.batch.product = productMetadata.keySSI;
  this.batch.productName = productMetadata.name;
  this.batch.productDescription = productMetadata.description;
  this.batch.creationTime = utils.convertDateTOGMTFormat(new Date());
  this.batch.msessageTime = message.messageDateTime;

  if (!batchExists) {
    this.batch.bloomFilterSerialisations = [];
    this.batch.bloomFilterRecalledSerialisations = [];
    this.batch.bloomFilterDecommissionedSerialisations = [];
  }

  if (this.batch.snValidReset) {
    this.batch.bloomFilterSerialisations = [];
    this.batch.defaultSerialNumber = "";
    this.batch.snValidReset = false;
  }

  if (this.batch.snRecalledReset) {
    this.batch.bloomFilterRecalledSerialisations = [];
    this.batch.defaultRecalledSerialNumber = "";
    this.batch.snRecalledReset = false;
  }

  if (this.batch.snDecomReset) {
    this.batch.bloomFilterDecommissionedSerialisations = [];
    this.batch.defaultDecommissionedSerialNumber = "";
    this.batch.snDecomReset = false;
  }

  let bf;
  if (this.batch.serialNumbers.length > 0) {
    bf = utils.getBloomFilterSerialisation(this.batch.serialNumbers);
    this.batch.bloomFilterSerialisations.push(bf.bloomFilterSerialisation());
    this.batch.defaultSerialNumber = this.batch.serialNumbers[0];
  }

  if (this.batch.recalledSerialNumbers.length > 0) {
    bf = utils.getBloomFilterSerialisation(this.batch.recalledSerialNumbers);
    this.batch.bloomFilterRecalledSerialisations.push(bf.bloomFilterSerialisation());
    this.batch.defaultRecalledSerialNumber = this.batch.recalledSerialNumbers[0];
  }
  if (this.batch.decommissionedSerialNumbers.length > 0) {
    bf = utils.getBloomFilterSerialisation(this.batch.decommissionedSerialNumbers);
    this.batch.bloomFilterDecommissionedSerialisations.push(bf.bloomFilterSerialisation());
    this.batch.defaultDecommissionedSerialNumber = this.batch.decommissionedSerialNumbers[0];
  }

  const batchClone = JSON.parse(JSON.stringify(this.batch));

  delete this.batch.serialNumbers;
  delete this.batch.recalledSerialNumbers;
  delete this.batch.decommissionedSerialNumbers;
  await this.saveJSONS(batchDSU, indication);


  if (!batchExists) {
    batchDSU.getKeySSIAsString(async (err, batchKeySSI) => {
      if (err) {
        await mappingLogService.logFailedMapping(message, "internal error", "Database corrupted");
        throw new Error("get keySSIAsString  from batch DSU failed");
      }
      await batchConstDSU.mount(utils.constants.BATCH_DSU_MOUNT_POINT, batchKeySSI);
    })

    let prodDSU = await this.loadDSU(productMetadata.keySSI);

    prodDSU.getKeySSIAsString(async (err, prodKeySSI) => {
      if (err) {
        await mappingLogService.logFailedMapping(message, "internal error", "Database corrupted");
        throw new Error("get keySSIAsString  from prod DSU failed");
      }
      await batchConstDSU.mount(utils.constants.PRODUCT_DSU_MOUNT_POINT, prodKeySSI);
    })
  }

  this.batch.keySSI = await batchDSU.getKeySSIAsString();
  this.batch.consKeySSI = gtinBatchSSI;
  batchClone.keySSI = this.batch.keySSI;

  if (typeof this.options.logService !== "undefined") {
    await $$.promisify(this.options.logService.log.bind(this.options.logService))({
      logInfo: this.batch,
      username: message.senderId,
      action: batchExists ? "Edited batch" : "Created batch",
      logType: 'BATCH_LOG'
    });
  }

  let batchRecord;
  try {
    batchRecord = await this.storageService.getRecord(utils.constants.BATCHES_STORAGE_TABLE, this.batch.batchNumber);
  } catch (e) {
  }

  if (!batchRecord) {
    await this.storageService.insertRecord(utils.constants.BATCHES_STORAGE_TABLE, this.batch.batchNumber, batchClone);
  } else {
    await this.storageService.updateRecord(utils.constants.BATCHES_STORAGE_TABLE, this.batch.batchNumber, batchClone);
  }

  await mappingLogService.logSuccessMapping(message, batchExists ? "updated" : "created");

}

require("opendsu").loadApi("m2dsu").defineMapping(verifyIfBatchMessage, processBatchMessage);
