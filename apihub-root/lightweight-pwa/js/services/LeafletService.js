import environment from "../../environment.js";
import constants from "../constants.js"
import CustomError from "../utils/CustomError.js";
import RequestWizard from "./RequestWizard.js";
import {ERROR_TYPES} from "./RequestWizard.js";
import LightSmartUrl from "../utils/LightSmartUrl.js";

import {goToErrorPage, validateGTIN} from "../utils/utils.js";

class LeafletService {
  constructor(gtin, batch, expiry, leafletLang, epiDomain) {

    this.gtin = gtin;
    this.batch = batch;
    this.expiry = expiry;
    this.leafletLang = leafletLang;
    this.epiDomain = epiDomain;

    let gtinValidationResult = validateGTIN(this.gtin);
    if (!gtinValidationResult.isValid) {
      goToErrorPage(gtinValidationResult.errorCode, new Error(gtinValidationResult.message));
    }
  }

  setLeafletLanguage(lang) {
    this.leafletLang = lang;
  }

  async getBDNS() {
    return await new Promise((resolve, reject) => {
      fetch(environment.bdnsUrl)
        .then(respond => {
          respond.json().then((result) => {
            resolve(result)
          }).catch(e => {
            console.log(e);
            reject(e);
          })
        }).catch(err => {
        reject(err)
      })
    })
  }

  getAnchoringServices(bdnsResult, domain) {
    try {
      if (!bdnsResult[domain] || !bdnsResult[domain]["anchoringServices"] || !Array.isArray(bdnsResult[domain]["anchoringServices"])) {
        throw new Error("There is no valid associated BDNS configuration for " + domain)
      }
      return bdnsResult[domain]["anchoringServices"]
    } catch (e) {
      throw e
    }
  }

  prepareUrlsForGtinOwnerCall(arrayOfUrls, domain, gtin) {
    let newArray = [];
    for (let i = 0; i < arrayOfUrls.length; i++) {

      let smartUrl = new LightSmartUrl(arrayOfUrls[i]);
      smartUrl = smartUrl.concatWith(`/gtinOwner/${domain}/${gtin}`);

      newArray.push(smartUrl.getRequest({
        method: "GET",
      }));
    }
    return newArray;
  }

  async detectGTINOwner(GTIN, bdnsResult, timePerCall, totalWaitTime) {
    let anchoringServices = this.getAnchoringServices(bdnsResult, this.epiDomain);
    let validateResponse = function (response) {
      return new Promise((resolve) => {
        if (response.status === 200) {
          //we can consider a valid response only when 200 status code
          resolve(true);
          return;
        }
        if (response.status === 404) {
          goToErrorPage(constants.errorCodes.gtin_not_created, new Error(`Could not detect the owner of GTIN: ${GTIN}`));
          return;
        }
        resolve(false);
      });
    }

    return new Promise(async (resolve, reject) => {
      let requestWizard = new RequestWizard(timePerCall, totalWaitTime);
      try {
        let gtinOwnerResponse = await requestWizard.fetchMeAResponse(this.prepareUrlsForGtinOwnerCall(anchoringServices, this.epiDomain, GTIN), validateResponse);
        if (gtinOwnerResponse) {
          gtinOwnerResponse.json().then(result => {
            let gtinOwnerDomain = result.domain;
            resolve(gtinOwnerDomain);
          }).catch((err) => {
            console.log(err);
            reject(new CustomError(constants.errorCodes.unknown_error));
            return;
          });
          return;
        }
        reject(new CustomError(constants.errorCodes.gtin_not_created));
        return;
      } catch (err) {
        if (err.code && err.code === ERROR_TYPES.TIMEOUT) {
          reject(new CustomError(constants.errorCodes.gto_timeout));
          return;
        }
        if (err.code && err.code === ERROR_TYPES.MISCONFIGURATION) {
          reject(new CustomError(constants.errorCodes.misconfiguration));
          return;
        }
        reject(err);
      }
    });
  }

