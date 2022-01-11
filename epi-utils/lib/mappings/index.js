//loading EPI necessary mappings
require("./product.js");
require("./batch.js");
require("./productPhoto.js");
require("./videoSource.js");
require("./leaflet.js");
require("./delete-leaflet.js");

module.exports.getEPIMappingEngine = function(dsuStorage, options){
	const opendsu = require("opendsu");
	const sharedDBStorageService = require("epi-utils").loadApi("services").SharedDBStorageService.getPromisifiedSharedObject(dsuStorage);
	return opendsu.loadApi("m2dsu").getMappingEngine(sharedDBStorageService, options);
}

// module.exports.utils = require("./utils.js");
module.exports.getMappingLogs = function (storageService){
	return require("./logs").createInstance(storageService).getMappingLogs;
}

module.exports.buildResponse = function(version){
	return require("./responses").buildResponse(version);
}
