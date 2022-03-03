const gtinResolver = require("gtin-resolver");

function verifyIfProductMessage(message) {
  return message.messageType === "Product";
}

async function processProductMessage(message) {
  const utils = require("./../utils");
  const openDSU = require("opendsu");
  const errMap = openDSU.loadApi("m2dsu").getErrorsMap();
  const SSI_TYPES = openDSU.constants.KEY_SSIS;
  const mappingLogService = require("./logs").createInstance(this.storageService);
  const constants = utils.constants;
  const schemaValidator = require("./utils/schema-validator");
  const schema = require("./schemas/productSchema");
  const msgValidation = schemaValidator.validateMsgOnSchema(message, schema);

  if (!msgValidation.valid) {
    message.invalidFields = msgValidation.invalidFields;
    await mappingLogService.logFailedMapping(message, "lookup", "Invalid message format");
    throw errMap.newCustomError(errMap.errorTypes.INVALID_MESSAGE_FORMAT, msgValidation.invalidFields);
  }

  const productCode = message.product.productCode;

  let version;
  const gtinSSI = gtinResolver.createGTIN_SSI(this.options.holderInfo.domain, this.options.holderInfo.subdomain, productCode);
  const {dsu, alreadyExists} = await this.loadConstSSIDSU(gtinSSI);
  const constDSU = dsu;

  let productDSU;
  let productMetadata = {};
  if (!alreadyExists) {
    productDSU = await this.createDSU(this.options.holderInfo.subdomain, "seed");
    version = 1;
  } else {
    try {
      productMetadata = await this.storageService.getRecord(constants.PRODUCTS_TABLE, productCode);
      if (productMetadata.version) {
        version = productMetadata.version + 1;
      }
    } catch (e) {
      await mappingLogService.logFailedMapping(message, "lookup", "Database corrupted");
      throw errMap.newCustomError(errMap.errorTypes.DB_OPERATION_FAIL, "productCode");
    }
    productDSU = await this.loadDSU(productMetadata.keySSI);
  }

  const indication = {product: `${utils.constants.PRODUCT_STORAGE_FILE}`};
  await this.loadJSONS(productDSU, indication);

  if (typeof this.product === "undefined") {
    this.product = JSON.parse(JSON.stringify(productMetadata));
  }
  utils.transformFromMessage(this.product, message.product, utils.productDataSourceMapping);
  this.product.version = version;
  this.product.epiProtocol = constants.EPI_PROTOCOL_VERSION;

  await this.saveJSONS(productDSU, indication);

  if (!alreadyExists) {
    productDSU.getKeySSIAsString(SSI_TYPES.SREAD_SSI, async (err, keySSI) => {
      if (err) {
        throw new Error("get keySSIAsString from prod DSU failed");
      }
      await constDSU.mount(constants.PRODUCT_DSU_MOUNT_POINT, keySSI);
    })

  }

  this.product.keySSI = await productDSU.getKeySSIAsString();

  if (typeof this.options.logService !== "undefined") {
    await $$.promisify(this.options.logService.log.bind(this.options.logService))({
      logInfo: this.product,
      username: message.senderId,
      action: alreadyExists ? "Edited product" : "Created product",
      logType: 'PRODUCT_LOG'
    });

    let prod;
    try {
      prod = await this.storageService.getRecord(constants.PRODUCTS_TABLE, this.product.gtin);
    } catch (e) {
      //possible issue on db.
    }

    if (prod) {
      await this.storageService.updateRecord(constants.PRODUCTS_TABLE, this.product.gtin, this.product);
    } else {
      await this.storageService.insertRecord(constants.PRODUCTS_TABLE, this.product.gtin, this.product)
    }

  } else {
    throw new Error("LogService is not available!")
  }

  await mappingLogService.logSuccessMapping(message, alreadyExists ? "updated" : "created");

}

require("opendsu").loadApi("m2dsu").defineMapping(verifyIfProductMessage, processProductMessage);
