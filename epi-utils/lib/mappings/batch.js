const gtinResolver = require("gtin-resolver");

function verifyIfBatchMessage(message) {
  return message.messageType === "Batch" && typeof message.batch === "object";
}

async function processBatchMessage(message) {
  const constants = require("./../utils").constants;
  const getBloomFilterSerialisation = require("./../utils").getBloomFilterSerialisation;
  const propertiesMapping = require("./../utils").batchDataSourceMapping;
  const convertDateTOGMTFormat = require("./../utils").convertDateTOGMTFormat;
  const mappingLogService = require("./logs").createInstance(this.storageService);

  const batchId = message.batch.batch;
  const productCode = message.batch.productCode;

  if(typeof message.batch.version !== "number") {
    message.batch.version = 1;
  }


  const gtinSSI = gtinResolver.createGTIN_SSI(this.options.holderInfo.domain, this.options.holderInfo.subdomain, productCode);
  let constProdDSU;
  try {
    constProdDSU = await this.loadDSU(gtinSSI);
  } catch (err) {
    await mappingLogService.logFailedMapping(message, "lookup", constants.MISSING_PRODUCT_DSU);
    throw new Error("Product not found");
  }

  if (!constProdDSU) {
    await mappingLogService.logFailedMapping(message,  "lookup", constants.MISSING_PRODUCT_DSU);
    throw new Error("Fail to create a batch for a missing product");
  }

  const gtinBatchSSI = gtinResolver.createGTIN_SSI(this.options.holderInfo.domain, this.options.holderInfo.subdomain, productCode, batchId);
  const {dsu: batchConstDSU, alreadyExists: batchExists} = await this.loadConstSSIDSU(gtinBatchSSI);

  let batchDSU;
  let batchMetadata = {};
  let productMetadata = {};

  try {
    productMetadata = await this.storageService.getRecord(constants.PRODUCTS_TABLE, productCode);
  }
  catch (e) {
    await mappingLogService.logFailedMapping(message, "lookup","Database corrupted");
    throw new Error("Missing product from the wallet database or database is corrupted");
  }


  if (!batchExists) {
    batchDSU = await this.createDSU(this.options.holderInfo.subdomain, "seed");
  } else {
      if(!productMetadata){
        throw new Error("This case is not implemented. Missing product from the wallet database or database is corrupted");
      }

    batchMetadata = await this.storageService.getRecord(constants.BATCHES_STORAGE_TABLE, batchId);
    batchDSU = await this.loadDSU(batchMetadata.keySSI);
  }

  const indication = {batch: `${constants.BATCH_STORAGE_FILE}`};

  await this.loadJSONS(batchDSU, indication);

  if (typeof this.batch === "undefined") {
    this.batch = JSON.parse(JSON.stringify(batchMetadata));
  }

  for (let prop in propertiesMapping) {
    this.batch[prop] = message.batch[propertiesMapping[prop]];
  }

  if (message.batch.expiryDate) {
    try {
      const y = message.batch.expiryDate.slice(0, 2);
      const m = message.batch.expiryDate.slice(2, 4);
      let d = message.batch.expiryDate.slice(4, 6);
      const lastMonthDay = ("0" + new Date(y, m, 0).getDate()).slice(-2);
      this.batch.enableExpiryDay = d === '00';
      if (d === '00') {
        this.batch.enableExpiryDay = true;
        d = lastMonthDay;
      } else {
        this.batch.enableExpiryDay = false;
      }
      const localDate = new Date(Date.parse(m + '/' +  d + '/' + y));
      const gmtDate = new Date(localDate.getFullYear() + '-' + m + '-' + d + 'T00:00:00Z');
      this.batch.expiryForDisplay = gmtDate.getTime();
    } catch (e) {
      throw new Error(`${message.batch.expiryDate} date is invalid`, e);
    }
  }


  this.batch.product = productMetadata.keySSI;
  this.batch.productName = productMetadata.name;
  this.batch.productDescription = productMetadata.description;
  this.batch.creationTime = convertDateTOGMTFormat(new Date());
  this.batch.msessageTime = message.messageDateTime;

  if (!batchExists) {
    this.batch.bloomFilterSerialisations = [];
    this.batch.bloomFilterRecalledSerialisations = [];
    this.batch.bloomFilterDecommissionedSerialisations = [];
  }

  let bf;
  if (message.batch.snValid.length > 0) {
    bf = getBloomFilterSerialisation(message.batch.snValid);
    this.batch.bloomFilterSerialisations.push(bf.bloomFilterSerialisation());
  }

  if (message.batch.snRecalled.length > 0) {
    bf = getBloomFilterSerialisation(message.batch.snRecalled);
    this.batch.bloomFilterRecalledSerialisations.push(bf.bloomFilterSerialisation());
  }
  if (message.batch.snDecom.length > 0) {
    bf = getBloomFilterSerialisation(message.batch.snDecom);
    this.batch.bloomFilterDecommissionedSerialisations.push(bf.bloomFilterSerialisation());
  }

  const batchClone = JSON.parse(JSON.stringify(this.batch));

  delete this.batch.serialNumbers;
  delete this.batch.recalledSerialNumbers;
  delete this.batch.decommissionedSerialNumbers;
  await this.saveJSONS(batchDSU, indication);


  if (!batchExists) {
    batchDSU.getKeySSIAsString(async (err, batchKeySSI)=>{
      if(err){
        await mappingLogService.logFailedMapping(message, "internal error","Database corrupted");
        throw new Error("get keySSIAsString  from batch DSU failed");
      }
      await batchConstDSU.mount(constants.BATCH_DSU_MOUNT_POINT, batchKeySSI);
    })

    let prodDSU = await this.loadDSU(productMetadata.keySSI);

    prodDSU.getKeySSIAsString(async (err, prodKeySSI)=>{
      if(err){
        await mappingLogService.logFailedMapping(message, "internal error","Database corrupted");
        throw new Error("get keySSIAsString  from prod DSU failed");
      }
      await batchConstDSU.mount(constants.PRODUCT_DSU_MOUNT_POINT, prodKeySSI);
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
    batchRecord = await this.storageService.getRecord(constants.BATCHES_STORAGE_TABLE, this.batch.batchNumber);
  } catch (e) {
  }

  if (!batchRecord) {
    await this.storageService.insertRecord(constants.BATCHES_STORAGE_TABLE, this.batch.batchNumber, batchClone);
  } else {
    await this.storageService.updateRecord(constants.BATCHES_STORAGE_TABLE, this.batch.batchNumber, batchClone);
  }

  await mappingLogService.logSuccessMapping(message, batchExists ? "updated" : "created");

}

require("opendsu").loadApi("m2dsu").defineMapping(verifyIfBatchMessage, processBatchMessage);
