import "./../loader-config.js";
import {Spinner, prepareView, createFormElement, toggleViewPassword, showFormError} from "./services/UIService.js";
import WalletService from "./services/WalletService.js";
import FileService from "./services/FileService.js";
import WalletRunner from "./services/WalletRunner.js";

function RecoverWalletController() {
  const WALLET_MOUNT_POINT = "/writableDSU";
  let spinner;
  let USER_DETAILS_FILE = "user-details.json";
  const walletService = new WalletService();
  const fileService = new FileService();
  let self = this;
  let formFields = [];
  let recoveryKey = "";
  this.displayContainer = function (containerId) {
    document.getElementById(containerId).style.display = "block";
  };

  this.init = function () {
    spinner = new Spinner(document.getElementsByTagName("body")[0]);
    this.displayContainer("credentials-container");
  };

  this.getUserDetailsFromFile = function (wallet, callback) {
    wallet.readFile(USER_DETAILS_FILE, (err, data) => {
      if (err) {
        return callback(err);
      }
      const dataSerialization = data.toString();
      callback(undefined, JSON.parse(dataSerialization))
    });
  }

  this.goToLandingPage = function () {
    window.location.replace("./");
  };

  this.getWalletFromKeySSI = function (keySSI, callback) {
    const resolver = require("opendsu").loadAPI("resolver");
    try {
      resolver.loadDSU(keySSI, callback);
    } catch (err) {
      spinner.removeFromView();
      showFormError(document.getElementById("recover-key-form"), LOADER_GLOBALS.LABELS_DICTIONARY.WRONG_KEY);
    }

  }

  function getWalletSecretArrayKey(usePin) {
    let arr = Object.values(LOADER_GLOBALS.credentials).filter(elem => typeof elem !== "boolean");
    return arr;
  }

  this.submitPassword = function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (this.formIsValid()) {
      LOADER_GLOBALS.credentials.password =document.getElementById('password').value;
      createWallet();
    } else {
      document.getElementById("register-details-error").innerHTML = LOADER_GLOBALS.LABELS_DICTIONARY.INVALID_CREDENTIALS;
    }
  };

  this.formIsValid = function () {
    const passFiled = document.getElementById("password");
    const confirmPassField = document.getElementById("confirm-password");
    return passFiled.getAttribute('valid') && confirmPassField.getAttribute('valid');
  }

  function createWallet() {
    walletService.createWithKeySSI(LOADER_GLOBALS.environment.domain, {
      secret: getWalletSecretArrayKey(),
      walletKeySSI: recoveryKey
    }, (err, newWallet) => {
      if (err) {
        spinner.removeFromView();
        showFormError(document.getElementById("recover-key-form"), LOADER_GLOBALS.LABELS_DICTIONARY.WRONG_KEY);
        return console.error(err);
      }
      new WalletRunner({
        seed: recoveryKey,
        spinner
      }).run();
    });
  }

  this.openWallet = function (event) {
    if (event) {
      event.preventDefault();
    }
    spinner.attachToView();
    spinner.setStatusText("Opening wallet...");
    recoveryKey = document.getElementById("recover-key").value;
    this.getWalletFromKeySSI(recoveryKey, (err, wallet) => {
      if (err) {
        spinner.removeFromView();
        showFormError(document.getElementById("recover-key-form"), LOADER_GLOBALS.LABELS_DICTIONARY.WRONG_KEY);
        return console.log(err);
      }
      this.getUserDetailsFromFile(wallet, (err, userData) => {
        if (err) {
          return console.log(err);
        }

        //Show registration form
        let formElement = document.getElementsByClassName("recover-key-form")[0];
        let buttons = document.getElementsByClassName("buttons-box-set-register-details")[0];
        // const domElement = document.getElementsByClassName("recover-key-group")[0];
        formElement.remove();
        let newFromElement = document.getElementsByClassName("credentials-form")[0];
        newFromElement.classList.remove("d-none");
        let readonlyFormContent = document.getElementsByClassName("readonly-user-data")[0]
        let newFromContent = document.getElementsByClassName("form-content-container")[0];
        let recoveryText = document.getElementById("recovery-text").innerHTML = LOADER_GLOBALS.LABELS_DICTIONARY.RECOVERY_TEXT
        newFromElement.append(buttons);

        LOADER_GLOBALS.clearCredentials();
        LOADER_GLOBALS.REGISTRATION_FIELDS.slice().reverse().forEach(field => {
          if (field.visible) {
            formFields.push(field.fieldId);
            if (field.fieldId === "password" || field.fieldId === "confirm-password") {
              let inputElement = createFormElement(field, {
                inputType: "helperInput"
              });
              newFromContent.prepend(inputElement);
            } else {
              LOADER_GLOBALS.credentials[field.fieldId] = userData[field.fieldId];
              let readonlyElement = document.createElement("div");
              readonlyElement.innerHTML = `<b><span class="label">${field.fieldLabel}:</span></b> <span class="field-value">${userData[field.fieldId]}</span>`
              readonlyFormContent.prepend(readonlyElement);
            }
          }
        })
        let passToggles = document.getElementsByClassName("toggle-password");
        for (let i = 0; i < passToggles.length; i++) {
          passToggles[i].addEventListener("click", (event) => {
            toggleViewPassword(event);
          })
        }
        spinner.removeFromView();
      });
    })
  };
}

function getWalletSecretArrayKey() {
  return [];
}

let controller = new RecoverWalletController();

document.addEventListener("DOMContentLoaded", function () {
  let LABELS = LOADER_GLOBALS.LABELS_DICTIONARY;
  const page_labels = [
    {title: LABELS.APP_NAME},
    {"#recover-wallet": LABELS.RECOVER_WALLET},
    {"#recover-key-label": LABELS.RECOVER_WALLET_LABEL},
    {"#recover-key-help": LABELS.RECOVER_WALLET_HELP},
    {"#back-btn": LABELS.BACK_BUTTON_MESSAGE},
    {"#register-btn": LABELS.REGISTER_BUTTON_MESSAGE},
  ];

  prepareView(page_labels);
  controller.init();

  //for test
  /*  document.getElementById("old-password").value = LOADER_GLOBALS.credentials.password;
    document.getElementById("password").value = LOADER_GLOBALS.credentials.password + 1;
    document.getElementById("confirm-password").value = LOADER_GLOBALS.credentials.password + 1;*/

});
window.controller = controller;