  getLeafletRequest(leafletApiUrl) {

    let smartUrl = new LightSmartUrl(leafletApiUrl);
    smartUrl = smartUrl.concatWith(`/leaflets/${this.epiDomain}?leaflet_type=leaflet&lang=${this.leafletLang}&gtin=${this.gtin}`);

    if (this.batch) {
      smartUrl = smartUrl.concatWith(`&batch=${this.batch}`);
    }

    let header = {"epiProtocolVersion": environment.epiProtocolVersion || "1"};

    return smartUrl.getRequest({
      method: "GET", headers: header
    });
  }

  prepareUrlsForLeafletCall(arrayOfUrls) {
    let newArray = [];
    for (let i = 0; i < arrayOfUrls.length; i++) {
      newArray.push(this.getLeafletRequest(arrayOfUrls[i]));
    }
    return newArray;
  }

  async getLeafletResult(timePerCall, totalWaitTime, gto_TimePerCall, gto_TotalWaitTime) {
    return new Promise(async (resolve, reject) => {
      let leafletResult = null;
      let globalTimer = setTimeout(() => {
        if (!leafletResult) {
          reject({errorCode: constants.errorCodes.leaflet_timeout});
          return
        }
      }, totalWaitTime);

      let bdns = await this.getBDNS();
      let ownerDomain;
      try {
        ownerDomain = await this.detectGTINOwner(this.gtin, bdns, gto_TimePerCall, gto_TotalWaitTime);
      } catch (e) {
        let errorCode = e.code ? e.code : constants.errorCodes.gtin_not_created;
        reject({errorCode});
        return;
      }
      if (ownerDomain) {
        let leafletSources = this.getAnchoringServices(bdns, ownerDomain);
        let targets = this.prepareUrlsForLeafletCall(leafletSources);

        let validateResponse = function (response) {
          return new Promise((resolve) => {
            if (response.status >= 500) {
              return resolve(false);
            }
            if (response.status === 404) {
              goToErrorPage(constants.errorCodes.no_uploaded_epi , new Error(`Product found but no associated leaflet for GTIN : ${this.gtin}`));
              return;
            }
            resolve(true);
          });
        }

        let requestWizard = new RequestWizard(timePerCall, totalWaitTime);
        try {
          let leafletResponse = await requestWizard.fetchMeAResponse(targets, validateResponse);
          if (!leafletResponse) {
            return reject({errorCode: constants.errorCodes.unknown_error});
          }
          switch (leafletResponse.status) {
            case 400:
              leafletResponse.text().then(errorJSON => {
                try {
                  errorJSON = JSON.parse(errorJSON);
                } catch (err) {
                  errorJSON = {code: constants.errorCodes.unknown_error};
                }
                return reject({errorCode: errorJSON.code});
              }).catch(err => {
                reject({errorCode: constants.errorCodes.unknown_error});
              });
            case 404:
              return reject({errorCode: constants.errorCodes.no_uploaded_epi});
            case 529:
              return reject({errorCode: constants.errorCodes.get_dsu_timeout});
            case 304:
            case 200:
              if (globalTimer) {
                clearTimeout(globalTimer);
              }
              leafletResponse.json().then(leaflet => {
                resolve(leaflet);
              }).catch(err => {
                reject({errorCode: constants.errorCodes.unknown_error});
              });
              return;
            default:
              reject({errorCode: constants.errorCodes.unknown_error});
          }
        } catch (err) {
          if (err.code && err.code === ERROR_TYPES.MISCONFIGURATION) {
            reject({errorCode: constants.errorCodes.misconfiguration});
            return;
          }
          if (err.code && err.code === ERROR_TYPES.TIMEOUT) {
            reject({errorCode: constants.errorCodes.leaflet_timeout});
            return;
          }
          if (!err.errorCode) {
            err.errorCode = constants.errorCodes.unknown_error;
          }
          reject(err);
        }

        return;
      }

      reject({errorCode: constants.errorCodes.unknown_error});
    })
  }
}

export default LeafletService;
