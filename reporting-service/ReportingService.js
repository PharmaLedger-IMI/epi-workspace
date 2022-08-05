const {API_HUB_ENDPOINT, SETTINGS, ACDC_STATUS, HEADERS} = require('./constants');
const ScanEvent = require('./model/ScanEvent');
const ScanResult = require('./model/ScanResult');

/**
 * Class responsible for managing ACDC integration in the eLeafletApp
 * @class ReportingService
 * @module Reporting
 */
class ReportingService {
    constructor(settingsService) {
        this.settingsService = settingsService;
        this.http = require('opendsu').loadApi('http');
    }

    /**
     * Returns the model object to represent the checkboxes in cardinal
     * @param {string} name
     * @param {string} label the general label
     * @param {string} checkboxLabel the checkbox's label
     * @param {*} value
     * @return {{}}
     * @private
     */
    _getCheckboxModel(name, label, checkboxLabel, value){
        return {
            label: label,
            name: name,
            checkboxLabel: checkboxLabel,
            checkedValue: true,
            uncheckedValue: false,
            value: value
        }
    }

    /**
     * Returns the model object to represent the checkboxes in cardinal
     * @param {string} label the general label
     * @param {string} placeholder the dropdown's placeholder
     * @param {boolean} required
     * @param {{}[]} options in {label: '...', value: '...'} format
     * @param {string} value
     * @return {{}}
     * @private
     */
    _getDropdownModel(label, placeholder, required,  options, value){
        return {
            label: label,
            placeholder: 'Please select one option...',
            required: required,
            options: options,
            value: value
        }
    }

    /**
     * Adds the ACDC settings model to the provided model
     * @param model
     * @param callback
     */
    setSettingsToModel(model, callback){
        const self = this;
        model.acdc = model.acdc || {};

        self.settingsService.readSetting(SETTINGS.enableAcdc, (err, acdcSetting) => {
            acdcSetting = !(err || !acdcSetting);

            // model.acdc.enabled = self._getCheckboxModel("input-acdc-enabled",
            //     "Please contribute to fraud prevention by sharing unidentified data!",
            //     "Enabled Anti-Counterfeiting checks?",
            //     acdcSetting);

            model.acdc.enabled = acdcSetting; /*self._getDropdownModel("Enable Anti-Counterfeit Validation?"
                                                        , undefined, true, [
                    {label: "Yes", value: "true"},
                    {label: "No", value: "false"}
                ], acdcSetting + '');*/

            self.settingsService.readSetting(SETTINGS.didKey, (err, didSetting) => {
                didSetting = !(err || !didSetting);
                //
                // model.acdc.did = self._getCheckboxModel("input-acdc-did",
                //     "Please help us prevent fraud by sharing an untraceable identifier",
                //     "Share Decentralized Identity?",
                //     didSetting);

                model.acdc.did_enabled = didSetting;/*self._getDropdownModel("Share de-identified marker for Anti-Counterfeiting purposes?"
                    , undefined, true, [
                        {label: "Yes", value: "true"},
                        {label: "No", value: "false"}
                    ], didSetting + '');*/

                self.settingsService.readSetting(SETTINGS.locationKey, (err, locationSetting) => {
                    locationSetting = !(err || !locationSetting);
                    // model.acdc.location = self._getCheckboxModel("input-acdc-location",
                    //     "Please help us identify counterfeit drugs by sharing your location",
                    //     "Share location?",
                    //     locationSetting);

                    model.acdc.location_enabled = locationSetting; /*self._getDropdownModel("Share location when scanning for Anti-Counterfeiting purposes?"
                        , undefined, true, [
                            {label: "Yes", value: "true"},
                            {label: "No", value: "false"}
                        ], locationSetting + '');*/

                    self._bindModelChangeEvents(model);
                    callback();
                })
            });
        });
    }

    /**
     * Generates a random DID for the app to report to acdc
     * @private
     */
    _generateDID(){
        const crypto = require('opendsu').loadApi('crypto');
        const newDID = crypto.encodeBase58(crypto.generateRandom(256));
        console.log(`Random new DID generated: ${newDID}`);
        return newDID;
    }

