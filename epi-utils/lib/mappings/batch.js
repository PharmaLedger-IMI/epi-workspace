function verifyIfBatchMessage(message){
	return message.messageType === "Batch" && typeof message.batch === "object";
}

function processBatchMessage(message){

}

require("opendsu").loadApi("m2dsu").defineMapping(verifyIfBatchMessage, processBatchMessage);