productDataSourceMapping = {
  name: "inventedName",
  gtin: "productCode",
  version: "version",
  description: "nameMedicinalProduct",
  manufName: "manufName",
  reportURL: function(param){
    if (param.direction === "toMsg") {
      return "adverseEventReportingURL"
    }
    param.obj['reportURL'] = `${window.top.location.origin}/default-report.html`;
  },
  antiCounterfeitingURL:function(param){
    if (param.direction === "toMsg") {
      return "acfProductCheckURL"
    }
    param.obj['antiCounterfeitingURL'] = `${window.top.location.origin}/default-anti-counterfeiting.html`;
  },
  adverseEventsReportingEnabled: "flagEnableAdverseEventReporting",
  antiCounterfeitingEnabled: "flagEnableACFProductCheck",
  showEPIOnBatchRecalled: "flagDisplayEPI_BatchRecalled",
  showEPIOnSNRecalled: "flagDisplayEPI_SNRecalled",
  showEPIOnSNDecommissioned: "flagDisplayEPI_SNDecommissioned",
  showEPIOnSNUnknown: "flagDisplayEPI_SNUnknown",
  showEPIOnIncorrectExpiryDate: "flagDisplayEPI_EXPIncorrect",
  showEPIOnBatchExpired: "flagDisplayEPI_BatchExpired",
  practitionerInfo: function (param) {
    if (param.direction === "toMsg") {
      return "healthcarePractitionerInfo"
    }
    param.obj["practitionerInfo"] = param.msg["healthcarePractitionerInfo"] || "SmPC";

  },
  patientLeafletInfo: function (param) {
    if (param.direction === "toMsg") {
      return "patientSpecificLeaflet"
    }
    param.obj["patientLeafletInfo"] = param.msg["patientSpecificLeaflet"] || "Patient Information";
  },
  markets: "markets",
  internalMaterialCode: "internalMaterialCode",
  strength: "strength",
  showEPIOnUnknownBatchNumber: "flagDisplayEPI_BatchNumberUnknown", // to be confirmed with business
};

batchDataSourceMapping = {
  gtin: "productCode",
  batchNumber: "batch",
  expiry: function (param) {
    if (param.direction === "toMsg") {
      return "expiryDate"
    }
    param.obj['expiry'] = param.msg["expiryDate"];
    try {
      const y = param.msg.expiryDate.slice(0, 2);
      const m = param.msg.expiryDate.slice(2, 4);
      let d = param.msg.expiryDate.slice(4, 6);
      const lastMonthDay = ("0" + new Date(y, m, 0).getDate()).slice(-2);
      if (d === '00') {
        param.obj.enableExpiryDay = true;
        d = lastMonthDay;
      } else {
        param.obj.enableExpiryDay = false;
      }
      const localDate = new Date(Date.parse(m + '/' + d + '/' + y));
      const gmtDate = new Date(localDate.getFullYear() + '-' + m + '-' + d + 'T00:00:00Z');
      param.obj.expiryForDisplay = gmtDate.getTime();
    } catch (e) {
      throw new Error(`${param.msg.expiryDate} date is invalid`, e);
    }
  },
  version: "epiLeafletVersion",
  versionLabel: "versionLabel",
  serialNumbers: "snValid",
  recalledSerialNumbers: "snRecalled",
  decommissionedSerialNumbers: function (param) {
    if (param.direction === "toMsg") {
      return param.obj.decommissionReason ? "snDecom " + param.obj.decommissionReason : "snDecom";
    }
    const decomKey = Object.keys(param.msg).find((key) => key.includes("snDecom"));
    const keyArr = decomKey.split(" ");
    if (keyArr.length === 2) {
      param.obj.decommissionReason = keyArr[1];
    } else {
      param.obj.decommissionReason = "unknown";
    }
    param.obj.decommissionedSerialNumbers =  param.msg[decomKey];
  },
  defaultSerialNumber: "defaultSerialNumber",
  defaultDecommissionedSerialNumber: "defaultDecommissionedSerialNumber",
  defaultRecalledSerialNumber: "defaultRecalledSerialNumber",
  recalled: "flagEnableBatchRecallMessage",
  serialCheck: "flagEnableSNVerification",
  incorrectDateCheck: "flagEnableEXPVerification",
  expiredDateCheck: "flagEnableExpiredEXPCheck",
  recalledMessage: "recallMessage",
  defaultMessage: "batchMessage",
  packagingSiteName: "packagingSiteName",
  flagEnableACFBatchCheck: "flagEnableACFBatchCheck",
  acfBatchCheckURL: "acfBatchCheckURL",
  snValidReset: function (param) {
    if (param.direction === "toMsg") {
      return "snValidReset"
    }
    if (param.msg["snValidReset"]) {
      param.obj.serialNumbers = '';
      param.obj.defaultSerialNumber = '';
      param.obj.bloomFilterSerialisations = [];
    }
  },
  snRecalledReset: function (param) {
    if (param.direction === "toMsg") {
      return "snRecalledReset"
    }
    if (param.msg["snRecalledReset"]) {
      param.obj.recalledSerialNumbers = '';
      param.obj.defaultRecalledSerialNumber = '';
      param.obj.bloomFilterRecalledSerialisations = [];
    }
  },
  snDecomReset: function (param) {
    if (param.direction === "toMsg") {
      return "snDecomReset"
    }
    if (param.msg["snDecomReset"]) {
      param.obj.decommissionedSerialNumbers = ''
      param.obj.defaultDecommissionedSerialNumber = '';
      param.obj.bloomFilterRecalledSerialisations = [];
    }
  },
};

