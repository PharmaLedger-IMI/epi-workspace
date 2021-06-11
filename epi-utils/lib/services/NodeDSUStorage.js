class NodeDSUStorage {
	constructor() {
		this.directAccessEnabled = false;
	}

	enableDirectAccess(callback) {
		let self = this;

		function addFunctionsFromMainDSU() {
			if (!self.directAccessEnabled) {
				let sc = require("opendsu").loadAPI("sc");
				let availableFunctions = [
					"addFile",
					"addFiles",
					"addFolder",
					"appendToFile",
					"createFolder",
					"delete",
					"extractFile",
					"extractFolder",
					"getArchiveForPath",
					"getCreationSSI",
					"getKeySSI",
					"listFiles",
					"listFolders",
					"mount",
					"readDir",
					"readFile",
					"rename",
					"unmount",
					"writeFile",
					"listMountedDSUs",
					"beginBatch",
					"commitBatch",
					"cancelBatch"
				];


				let mainDSU = sc.getMainDSU();
				for (let f of availableFunctions) {
					self[f] = mainDSU[f];
				}
				self.directAccessEnabled = true;
				callback(undefined, true);
			} else {
				callback(undefined, true);
			}
		}

		function getMainDSU(continuation) {
			let sc = require("opendsu").loadAPI("sc");
			let mainDSU = undefined;
			try {
				mainDSU = sc.getMainDSU();

			} catch (err) {
				//ignore on purpose
			}

			if (mainDSU) {
				continuation();
			} else {
				const opendsu = require("opendsu");
				//get server configuration
				const apiHub = require("apihub");
				let defaultConfig = apiHub.getServerConfig();
				let domainConfig = apiHub.getDomainConfig()

				let walletSSI;
				try {
					 walletSSI = domainConfig.endpointsConfig['epi-mapping-engine'].options.walletSSI;
				}catch (e){
					console.log("Domain is not properly configured")
				}

				if(typeof walletSSI==="undefined"){
					walletSSI = defaultConfig.endpointsConfig['epi-mapping-engine'].options.walletSSI
				}

				console.log(walletSSI);

				//citesc keySSI din server.json folosind path-urile pana la cheia keySSI-ului




				let config = opendsu.loadApi("config");
				let mainSSI = opendsu.loadApi("keyssi").parse(walletSSI);
				if (mainSSI.getHint() == "server") {
					config.disableLocalVault();
				}
				opendsu.loadAPI("resolver").loadDSU(walletSSI, (err, mainDSU) => {
					if (err) {
						//printOpenDSUError(err);
						//reportUserRelevantInfo("Reattempting to enable direct DSUStorage from Cardinal", err);
						setTimeout(function () {
							getMainDSU(continuation);
						}, 100);
						return;
					}
					sc.setMainDSU(mainDSU);
					continuation();
				});










				// opendsu.loadAPI("http").doGet("/getSSIForMainDSU", function (err, res) {
				// 	if (err) {
				// 		return reportUserRelevantError("Failed to enable direct DSUStorage access from Cardinal", err);
				// 	}
				//
				// 	let config = opendsu.loadApi("config");
				//
				// 	let mainSSI = opendsu.loadApi("keyssi").parse(res);
				// 	if (mainSSI.getHint() == "server") {
				// 		config.disableLocalVault();
				// 	}
				// 	opendsu.loadAPI("resolver").loadDSU(res, (err, mainDSU) => {
				// 		if (err) {
				// 			printOpenDSUError(err);
				// 			reportUserRelevantInfo("Reattempting to enable direct DSUStorage from Cardinal", err);
				// 			setTimeout(function () {
				// 				getMainDSU(continuation);
				// 			}, 100);
				// 			return;
				// 		}
				// 		sc.setMainDSU(mainDSU);
				// 		continuation();
				// 	});
				// })
			}
		}

		getMainDSU(addFunctionsFromMainDSU);
	}

	call(name, ...args) {
		if (args.length === 0) {
			throw Error('Missing arguments. Usage: call(functionName, arg1, arg2 ... callback)');
		}

		const callback = args.pop();
		const url = "/api?" + new URLSearchParams({name: name, arguments: JSON.stringify(args)});
		fetch(url, {method: "GET"})
			.then((response) => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then((result) => {
				callback(...result);
			})
			.catch((err) => {
				return callback(err);
			});
	}

	setObject(path, data, callback) {
		try {
			let dataSerialized = JSON.stringify(data);
			this.setItem(path, dataSerialized, callback);
		} catch (e) {
			callback(createOpenDSUErrorWrapper("setObject failed", e));
		}
	}

	getObject(path, callback) {
		this.getItem(path, "json", function (err, res) {
			if (err || !res) {
				return callback(undefined, undefined);
			}
			callback(undefined, res);
		})
	}

	setItem(path, data, callback) {
		if (!this.directAccessEnabled) {
			let segments = path.split("/");
			let fileName = segments.splice(segments.length - 1, 1)[0];
			path = segments.join("/");
			if (!path) {
				path = "/";
			}
			let url = `/upload?path=${path}&filename=${fileName}`;
			doUpload(url, data, callback);
		} else {
			this.writeFile(path, data, callback);
		}
	}

	getItem(path, expectedResultType, callback) {
		if (typeof expectedResultType === "function") {
			callback = expectedResultType;
			expectedResultType = "arrayBuffer";
		}

		if (!this.directAccessEnabled) {
			if (path[0] !== "/") {
				path = "/" + path;
			}

			path = "/download" + path;
			doDownload(path, expectedResultType, callback);
		} else {
			this.readFile(path, function (err, res) {
				if (err) {
					return callback(err);
				}
				try {
					if (expectedResultType == "json") {
						res = JSON.parse(res.toString());
					}
				} catch (err) {
					return callback(err);
				}
				callback(undefined, res);
			})
		}
	}

	uploadFile(path, file, options, callback) {
		doFileUpload(...arguments);
	}

	uploadMultipleFiles(path, files, options, callback) {
		doFileUpload(...arguments);
	}

	deleteObjects(objects, callback) {
		performRemoval(objects, callback);
	}

	removeFile(filePath, callback) {
		console.log("[Warning] - obsolete. Use DSU.deleteObjects");
		performRemoval([filePath], callback);
	}

	removeFiles(filePathList, callback) {
		console.log("[Warning] - obsolete. Use DSU.deleteObjects");
		performRemoval(filePathList, callback);
	}
}

let instance;
module.exports = {
	getInstance: function(){
		if(!instance){
			switch($$.environmentType){
				case "nodejs":
					instance = new NodeDSUStorage();
					break;
				default:
					throw new Error('DSU Storage is not implemented for this <${$$.environmentType}> env!');
			}
		}
		return instance;
	}
};