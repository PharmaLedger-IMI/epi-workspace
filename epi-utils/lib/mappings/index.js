//loading EPI necessary mappings
require("./product.js");
require("./batch.js");

module.exports.getEPIMappingEngine = function(dsuStorage, options){
	const opendsu = require("opendsu");
	const sharedDBStorageService = require("epi-utils").loadApi("services").SharedDBStorageService.getPromisifiedSharedObject(dsuStorage);
	return opendsu.loadApi("m2dsu").getMappingEngine(sharedDBStorageService, options);
}

// module.exports.utils = require("./utils.js");
module.exports.getMappingLogs = function (storageService){
	return require("./logs").createInstance(storageService).getMappingLogs;
}