    /**
     * How will this work with mobile? needs native gps api?
     * @param callback
     * @return {*}
     * @private
     */
    _getPosition(callback){
        if (!navigator)
            return callback(`Geolocation does not seem to be available. Are you on a web browser?`);
        if (!navigator.geolocation)
            return callback(`Geolocation feature unexisting or disabled`);

        const successCallback = function (pos) {
            callback(undefined, {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                altitude: pos.coords.altitude,
                accuracy: pos.coords.accuracy,
                altitudeAccuracy: pos.coords.altitudeAccuracy
            })
        }

        const handleError = function(error){
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    return callback("User denied the request for Geolocation.");
                case error.POSITION_UNAVAILABLE:
                    return callback("Location information is unavailable.");
                case error.TIMEOUT:
                    // enableHighAccuracy = true can be slow and time out, so let's try to disable it
                    navigator.geolocation.getCurrentPosition((pos) =>
                            successCallback(pos),
                        () => callback("The request to get user location timed out."),
                        {enableHighAccuracy: false, maximumAge:10000, timeout:5000});
                    return;
                default:
                    return callback("An unknown error occurred.");
            }
        }

        navigator.geolocation.getCurrentPosition((pos) =>
                successCallback(pos),
            handleError,
            {enableHighAccuracy: true, maximumAge:30000, timeout:5000}
        );
    }

    /**
     * Binds the listeners for the model change event to properly update the settings
     * @param model
     * @private
     */
    _bindModelChangeEvents(model){
        const self = this;

        model.onChange("acdc.enabled", () => {
            self.settingsService.writeSetting(SETTINGS.enableAcdc, model.acdc.enabled, (err) => {
                if (err)
                    console.log(`Could not update ${SETTINGS.enableAcdc} in settings`, err);
            });
        });

        model.onChange("acdc.did_enabled", () => {
            self.settingsService.writeSetting(SETTINGS.didKey, model.acdc.did_enabled ? self._generateDID() : false, (err) => {
                if (err)
                    console.log(`Could not update ${SETTINGS.didKey} in settings`, err);
            });
        });

        model.onChange("acdc.location_enabled", () => {
            self.settingsService.writeSetting(SETTINGS.locationKey, model.acdc.location_enabled, (err) => {
                if (err)
                    console.log(`Could not update ${SETTINGS.locationKey} in settings`, err);
            });
        });
    }

    /**
     * This needs to read:
     *  - user did;
     *  - location;
     * when user has given access
     * @private
     */
    _bindUserDetails(event, callback){
        const self = this;

        const doDID = function(callback){
            self.settingsService.readSetting(SETTINGS.didKey, (err, did) => {
                if (err || !did)
                    return callback(undefined, undefined);
                callback(undefined, did);
            });
        }

        const doLocation = function(callback){
            self.settingsService.readSetting(SETTINGS.locationKey, (err, location) => {
                if (err || !location)
                    return callback(undefined, undefined);
                self._getPosition((err, position) => {
                    if (err){
                        console.log(err);
                        return callback(undefined, undefined);
                    }
                    callback(undefined, position);
                });
            });
        }

        doDID((err, did) => {
            if (err)
                return callback(err);
            doLocation((err, location) => {
                if (err)
                    return callback(err);
                event._bindUserDetails(did, location);
                callback(undefined, event);
            });
        });
    }

    createScanEvent(scanData){
        const event = new ScanEvent(scanData);
        event.report = (cb) => this._report.call(this, event, cb);
        return event;
    }

    _report(evt, callback){
        const self = this;
        self.settingsService.readSetting(SETTINGS.enableAcdc, (err, enabled) => {
            if (err)
                return callback(err);

            if (!enabled)
                return callback ? callback(undefined, new ScanResult()) : undefined;

            callback = callback || function(err, result){
                if (err)
                    return console.log(err);
                console.log(result);
            }

            self.settingsService.readSetting(SETTINGS.networkName, (err, networkName) => {
                if (err)
                    return callback(err);

                evt.networkName = networkName;
                this._bindUserDetails(evt, (err, boundEvt) => {
                    if (err)
                        return callback(`Could not bind user details`);
                    self.http.doPost(API_HUB_ENDPOINT, JSON.stringify(boundEvt), HEADERS, (err, result) => {
                        if (err)
                            return callback(err);
                        try{
                            result = JSON.parse(result);
                        } catch (e) {
                            return callback(e);
                        }
                        callback(undefined, result);
                    });
                });
            });
        });
    }
}

let reportingService;

/**
 * Singleton enforcing method
 * @param {SettingServices} [settingsServices] the App's settings provider
 * @return {ReportingService}
 * @module Reporting
 */
const getInstance = function(settingsServices){
    if (!reportingService)
        reportingService = new ReportingService(settingsServices);

    return reportingService;
}

module.exports = {
    getInstance,
    ACDC_STATUS
};

