module.exports = {
	loadApi : function(apiName){
		switch (apiName) {
			case "mappings":
				return require("./lib/mappings");
			case "services":
				return require("./lib/services");
		}
	}
}