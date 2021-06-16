module.exports = {
	loadApi: function (apiName) {
		switch (apiName) {
			case "mappings":
				return require("./lib/mappings");
			case "services":
				return require("./lib/services");
		}
	},
	getEPIMappingEngineForAPIHUB:function (server){
		return require("./lib/apihubMappingEngine").getEPIMappingEngineForAPIHUB(server);
	},
	getMessagesPipe:function (){
		const opendsu = require("opendsu");
		return  opendsu.loadApi("m2dsu").getMessagesPipe();
	},
	getMappingsUtils:function (){
		return require("./lib/utils");
	}
}