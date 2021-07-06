function MessageQueuingService() {

    this.getNextMessagesBlock = function (messages, callback) {

        let productsInQueue = [];
        let batchesInQueue = [];
        let queue = [];

        let letQueuePass = ()=>{
            callback(undefined, queue);
        }

        for (let i = 0; i < messages.length; i++) {
            let message = messages[i];

            let productCode, batchNumber;
            switch (true) {
                case message.messageType.toLowerCase() === "product":
                    productCode = message.product.productCode;
                    if (productsInQueue.indexOf(productCode) === -1) {
                        productsInQueue.push(productCode);
                        queue.push(message);
                    } else {
                        return letQueuePass();
                    }
                    break;

                case message.messageType.toLowerCase() === "batch":
                    productCode = message.batch.productCode;
                    batchNumber = message.batch.batch;
                    if (productsInQueue.indexOf(productCode) === -1 && batchesInQueue.indexOf(batchNumber) === -1) {
                        productsInQueue.push(productCode);
                        batchesInQueue.push(batchNumber);
                        queue.push(message);
                    } else {
                        return letQueuePass();
                    }
                    break;
                case ["productphoto", "leaflet", "smpc"].indexOf(message.messageType.toLowerCase()) !== -1:
                    productCode = message.productCode;
                    if (productsInQueue.indexOf(productCode) === -1) {
                        productsInQueue.push(productCode);
                        queue.push(message);
                    }
                    else {
                        return letQueuePass();
                    }
                    break;
            }
        }
        letQueuePass();
    }

}

let instance  = null;
module.exports.getMessageQueuingServiceInstance = () => {

    if(!instance){
        instance = new MessageQueuingService();
    }

    return instance;
}
