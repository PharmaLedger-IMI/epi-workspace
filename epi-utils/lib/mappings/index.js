//loading EPI necessary mappings
require("./product.js");
require("./batch.js");

module.exports.getEPIMappingEngine = function(dsuStorage){
	const opendsu = require("opendsu");
	const sharedDBStorageService = require("epiUtils").loadApi("services").SharedDBStorageService.getSharedStorage(dsuStorage);
	return opendsu.loadApi("m2dsu").getMappingEngine(sharedDBStorageService);
}