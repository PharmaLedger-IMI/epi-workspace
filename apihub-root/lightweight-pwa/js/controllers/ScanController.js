import {
  convertFromISOtoYYYY_HM,
  goToErrorPage,
  goToPage,
  enableConsolePersistence,
} from "../utils/utils.js";

enableConsolePersistence();
document.getElementsByTagName("body").onload = translate();

import interpretGS1scan from "../utils/interpretGS1scan/interpretGS1scan.js";
import ScanService from "../services/ScanService.js";
import {getTranslation, translate} from "../translations.js";
import constants from "../constants.js";

function ScanController() {
  this.init = async function (forceNewCamera) {
    document.querySelector(".loader-container").setAttribute('style', 'display:block');
    let placeHolderElement = document.querySelector("#scanner-placeholder");
    if (!forceNewCamera) {
      this.scanService = new ScanService(placeHolderElement);
    }
    try {
      await this.scanService.setup(forceNewCamera);
    } catch (err) {
      this.redirectToError(err);
    }
    await this.startScanning();
    document.querySelector(".loader-container").setAttribute('style', 'display:none');
  }

  this.closeModal = function (modalId) {
    document.querySelector("#" + modalId).setAttribute('style', 'display:none !important');
    if (document.querySelector("#scan-error").style.display === 'none') {
      document.querySelector(".scan-cancel").setAttribute("tabindex", "1");
      document.querySelector(".camera-switch").setAttribute("tabindex", "2");
    }
  }

  this.redirectToError = function (err) {
    console.log("Error on scanService ", err);
    let modal = document.querySelector("#scan-error")
    document.querySelector(".scan-cancel").setAttribute("tabindex", "-1");
    document.querySelector(".camera-switch").setAttribute("tabindex", "-1");
    if (err.scanResult) {
      modal.querySelector(".modal-title").innerHTML = getTranslation("scan_parse_error");
      modal.querySelector(".modal-content").innerHTML = `<div>${getTranslation("scan_parse_error_message")}  ${err.scanResult}</div>`;
    }
    modal.setAttribute('style', 'display:flex !important');
    //  goToPage("error.html")
  }

  this.cancelHandler = function () {
    goToPage("/index.html");
  }

  this.startScanning = async function () {
    let scanResult = null;
    this.scanInterval = setInterval(() => {
      this.scanService.scan().then(result => {
        if (!result) {
          return;
        }
        console.log("Scan result:", result);
        this.scanService.stop();
        clearInterval(this.scanInterval);
        scanResult = result.text;
        this.processGS1Fields(scanResult)
      }).catch(err => {
        err.scanResult = scanResult;
        this.redirectToError(err);
        console.log("Caught", err);
      });
    }, 100);
  }

  this.parseGS1Code = function (scannedBarcode) {
    let gs1FormatFields;
    try {
      gs1FormatFields = interpretGS1scan.interpretScan(scannedBarcode);
    } catch (e) {
      throw e;
      return;
    }

    return this.parseGs1Fields(gs1FormatFields.ol);
  }

  this.parseGs1Fields = function (orderedList) {
    const gs1Fields = {};
    const fieldsConfig = {
      "GTIN": "gtin",
      "BATCH/LOT": "batchNumber",
      "SERIAL": "serialNumber",
      "USE BY OR EXPIRY": "expiry"
    };

    orderedList.map(el => {
      let fieldName = fieldsConfig[el.label];
      gs1Fields[fieldName] = el.value;
    })

    if (gs1Fields.expiry) {
      try {
        gs1Fields.expiry = convertFromISOtoYYYY_HM(gs1Fields.expiry);
      } catch (e) {
        gs1Fields.expiry = null;
      }

    }

    return gs1Fields;
  }

  this.processGS1Fields = function (scanResultText) {
    let gs1Fields = null;
    try {
      gs1Fields = this.parseGS1Code(scanResultText);
      goToPage(`/leaflet.html?gtin=${gs1Fields.gtin}&batch=${gs1Fields.batchNumber}&expiry=${gs1Fields.expiry}`);
    } catch (err) {
      if (err.message) {
        if (err.message.includes("INVALID CHECK DIGIT:")) {
          goToErrorPage(constants.errorCodes.gtin_wrong_digit, err);
          return;
        }
        if (err.message.includes("SYNTAX ERROR:")) {
          goToErrorPage(constants.errorCodes.gtin_wrong_chars, err);
          return;
        }
      }
      goToErrorPage(constants.errorCodes.unknown_error, err);
    }
  }

  this.switchCamera = function () {
    //this.scanService.stop();
    clearInterval(this.scanInterval);
    scanController.init(true);
  }

  let addEventListeners = () => {
    document.getElementById("cancel-scan-button").addEventListener("click", this.cancelHandler)
    document.getElementById("change-camera-button").addEventListener("click", this.switchCamera)
    document.getElementById("close-modal-button").addEventListener("click", (event) => {
      this.closeModal(event.currentTarget.getAttribute("modal-id"));
    })

  }

  addEventListeners();
}

const scanController = new ScanController();
scanController.init();

window.scanController = scanController;
