function verifyIfProductMessage(message){
	return message.messageType === "Product" && typeof message.product === "object";
}

function processProductMessage(message){

}

require("opendsu").loadApi("m2dsu").defineMapping(verifyIfProductMessage, processProductMessage);