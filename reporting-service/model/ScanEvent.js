/**
 * Data holder class for the scan event to be sent to ACDC
 * @class ScanEvent
 * @module Model
 */
class ScanEvent {
    /**
     * gtin
     */
    productCode;
    /**
     * batchNumber
     */
    batch;
    /**
     * Serial Number
     */
    serialNumber;
    /**
     * Batch expiry date
     */
    expiryDate;
    /**
     * time since epoch at the time of the scan
     */
    snCheckDateTime;
    /**
     * Location data (needs user authorization)
     */
    snCheckLocation;
    /**
     * Decentralized Identity (needs user authorization)
     */
    did;
    /**
     * {boolean} if gtin + batch DSU exists should be true, false otherwise
     */
    batchDsuStatus;
    /**
     * {boolean|undefined} if gtin DSU exists should be true, false if it does not. Undefined when not tested
     */
    productDsuStatus;

    constructor(data){
        for (let key in data)
            if(data.hasOwnProperty(key))
                switch (key){
                    case 'batchNumber':
                        this.batch = data.batchNumber;
                        break;
                    case 'gtin':
                        this.productCode = data.gtin;
                        break;
                    case 'expiry':
                        this.expiryDate = data.expiry; // no format conversion (a wrong date format is also an indicator of something)
                        break;
                    default:
                        this[key] = data[key];
                }

        this.snCheckDateTime = new Date().toISOString();
    }

    /**
     * Adds optional (authorized) user details to the ScanEvent
     * @param {string} did
     * @param {{}} location
     * @private
     */
    _bindUserDetails(did, location){
        this.did = did;
        this.snCheckLocation = location;
    }

    /**
     * Sets Batch DSU Status (existing or not)
     * @param {boolean} status
     */
    setBatchDSUStatus(status){
        this.batchDsuStatus = status;
    }

    /**
     * Sets Product DSU Status (existing/notExisting)
     * @param {boolean} status
     */
    setProductDSUStatus(status){
        this.productDsuStatus = status;
    }

    /**
     * Reports the event to ACDC via {@link ReportingService#_report}
     * Will be bound by the {@link ReportingService} upon creation
     * @param {function(err, response)} [callback]
     */
    report(callback){}
}

module.exports = ScanEvent;
