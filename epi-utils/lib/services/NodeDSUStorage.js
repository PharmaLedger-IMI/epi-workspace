class NodeDSUStorage {
  constructor(walletSSI) {
    this.directAccessEnabled = false;

    if (!walletSSI) {
      throw new Error("Wallet SSI was not provided in constructor of NodeDSUStorage!")
    }

    this.walletSSI = walletSSI;
  }

  enableDirectAccess(callback) {
    let self = this;

    function addFunctionsFromMainDSU() {
      if (!self.directAccessEnabled) {

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
        let getDSU = (err, mainDSU) => {
          if (err) {
            return callback(err);
          }
          try {
            for (let f of availableFunctions) {
              self[f] = mainDSU[f];
            }
            self.directAccessEnabled = true;
            callback(undefined, true);
          } catch (err) {
            return callback(err);
          }

        }
        if (self.walletSSI) {
          let resolver = require("opendsu").loadAPI("resolver");
          return resolver.loadDSU(self.walletSSI, getDSU);
        }
        let sc = require("opendsu").loadAPI("sc");
        sc.getMainDSU(getDSU)
      } else {
        callback(undefined, true);
      }
    }

    addFunctionsFromMainDSU();
  }

  setObject(path, data, callback) {
    try {
      let dataSerialized = JSON.stringify(data);
      this.setItem(path, dataSerialized, callback)
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
    this.writeFile(path, data, callback);
  }

  getItem(path, expectedResultType, callback) {
    if (typeof expectedResultType === "function") {
      callback = expectedResultType;
      expectedResultType = "arrayBuffer";
    }
    try {
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
    } catch (e) {
      return callback(e);
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

let instances = {};
module.exports = {
  getInstance: function (walletSSI) {
    if (!instances[walletSSI]) {
      instances[walletSSI] = module.exports.createInstance(walletSSI);
    }
    return instances[walletSSI];
  },
  createInstance: function (walletSSI) {
    let instance;
    switch ($$.environmentType) {
      case "nodejs":
        instance = new NodeDSUStorage(walletSSI);
        break;
      default:
        throw new Error('DSU Storage is not implemented for this <${$$.environmentType}> env!');
    }
    return instance;
  }
};
