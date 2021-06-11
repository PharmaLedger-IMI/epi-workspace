module.exports = {
	SharedDBStorageService: require("./SharedDBStorageService"),
	DSUStorage: require("./DSUStorage"),
	getMessageQueuingServiceInstance: () => require("./MessageQueuingService").getMessageQueuingServiceInstance()
}