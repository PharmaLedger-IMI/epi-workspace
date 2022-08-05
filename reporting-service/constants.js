
/**
 * API Hub middleware endpoint
 * @type {string}
 * @module Reporting
 */
const API_HUB_ENDPOINT = '/acdc/scan#x-blockchain-domain-request'; // the '#x-blockchain-domain-request' fragment is needed to bypass the service worker

/**
 * Common headers for ACDC requests
 * @type {{}}
 * @module Reporting
 */
const HEADERS = {
    headers: {
        'content-type': 'application/json; charset=utf-8'
    }
};

/**
 * Settings keys for eLeaflet App Settings (User Authorization)
 * @type {{}}
 * @module Reporting
 */
const SETTINGS = {
    enableAcdc: 'acdc-enabled',
    didKey: 'acdc-did',
    locationKey: 'acdc-location',
    networkName: "networkName"
}

/**
 * Enum of ACDC Statuses
 * @type {{DISABLED: string, DOWN: string, UP: string}}
 * @module Reporting
 */
const ACDC_STATUS = {
    UP: "up",
    DOWN: "down",
    DISABLED: "disabled"
}

module.exports = {
    API_HUB_ENDPOINT,
    HEADERS,
    SETTINGS,
    ACDC_STATUS
}