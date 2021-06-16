const gtinResolver = require("gtin-resolver");
function verifyIfProductMessage(message){
	return message.messageType === "Product" && typeof message.product === "object";
}

async function processProductMessage(message){
		const constants = require("./../utils").constants;
		const productCode = message.product.productCode;
		let version = parseInt(message.product.version);
		const mappingLogService = require("./logs").createInstance(this.storageService);

		if(Number.isNaN(version)){
			version = undefined;
		}

		const gtinSSI = gtinResolver.createGTIN_SSI(this.options.holderInfo.domain,this.options.holderInfo.subdomain,productCode);
		const {dsu, alreadyExists} =  await this.loadConstSSIDSU(gtinSSI);
		const constDSU = dsu;

		let productDSU;
		let latestProductMetadata = {};
		if(!alreadyExists){
			 productDSU = await this.createDSU(this.options.holderInfo.subdomain,"seed");
			 version = 1;
			 latestProductMetadata.version = version;
		}
		else{
			try{
				latestProductMetadata = await this.storageService.getRecord(constants.LAST_VERSION_PRODUCTS_TABLE, productCode);
			}
			catch (e){}
			if(latestProductMetadata && latestProductMetadata.version){
				latestProductMetadata.version = parseInt(latestProductMetadata.version);
				if(typeof version ==="undefined"){
					version = ++latestProductMetadata.version;
				}
				else{
				 	if(version>latestProductMetadata.version+1){
						await mappingLogService.logFailedMapping(message, "versioning","Database corrupted");
				 		throw new Error("Version of the product is greater than the next available version");
					}
				}
			}else{
				//TODO heal database records using data from the DSU
				await mappingLogService.logFailedMapping(message, "lookup","Database corrupted");
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
		}


		const indication =  {product:"/"+version+"/product.json"};

		await this.loadJSONS(productDSU, indication);

		if(typeof this.product ==="undefined"){
			this.product = JSON.parse(JSON.stringify(latestProductMetadata));
		}
		const propertiesMapping = require("./../utils").productDataSourceMapping;

		for (let prop in propertiesMapping){
			if(typeof message.product[propertiesMapping[prop]]!=="undefined"){
				this.product[prop] = message.product[propertiesMapping[prop]];
			}
		}
		await this.saveJSONS(productDSU, indication);

		if(!alreadyExists){
			await constDSU.mount(constants.PRODUCT_DSU_MOUNT_POINT, productDSU);
		}

		this.product.keySSI = await productDSU.getKeySSIAsString();

		if(typeof this.options.logService!=="undefined"){
			await $$.promisify(this.options.logService.log.bind(this.options.logService))({
				logInfo: this.product,
				username: message.senderId,
				action: alreadyExists?"Edited product":"Created product",
				logType: 'PRODUCT_LOG'
			});

			await this.storageService.insertRecord(constants.PRODUCTS_TABLE, `${this.product.gtin}|${this.product.version}`, this.product);

			let prod;
			try {
				prod = await this.storageService.getRecord(constants.LAST_VERSION_PRODUCTS_TABLE, this.product.gtin);
			}
			catch (e){}

			if (!prod) {
				this.product.initialVersion = this.product.version;
				await this.storageService.insertRecord(constants.LAST_VERSION_PRODUCTS_TABLE, this.product.gtin, this.product);
			} else {
				await this.storageService.updateRecord(constants.LAST_VERSION_PRODUCTS_TABLE, this.product.gtin, this.product);
			}
		}
		else{
			throw new Error("LogService is not available!")
		}

		await mappingLogService.logSuccessMapping(message, alreadyExists ? "updated" : "created");

}

require("opendsu").loadApi("m2dsu").defineMapping(verifyIfProductMessage, processProductMessage);