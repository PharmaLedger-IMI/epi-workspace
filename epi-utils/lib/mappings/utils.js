module.exports.productDataSourceMapping = {
  name: "inventedName",
  gtin: "productCode",
  photo: "",
  description: "nameMedicinalProduct",
  leaflet: "",
  manufName: "",
  batchSpecificVersion: false,
  reportURL: "adverseEventReportingURL",
  antiCounterfeitingURL: "acfProductCheckURL",
  adverseEventsReportingEnabled: "flagEnableAdverseEventReporting",
  antiCounterfeitingEnabled: "flagEnableACFProductCheck",
  showEPIOnBatchRecalled: "flagDisplayEPI_BatchRecalled",
  showEPIOnSNRecalled: "flagDisplayEPI_SNRecalled",
  showEPIOnSNDecommissioned: "flagDisplayEPI_SNDecommissioned",
  showEPIOnSNUnknown: "flagDisplayEPI_SNUnknown",
  showEPIOnIncorrectExpiryDate: "flagDisplayEPI_EXPIncorrect",
  showEPIOnBatchExpired: "flagDisplayEPI_BatchExpired",
  practitionerInfo: "healthcarePractitionerInfo",
  patientLeafletInfo: "patientSpecificLeaflet",
  markets: "markets",
  internalMaterialCode: "internalMaterialCode",
  inventedName: "inventedName",
  strength: "strength"
};
module.exports.batchDataSourceMapping = {
  gtin: "productCode",
  batchNumber: "batch",
  expiry: "expiryDate",
  version: "epiLeafletVersion",
  versionLabel: "",
  serialNumbers: "snValid",
  recalledSerialNumbers: "snRecalled",
  decommissionedSerialNumbers: "snDecom",
  defaultSerialNumber: "",
  decommissionReason: "",
  recalled: "flagEnableBatchRecallMessage",
  serialCheck: "flagEnableSNVerification",
  incorrectDateCheck: "flagEnableEXPVerification",
  expiredDateCheck: "flagEnableExpiredEXPCheck",
  recalledMessage: "recallMessage",
  defaultMessage: "batchMessage",
  packagingSiteName: "packagingSiteName",
  flagEnableACFBatchCheck: "flagEnableACFBatchCheck",
  acfBatchCheckURL: "acfBatchCheckURL"
};

module.exports.constants = {
  'PACKAGES_STORAGE_PATH': "/app/data/packages.json",
  'DATA_STORAGE_PATH': "/app/data",
  'PRODUCTS_TABLE': "products",
  'LAST_VERSION_PRODUCTS_TABLE': "last_version_products",
  'LOGS_TABLE': "logs",
  'SERIAL_NUMBERS_LOGS_TABLE': "serial_numbers_logs",
  'PRODUCT_KEYSSI_STORAGE_TABLE': "productKeySSIs",
  'BATCHES_STORAGE_TABLE': "batches",
  'PRODUCT_DSU_MOUNT_POINT': "/gtinDSU",
  'BATCH_DSU_MOUNT_POINT': "/batch",
  'BATCH_STORAGE_FILE': "/batch.json",
  'PRODUCT_STORAGE_FILE': "/product.json",
  'PRODUCT_IMAGE_FILE': "/image.png",
  'LEAFLET_ATTACHMENT_FILE': "/leaflet.xml",
  'SMPC_ATTACHMENT_FILE': "/smpc.xml",
  'IMPORT_LOGS': 'import-logs',
  'SUCCESS_MAPPING_STATUS':"success",
  'FAILED_MAPPING_STATUS':"failed",
  "MISSING_PRODUCT_DSU":"Missing Product DSU"
};

module.exports.getBloomFilterSerialisation = function (arr, bfSerialisation) {
  let crypto = require("opendsu").loadAPI("crypto");
  let bf;
  if (bfSerialisation) {
    bf = crypto.createBloomFilter(bfSerialisation);
  } else {
    bf = crypto.createBloomFilter({estimatedElementCount: arr.length, falsePositiveTolerance: 0.000001});
  }
  arr.forEach(sn => {
    bf.insert(sn);
  });
  return bf
}

module.exports.convertDateTOGMTFormat = function (date) {
  let formatter = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    weekday: "short",
    monthday: "short",
    timeZone: 'GMT'
  });

  let arr = formatter.formatToParts(date);
  let no = {};
  arr.forEach(item => {
    no[item.type] = item.value;
  })
  let {year, month, day, hour, minute} = no;

  let offset = -date.getTimezoneOffset();
  let offset_min = offset % 60;
  if (!offset_min) {
    offset_min = "00"
  }
  offset = offset / 60;
  let offsetStr = "GMT ";
  if (offset) {
    if (offset > 0) {
      offsetStr += "+";
    }
    offsetStr += offset;
    offsetStr += ":";
    offsetStr += offset_min;
  }

  return `${year} ${month} ${day} ${hour}:${minute} ${offsetStr}`;
}
