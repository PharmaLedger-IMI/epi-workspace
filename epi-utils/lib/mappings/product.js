import constants from "../../../dsu-fabric-ssapp/code/scripts/constants";

const gtinResolver = require("gtin-resolver");
function verifyIfProductMessage(message){
	return message.messageType === "Product" && typeof message.product === "object";
}

async function processProductMessage(message){
		const productCode = message.product.productCode;
		let version = parseInt(message.product.version);

		if(Number.isNaN(version)){
			version = undefined;
		}

		const gtinSSI = gtinResolver.createGTIN_SSI(this.options.holderInfo.domain,this.options.holderInfo.subdomain,productCode);
		const {dsu, alreadyExisting} =  await this.loadConstSSIDSU(gtinSSI);

		let productDSU;
		let latestProductMetadata;
		if(!alreadyExisting){
			 productDSU = await this.createDSU(this.options.holderInfo.subdomain,"seed");
		}
		else{
			latestProductMetadata = await $$.promisify(this.storageService.getRecord)(constants.LAST_VERSION_PRODUCTS_TABLE, this.gtin);
			if(latestProductMetadata && latestProductMetadata.version){
				latestProductMetadata.version = parseInt(latestProductMetadata.version);
				if(typeof version ==="undefined"){
					version = ++latestProductMetadata.version;
				}
				else{
				 	if(version>latestProductMetadata.version+1){
				 		throw new Error("Version of the product is greater than the next available version");
					}
				}
			}else{
				//TODO heal database records using data from the DSU
				throw new Error("This case is not implemented. Missing product from the wallet database or database is corrupted");

				if(typeof version ==="undefined"){
					version = 1;
				}
				else{
					if(version>1){
						throw new Error("Version of the product is greater than the next available version");
					}
				}
				latestProductMetadata = {version:version}
			}

			productDSU = await this.loadDSU(latestProductMetadata.keySSI);

			await this.loadJSONS(productDSU, {product:"/"+version+"/product.json"});

			//TODO: log all the changes

		}

}

require("opendsu").loadApi("m2dsu").defineMapping(verifyIfProductMessage, processProductMessage);