function transformFromMessage(destinationObj, messageObj, mappingObj) {
  for (let prop in mappingObj) {
    if (typeof mappingObj[prop] === "function") {
      mappingObj[prop]({direction: "fromMsg", "obj": destinationObj, "msg": messageObj});
    } else {
      destinationObj[prop] = messageObj[mappingObj[prop]];
    }
  }
}

function transformToMessage(sourceObj, messageObj, mappingObj) {
  for (let prop in mappingObj) {
    if (sourceObj[prop] !== "undefined") {
      if (typeof mappingObj[prop] === "function") {
        messageObj[mappingObj[prop]({direction: "toMsg", "obj": sourceObj, "msg": messageObj})] = sourceObj[prop];
      } else {
        messageObj[mappingObj[prop]] = sourceObj[prop];
      }
    }
  }
}

constants = {
  'PACKAGES_STORAGE_PATH': "/app/data/packages.json",
  'DATA_STORAGE_PATH': "/app/data",
  'PRODUCTS_TABLE': "products",
  'LOGS_TABLE': "logs",
  'SERIAL_NUMBERS_LOGS_TABLE': "serial_numbers_logs",
  'PRODUCT_KEYSSI_STORAGE_TABLE': "productKeySSIs",
  'BATCHES_STORAGE_TABLE': "batches",
  'PRODUCT_DSU_MOUNT_POINT': "/product",
  'BATCH_DSU_MOUNT_POINT': "/batch",
  'BATCH_STORAGE_FILE': "/batch.json",
  'PRODUCT_STORAGE_FILE': "/product.json",
  'PRODUCT_IMAGE_FILE': "/image.png",
  'LEAFLET_ATTACHMENT_FILE': "/leaflet.xml",
  'SMPC_ATTACHMENT_FILE': "/smpc.xml",
  'IMPORT_LOGS': 'import-logs',
  'SUCCESS_MAPPING_STATUS': "success",
  'FAILED_MAPPING_STATUS': "failed",
  "MISSING_PRODUCT_DSU": "Missing Product DSU",
  "MISSING_BATCH_DSU": "Missing Batch DSU",
  "MISSING_PRODUCT_VERSION": "Missing Product Version"
};

function getBloomFilterSerialisation(arr, bfSerialisation) {
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

function convertDateTOGMTFormat(date) {
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

/**
 * https://gist.github.com/jonleighton/958841#gistcomment-2839519
 * @param arrayBuffer
 * @returns {string}
 */

let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

// Use a lookup table to find the index.
let lookup = new Uint8Array(256);
for (let i = 0; i < chars.length; i++) {
  lookup[chars.charCodeAt(i)] = i;
}

arrayBufferToBase64 = (arrayBuffer) => {
  let bytes = new Uint8Array(arrayBuffer),
    i, len = bytes.length, base64 = "";

  for (i = 0; i < len; i += 3) {
    base64 += chars[bytes[i] >> 2];
    base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
    base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
    base64 += chars[bytes[i + 2] & 63];
  }

  if ((len % 3) === 2) {
    base64 = base64.substring(0, base64.length - 1) + "=";
  } else if (len % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2) + "==";
  }

  return base64;
}

/**
 * @param base64
 * @returns {ArrayBuffer}
 */
base64ToArrayBuffer = (base64) => {
  let bufferLength = base64.length * 0.75,
    len = base64.length, i, p = 0,
    encoded1, encoded2, encoded3, encoded4;

  if (base64[base64.length - 1] === "=") {
    bufferLength--;
    if (base64[base64.length - 2] === "=") {
      bufferLength--;
    }
  }

  let arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer);

  for (i = 0; i < len; i += 4) {
    encoded1 = lookup[base64.charCodeAt(i)];
    encoded2 = lookup[base64.charCodeAt(i + 1)];
    encoded3 = lookup[base64.charCodeAt(i + 2)];
    encoded4 = lookup[base64.charCodeAt(i + 3)];

    bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
    bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
    bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
  }

  return arraybuffer;
};

module.exports = {
  constants,
  base64ToArrayBuffer,
  arrayBufferToBase64,
  convertDateTOGMTFormat,
  getBloomFilterSerialisation,
  transformFromMessage,
  transformToMessage,
  batchDataSourceMapping,
  productDataSourceMapping
}
