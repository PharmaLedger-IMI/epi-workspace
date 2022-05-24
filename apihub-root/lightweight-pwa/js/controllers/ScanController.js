import {convertFromISOtoYYYY_HM, goToPage} from "../utils/utils.js";
import interpretGS1scan from "../utils/interpretGS1scan/interpretGS1scan.js";
import ScanService, {switchFacingMode} from "../services/ScanService.js";

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

  this.redirectToError = function (err) {
    console.log("Error on scanService ", err);
    goToPage("error.html")
  }

  this.cancelHandler = function () {
    goToPage("index.html");
  }

  this.startScanning = async function () {
    this.scanInterval = setInterval(() => {
      this.scanService.scan().then(result => {
        if (!result) {
          return;
        }
        console.log("Scan result:", result);
        this.scanService.stop();
        clearInterval(this.scanInterval);

        this.processGS1Fields(this.parseGS1Code(result.text));
      }).catch(err => {
        console.log("Caught", err);
      });
    }, 100);
  }

  this.parseGS1Code = function (scannedBarcode) {
    let gs1FormatFields;
    try {
      gs1FormatFields = interpretGS1scan.interpretScan(scannedBarcode);
    } catch (e) {
      this.redirectToError(e);
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
      gs1Fields.expiry = convertFromISOtoYYYY_HM(gs1Fields.expiry);
    }

    return gs1Fields;
  }

  this.processGS1Fields = function (gs1Fields) {
    let domainName = "epi";
    goToPage(`leaflet.html?gtin=${gs1Fields.gtin}&batch=${gs1Fields.batchNumber}&expiry=${gs1Fields.expiry}`)
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
