import "./../loader-config.js";
import {Spinner, prepareView, createFormElement, toggleViewPassword, prepareViewContent} from "./services/UIService.js";
import WalletService from "./services/WalletService.js";
import FileService from "./services/FileService.js";
import WalletRunner from "./services/WalletRunner.js";

function MainController() {

  const DEVELOPMENT_EMAIL = "dev@autologin.dev";
  const DEVELOPMENT_USERNAME = "autologin";

  const walletService = new WalletService();
  const fileService = new FileService();
  let spinner;

  this.formFields = [];
  const self = this;

  /**
   * Return path to file relative to the `loader` folder
   *
   * @param {string} file
   * @return {string}
   */
  function getUrl(file) {
    let pathSegments = window.location.pathname.split("/");
    let loaderPath = pathSegments.pop();
    if (!loaderPath) {
      loaderPath = pathSegments.pop();
    }

    return `${loaderPath}/${file}`;
  }


  function hash(arr) {
    const crypto = require("opendsu").loadApi("crypto");
    let hsh = crypto.sha256(encodeURI(arr.join("/")));
    return hsh;
  }

  function generateRandom(charactersSet, length) {
    let result = '';
    const charactersLength = charactersSet.length;
    for (let i = 0; i < length; i++) {
      result += charactersSet.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  function getSecretLocalToken(development, mobile) {
    if (mobile) {
      return "SuperUserSecurePassword1!";
    }
    let storageKey = "secretToken";

    if (development) {
      return generateRandom(characters, 32); //new key each time
    }
    let secret = localStorage.getItem(storageKey);
    if (!secret) {
      secret = generateRandom(characters, 32);
      localStorage.setItem(storageKey, secret);
    }
    return secret;
  }

  function getWalletSecretArrayKey() {
    let arr = Object.values(LOADER_GLOBALS.credentials).filter(elem => typeof elem !== "boolean");
    return arr;
  }

  /**
   * Run the loader using credentials provided from external source
   * These credentials should be stored in the localStorage before
   */
  function runExternalAutologin() {
    spinner.attachToView();
    LOADER_GLOBALS.loadCredentials();
    const secretArrayKey = getWalletSecretArrayKey();
    const isArrayEmpty = secretArrayKey.filter(el => el && el.trim().length !== 0).length === 0;

    if (isArrayEmpty) {
      return console.warn("Array of secrets is not loaded yet...", secretArrayKey);
    }

    walletService.create(LOADER_GLOBALS.environment.domain, secretArrayKey, (err, wallet) => {
      if (err) {
        throw createOpenDSUErrorWrapper(`Failed to create wallet in domain ${LOADER_GLOBALS.environment.domain}`, err);
      }
      console.log("A new wallet got initialised...", wallet.getCreationSSI(true));
      return self.openWallet();
    });
  }

  /**
   * Run the loader in development mode
   *
   * Create a default wallet with a default password if none exists
   * and load it
   */
  function runInDevelopment() {
    runInAutologin(true);
  }

  /**
   * Run the loader in autologing mode
   *
   * Create a default wallet with a default password if none exists
   * and load it
   */
  function runInAutologin(development, mobile) {
    spinner.attachToView();
    if (!LOADER_GLOBALS.credentials.isValid) {
      let credentials = {};
      if (!development) {
        credentials.email = "wallet@invisible";
        credentials.password = getSecretLocalToken(development, mobile);
        credentials.username = "private";
        credentials.company = "OpenDSU Development INC.";
      } else {
        credentials.email = DEVELOPMENT_EMAIL;
        credentials.password = getSecretLocalToken(development, mobile);
        credentials.username = DEVELOPMENT_USERNAME;
        credentials.company = "OpenDSU Development INC.";
      }
      LOADER_GLOBALS.credentials = credentials;
      LOADER_GLOBALS.credentials.isValid = true;

      if (!development) {
        LOADER_GLOBALS.saveCredentials();
      }
    }

    walletService.create(LOADER_GLOBALS.environment.domain, getWalletSecretArrayKey(), (err, wallet) => {
      if (err) {
        throw createOpenDSUErrorWrapper(`Failed to create wallet in domain ${LOADER_GLOBALS.environment.domain}`, err);
      }
      console.log("A new wallet got initialised...", wallet.getCreationSSI(true));
      return self.openWallet();
    });
  }

  function runInMobileAutologin() {
    return runInAutologin(false, true);
  }

  this.initSpinner = function () {
    spinner = new Spinner(document.getElementsByTagName("body")[0]);
  }

  this.init = function () {
    this.initSpinner()

    if (LOADER_GLOBALS.environment.mode === "external-autologin") {
      return runExternalAutologin();
    }

    if (LOADER_GLOBALS.environment.mode === "dev-autologin") {
      return runInDevelopment();
    }

    if (LOADER_GLOBALS.environment.mode === "mobile-autologin") {
      return runInMobileAutologin();
    }

    if (LOADER_GLOBALS.environment.mode === "autologin") {
      return runInAutologin();
    }

    if (!(LOADER_GLOBALS.environment.mode === "secure" || LOADER_GLOBALS.environment.mode === "dev-secure")) {
      return OpenDSUSafeCallback(callback)(createOpenDSUErrorWrapper("Unknown mode in environment.js"));
    }

    /*    if (LOADER_GLOBALS.environment.mode === "dev-secure" && !LOADER_GLOBALS.credentials.username) {
          LOADER_GLOBALS.credentials.username = "devsuperuser"
          LOADER_GLOBALS.credentials.email = "dev@superuser.dev";
          LOADER_GLOBALS.credentials.company = "Company Inc";
          LOADER_GLOBALS.credentials.password = "SuperUserSecurePassword1!";
          LOADER_GLOBALS.credentials['confirm-password'] = "SuperUserSecurePassword1!";
        }*/

    let windowUrl = new URL(window.location.href);
    if (windowUrl.searchParams.get("login") !== null) {
      return this.displayContainer(LOADER_GLOBALS.PASSWORD_CONTAINER_ID);
    }
    this.displayContainer(LOADER_GLOBALS.NEW_OR_RESTORE_CONTAINER_ID);
  };

  this.goToLandingPage = function () {
    window.location.replace("./");
  };

  this.displayContainer = function (containerId) {
    document.getElementById(containerId).style.display = "block";
  };

  this.validateCredentials = function () {
    let btn = document.getElementById("open-wallet-btn");
    if (this.formIsValid()) {
      btn.removeAttribute("disabled");
    } else {
      btn.setAttribute("disabled", "disabled");
    }
  };

  this.formIsValid = function () {
      return validator.validateForm(self.formFields);
  }

  this.pinCheckboxHandler = function (event) {
    LOADER_GLOBALS.loadPinCodeCredentials(LOADER_GLOBALS.getLastPinCode());
    document.getElementById("pin-container").classList.add("d-none");
    this.createForm();
    this.populateForm();
    this.loginWithPin = false;
    document.getElementById("register-details-error").innerText = "";
  }

  this.createForm = function () {
    let formElement = document.getElementsByClassName("credentials-panel-action-box")[0];
    LOADER_GLOBALS.REGISTRATION_FIELDS.slice().reverse().forEach(field => {
      if (field.visible && field.fieldId !== "confirm-password") {
        self.formFields.push(field.fieldId);
        formElement.prepend(createFormElement(field, {inputType: "simpleInput"}));
      }
    })
  }

  this.populateForm = function () {
    this.formFields.forEach(item => {
      if (document.getElementById(item)) {
        let htmlElem = document.getElementById(item);
        htmlElem.value = LOADER_GLOBALS.credentials[item] || "";
      }
    });

    this.validateCredentials();
  }

  this.openWallet = function (event) {
    if (this.loginWithPin) {
      LOADER_GLOBALS.clearCredentials();
      const pinCode = document.getElementById("pincode").value;
      if (LOADER_GLOBALS.pinCodeExists(pinCode)) {
        LOADER_GLOBALS.loadPinCodeCredentials(pinCode);
      }
    }

    if (event) {
      event.preventDefault();
    }
    if (spinner) {
      spinner.attachToView();
      spinner.setStatusText("Opening wallet...");
    }

    this.formFields.forEach(field => {
      if (field !== "confirm-password") {
        LOADER_GLOBALS.credentials[field] = document.getElementById(field).value;
      }
    })

    walletService.load(LOADER_GLOBALS.environment.domain, getWalletSecretArrayKey(), (err, wallet) => {
      if (err) {
        spinner.removeFromView();
        console.error("Failed to load the wallet in domain:", LOADER_GLOBALS.environment.domain, getWalletSecretArrayKey(), err);
        return (document.getElementById("register-details-error").innerText = "Invalid credentials");
      }

      let writableWallet = wallet;

      writableWallet.getKeySSIAsString((err, keySSI) => {
        if (err) {
          console.error(err);
          return console.error("Operation failed. Try again");
        }

        console.log(`Loading wallet ${keySSI}`);

        new WalletRunner({
          seed: keySSI,
          spinner
        }).run();
      });
    });
  };

}

const controller = new MainController();
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
urlParams.get('login')
if (urlParams.get('login') === "auto" && LOADER_GLOBALS.credentials && Object.keys(LOADER_GLOBALS.credentials).length !== 0) {
  controller.initSpinner();
  controller.openWallet();
} else {
  document.addEventListener("DOMContentLoaded", function () {

    if (LOADER_GLOBALS.hasPinCodes()) {
      document.getElementById("pin-container").classList.remove("d-none");
      document.getElementById("open-wallet-btn").removeAttribute("disabled");
      controller.init();
      controller.loginWithPin = true;
    } else {
      controller.createForm();
      controller.init();
      controller.populateForm();
      controller.loginWithPin = false
    }

    prepareViewContent();

    let passToggles = document.getElementsByClassName("toggle-password");
    for (let i = 0; i < passToggles.length; i++) {
      passToggles[i].addEventListener("click", (event) => {
        toggleViewPassword(event);
      })
    }
  });
}
window.controller = controller;
