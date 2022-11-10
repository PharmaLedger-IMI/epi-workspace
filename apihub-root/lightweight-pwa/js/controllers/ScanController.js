import {convertFromISOtoYYYY_HM, goToErrorPage, goToPage, validateGTIN} from "../utils/utils.js";
import interpretGS1scan from "../utils/interpretGS1scan/interpretGS1scan.js";
import ScanService, {switchFacingMode} from "../services/ScanService.js";
import {getTranslation} from "../translations.js";

function ScanController() {
  this.init = async function (facingMode) {
    let placeHolderElement = document.querySelector("#scanner-placeholder");
    this.scanService = new ScanService(placeHolderElement, facingMode);
    try {
      await this.scanService.setup();
    } catch (err) {
      this.redirectToError(err);
    }
    await this.startScanning();
  }

  this.closeModal = function (modalId) {
    document.querySelector("#" + modalId).setAttribute('style', 'display:none !important');
  }

  this.redirectToError = function (err) {
    console.log("Error on scanService ", err);
    let modal = document.querySelector("#scan-error")
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
        this.processGS1Fields(this.parseGS1Code(result.text));
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

  this.processGS1Fields = function (gs1Fields) {
    let gtinValidationResult = validateGTIN(gs1Fields.gtin);
    if (gtinValidationResult.isValid) {
      goToPage(`/leaflet.html?gtin=${gs1Fields.gtin}&batch=${gs1Fields.batchNumber}&expiry=${gs1Fields.expiry}`)
    } else {
      goToErrorPage(gtinValidationResult.errorCode);
    }
  }

  this.switchCamera = function () {
    let facingMode = this.scanService._facingMode;
    this.scanService.stop();
    clearInterval(this.scanInterval);
    switchFacingMode(facingMode);
    scanController.init();
  }
}

const scanController = new ScanController();
scanController.init();

window.scanController = scanController;
