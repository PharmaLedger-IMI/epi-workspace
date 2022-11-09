import RandomRoundRobinService from "./RandomRoundRobinService.js";
import environment from "../../environment.js";

class LeafletService {
  constructor() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.gtin = urlParams.get("gtin");
    this.batch = urlParams.get("batch");
    this.expiry = urlParams.get("expiry");
    this.leafletLang = window.currentLanguage || "en";
    let lsEpiDomain = localStorage.getItem("_epiDomain_");
    this.epiDomain = lsEpiDomain || environment.epiDomain;
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

  async detectGTINOwner(GTIN, bdnsResult, timePerCall, totalWaitTime) {
    let anchoringServices = this.getAnchoringServices(bdnsResult, this.epiDomain);
    let roundRobinService = new RandomRoundRobinService(anchoringServices);

    let fetchGTO = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timePerCall);
      return new Promise((resolve, reject) => {
        let nextUrl = roundRobinService.next();
        const urlRequest = new Request(`${nextUrl.value}/gtinOwner/${this.epiDomain}/${GTIN}`, {
          method: "GET",
        });
        fetch(urlRequest, {signal: controller.signal})
          .then(response => {
            response.json().then(result => {
              console.log(result);
              clearTimeout(timeoutId);
              resolve(result.domain);
            }).catch(e => {
              resolve(null);
            })
          }).catch(e => {
          resolve(null)
        })
      })
    }

    return new Promise(async (resolve, reject) => {
      try {
        let gtinOwner = null;

        setTimeout(() => {
          if (!gtinOwner) {
            reject(new Error("Could not get a valid result"));
            return;
          }
        }, totalWaitTime)

        do {
          gtinOwner = await fetchGTO();
        } while (!gtinOwner)

        resolve(gtinOwner);

      } catch (e) {
        reject(e)
      }
    })
  }

  getLeafletRequest(leafletApiUrl) {
    let fetchUrl = `${leafletApiUrl}?leaflet_type=leaflet&lang=${this.leafletLang}&gtin=${this.gtin}&expiry=${this.expiry}`;
    fetchUrl = this.batch ? `${fetchUrl}&batch=${this.batch}` : `${fetchUrl}`
    let header = new Headers();
    header.append("epiProtocolVersion", environment.epiProtocolVersion || "1");
    header.append("getProductData", "true");
    const leafletRequest = new Request(fetchUrl, {
      method: "GET", headers: header
    });
    return leafletRequest;
  }

  async fetchLeaflet(leafletApiUrl, timePerCall) {
    return new Promise((resolve, reject) => {
      let leafletRequest = this.getLeafletRequest(leafletApiUrl);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timePerCall);
      fetch(leafletRequest, {signal: controller.signal})
        .then(response => {
          response.json().then(result => {
            if (result.resultStatus === "xml_found" || (result.resultStatus === "no_xml_for_lang" && result.availableLanguages.length >= 1)) {
              resolve(result);
            } else {
              resolve(null)
            }
          }).catch((err) => {
            resolve(null)
          });
        })
        .catch((error) => {
          resolve(null)
        });
    })

  }

  async getLeafletResult(timePerCall = 10000, totalWaitTime = 30000, gto_TimePerCall = 2000, gto_TotalWaitTime = 10000) {
    return new Promise(async (resolve, reject) => {
      let leafletResult = null;
      setTimeout(() => {
        if (!leafletResult) {
          reject({errorCode: "leafletTimeout"});
          return
        }
      }, totalWaitTime)

      try {
        if (this.resolvedleafletApiUrl) {
          try {
            let result = await this.fetchLeaflet(this.resolvedleafletApiUrl, timePerCall);
            console.log(result);
            leafletResult = result;
            resolve(leafletResult);

          } catch (e) {
            console.log("error on request leafletRequest ", e)
            reject({errorCode: "leafletTimeout"});
          }
        } else {
          let bdnsResult = await this.getBDNS();
          let ownerDomain;
          try {
            ownerDomain = await this.detectGTINOwner(this.gtin, bdnsResult, gto_TimePerCall, gto_TotalWaitTime);
          } catch (e) {
            reject({errorCode: "gtoTimeout"})
          }
          if (!ownerDomain) {
            reject({errorCode: "gtoTimeout"})
          }
          let anchoringServices = this.getAnchoringServices(bdnsResult, ownerDomain);
          let roundRobinService = new RandomRoundRobinService(anchoringServices);

          do {
            let nextUrl = roundRobinService.next();
            let leafletApiUrl = nextUrl.value + "/leaflets/" + this.epiDomain;
            let result = await this.fetchLeaflet(leafletApiUrl, timePerCall);
            if (result) {
              console.log(result);
              leafletResult = result;
              this.resolvedleafletApiUrl = leafletApiUrl
            }

          } while (!leafletResult)

          resolve(leafletResult);
          return;
        }
      } catch (e) {
        reject({errorCode: "leafletTimeout"});
      }
    })
  }
}

export default LeafletService;
