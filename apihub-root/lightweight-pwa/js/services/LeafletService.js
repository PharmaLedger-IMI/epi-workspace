import environment from "../../environment.js";
import constants from "../constants.js"
import CustomError from "../utils/CustomError.js";
import RequestWizard from "./RequestWizard.js";
import {ERROR_TYPES} from "./RequestWizard.js";
import LightSmartUrl from "../utils/LightSmartUrl.js";

import {goToErrorPage, validateGTIN} from "../utils/utils.js";

const validateGtinOwnerResponse = function (response) {
  return new Promise((resolve) => {
    if (response.status === 200) {
      //we got info in Cache
      resolve(true);
      return;
    }
    if (response.status === 404) {
      goToErrorPage(constants.errorCodes.gtin_not_created, new Error(`Could not detect the owner of GTIN`));
      return;
    }
    resolve(false);
  });
}

const validateMtimeResponse = function (response) {
  return new Promise((resolve) => {
    resolve(true);
  });
}

const validateLeafletResponse = (response) => {
  return new Promise((resolve) => {
    if (response.status >= 500) {
      return resolve(false);
    }
    if (response.status === 404) {
      goToErrorPage(constants.errorCodes.no_uploaded_epi, new Error(`Product found but no associated leaflet`));
      return;
    }
    resolve(true);
  });
}

const prepareUrlsForMtimeCall = function (arrayOfUrls) {
  let newArray = [];
  for (let i = 0; i < arrayOfUrls.length; i++) {
    let smartUrl = new LightSmartUrl(arrayOfUrls[i]);
    smartUrl = smartUrl.concatWith("/mtime");
    newArray.push(this.getLeafletRequest(smartUrl));
  }
  debugger;
  return newArray;
}


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

  prepareUrlsForGtinOwnerCall(arrayOfUrls, domain, gtin, asRequests = true) {
    let newArray = [];
    for (let i = 0; i < arrayOfUrls.length; i++) {
      let smartUrl = new LightSmartUrl(arrayOfUrls[i]);
      smartUrl = smartUrl.concatWith(`/gtinOwner/${domain}/${gtin}`);
      if (asRequests) {
        newArray.push(smartUrl.getRequest({
          method: "GET"
        }));
      } else {
        newArray.push(smartUrl);
      }
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

        let validateResponse = (response) => {
          return new Promise((resolve) => {
            if (response.status >= 500) {
              return resolve(false);
            }
            if (response.status === 404) {
              goToErrorPage(constants.errorCodes.no_uploaded_epi, new Error(`Product found but no associated leaflet for GTIN : ${this.gtin}`));
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

  async getDomainInfo(domain) {
    let bdns = await this.getBDNS();
    return bdns[domain];
  }

  async getLeafletUsingCache(timePerCall, totalWaitTime, gto_TimePerCall, gto_TotalWaitTime) {
    if (!environment.cacheURL) {
      console.log("No Cache Url available in environment. Fallback to default impl.");
      return this.getLeafletResult(timePerCall, totalWaitTime, gto_TimePerCall, gto_TotalWaitTime);
    }

    let targetEndpoints = [environment.cacheURL];
    const TAG_IDENTIFIER = "tag=KKKK";
    let identifyGtinOwner = (epiDomain, gtin) => {
      return new Promise(async (resolve, reject) => {
        let targetSubDomains = [];
        try {
          const bdns = await this.getBDNS();
          for (let domain of Object.keys(bdns)) {
            if (domain.startsWith(epiDomain)) {
              targetSubDomains.push(domain);
            }
          }
        } catch (err) {
          console.log("Caught error during bdns reading");
          goToErrorPage(constants.errorCodes.unknown_error, new Error(`Could not read BDNS information.`));
          return;
        }

        const gtinOwnerCache = this.prepareUrlsForGtinOwnerCall(targetEndpoints, epiDomain, gtin, false);
        const cacheTargetBase = gtinOwnerCache.pop();
        for (let targetSubDomain of targetSubDomains) {
          gtinOwnerCache.push(cacheTargetBase.concatWith(`?${TAG_IDENTIFIER}${targetSubDomain}`).getRequest({
              method: "GET"
            }));
        }
        let requestWizard = new RequestWizard(gto_TimePerCall, gto_TotalWaitTime);
        let error;
        try {
          let cachedGtinOwnerResponse = await requestWizard.fetchMeAResponse(gtinOwnerCache, validateGtinOwnerResponse);
          if (cachedGtinOwnerResponse) {
            let result = await cachedGtinOwnerResponse.json();
            return resolve(result.domain);
          }
        } catch (err) {
          console.log("Caught error during gtinOwner request", err);
          error = err;
        }

        return reject(new CustomError(constants.errorCodes.unknown_error, undefined, error));
      });
    }

    let getMtimeForLeaflet = (domain) => {
      return new Promise(async (resolve, reject) => {
        try {
          let bdns = await this.getBDNS();
          let requestWizard = new RequestWizard(gto_TimePerCall, gto_TotalWaitTime);
          let mtimeResponse = await requestWizard.fetchMeAResponse(prepareUrlsForMtimeCall.call(this, this.getAnchoringServices(bdns, domain)), validateMtimeResponse);
          if (mtimeResponse.status === 200) {
            let mtime = await mtimeResponse.text();
            resolve(mtime);
          }
        } catch (err) {
          console.log("Caught an error during mtime request", err);
        }
        console.log("Not able to determine mtime. Setting mtime to date.now()");
        resolve(Date.now().toString());
      });
    }

    let retrieveLeaflet = (domain, mtime) => {
      return new Promise(async (resolve, reject) => {
        let leafletCache = this.prepareUrlsForLeafletCall(targetEndpoints);
        //we ensure to add the specific cache tag identifier
        //based on this tag the cache will know which apihub to target for the specific request
        for (let index in leafletCache) {
          let target = leafletCache[index].smartUrl;
          target = target.concatWith(`&${TAG_IDENTIFIER}${domain}`);
          if (mtime) {
            target = target.concatWith(`&mtime=${mtime}`);
          }
          leafletCache[index] = target.getRequest();
        }
        let requestWizard = new RequestWizard(timePerCall, totalWaitTime);
        let error;
        try {
          let cachedLeaflet = await requestWizard.fetchMeAResponse(leafletCache, validateLeafletResponse);
          if (cachedLeaflet) {
            let result = await cachedLeaflet.json();
            return resolve(result.domain);
          }
        } catch (err) {
          console.log("Caught error during leaflet request", err);
          error = err;
        }

        return reject(new CustomError(constants.errorCodes.unknown_error, undefined, error));
      });
    }

    return new Promise(async (resolve, reject) => {
      let globalTimer = setTimeout(() => {
        return reject({errorCode: constants.errorCodes.leaflet_timeout});
      }, totalWaitTime);

      try {
        let gtinOwnerDomain = await identifyGtinOwner(this.epiDomain, this.gtin);
        let mtime = await getMtimeForLeaflet(gtinOwnerDomain);
        let leafletResponse = await retrieveLeaflet(gtinOwnerDomain, mtime);

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
        console.log("Unable to properly retrieve leaflet due to error", err);
        reject({errorCode: constants.errorCodes.unknown_error});
      }
    });
  }
}

export default LeafletService;
