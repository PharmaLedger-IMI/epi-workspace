const {ACDC_STATUS} = require('../constants')

/**
 * Represents the scan resul from ACDC
 * @class ScanResult
 * @module Model
 */
class ScanResult{
    /**
     * {{}} the scan result definitions
     */
    snCheckResult;
    /**
     * {string} the mahId for the provided product
     */
    mahId;
    acdcStatus = ACDC_STATUS.DISABLED;
    err;

    constructor(props){
        if (!!props)
            for(let prop in props)
                if (props.hasOwnProperty(prop))
                    this[prop] = props[prop];
    }
}

module.exports = ScanResult;