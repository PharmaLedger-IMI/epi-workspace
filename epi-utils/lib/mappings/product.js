const gtinResolver = require("gtin-resolver");

function verifyIfProductMessage(message) {
  return message.messageType === "Product" && typeof message.product === "object";
}

async function processProductMessage(message) {
  const utils = require("./../utils");
  const constants = utils.constants;
  const productCode = message.product.productCode;
  const mappingLogService = require("./logs").createInstance(this.storageService);
  let version;
  const schemaValidator = require("./utils/schema-validator");
  const schema = require("./schemas/productSchema");
  const msgValidation = schemaValidator.validateMsgOnSchema(message, schema);

  if (!msgValidation.valid) {
    message.invalidFields = msgValidation.invalidFields;
    await mappingLogService.logFailedMapping(message, "lookup", "Invalid message format");
    throw new Error(`Invalid message format ${JSON.stringify(msgValidation.invalidFields)}`);
  }

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
      throw new Error("This case is not implemented. Missing product from the wallet database or database is corrupted");
    }
    productDSU = await this.loadDSU(productMetadata.keySSI);
  }

  const indication = {product: "/product.json"};
  await this.loadJSONS(productDSU, indication);

  if (typeof this.product === "undefined") {
    this.product = JSON.parse(JSON.stringify(productMetadata));
  }
  // const propertiesMapping = require("./../utils").productDataSourceMapping;

  utils.transformFromMessage(this.product, message.product, utils.productDataSourceMapping);
  /*    for (let prop in propertiesMapping) {
          if (typeof message.product[propertiesMapping[prop]] !== "undefined") {
              this.product[prop] = message.product[propertiesMapping[prop]];

              //TODO: move this logic in leaflet app
              if (prop === "practitionerInfo" && !message.product[propertiesMapping[prop]]) {
                  this.product[prop] = "SmPC";
              }
              if (prop === "patientLeafletInfo" && !message.product[propertiesMapping[prop]]) {
                  this.product[prop] = "Patient Information";
              }
          }
      }*/
  this.product.version = version;
  await this.saveJSONS(productDSU, indication);

  if (!alreadyExists) {
    productDSU.getKeySSIAsString(async (err, keySSI) => {
      if (err) {
        throw new Error("get keySSIAsString  from prod DSU failed");
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
