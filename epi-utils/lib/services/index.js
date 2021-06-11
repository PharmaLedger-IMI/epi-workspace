module.exports = {
	SharedDBStorageService: require("./SharedDBStorageService"),
	DSUStorage: require("./NodeDSUStorage"),
	LogService : require("./LogService"),
	getMessageQueuingServiceInstance: () => require("./MessageQueuingService").getMessageQueuingServiceInstance()
}