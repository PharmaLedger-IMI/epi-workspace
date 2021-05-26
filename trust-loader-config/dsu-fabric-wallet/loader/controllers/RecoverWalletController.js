import "./../loader-config.js";
import {Spinner, prepareView, createFormElement, toggleViewPassword} from "./services/UIService.js";
import WalletService from "./services/WalletService.js";
import FileService from "./services/FileService.js";
import WalletRunner from "./services/WalletRunner.js";

require

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
    resolver.loadDSU(keySSI, callback);
  }

  function getWalletSecretArrayKey(usePin) {
    let arr = Object.values(LOADER_GLOBALS.credentials).filter(elem => typeof elem !== "boolean");
    return arr;
  }

  this.submitPassword = function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (this.formIsValid()) {
      LOADER_GLOBALS.clearCredentials();
      formFields.forEach(field => {
        if (field !== "confirm-password") {
          LOADER_GLOBALS.credentials[field] = document.getElementById(field).value;
        }
      })
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

 function createWallet(){
   walletService.createWithKeySSI(LOADER_GLOBALS.environment.domain, {
     secret: getWalletSecretArrayKey(),
     walletKeySSI: recoveryKey
   }, (err, newWallet) => {
     if (err) {
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
        let newFromContent = document.getElementsByClassName("form-content-container")[0];
        newFromElement.append(buttons);
        LOADER_GLOBALS.REGISTRATION_FIELDS.slice().reverse().forEach(field => {
          if (field.visible) {
            formFields.push(field.fieldId);
            let inputElement = createFormElement(field, {
              inputType: "labeldInput",
              readonly: true,
              value: userData[field.fieldId]
            });
            newFromContent.prepend(inputElement);
          }
        })
        let passToggles = document.getElementsByClassName("toggle-password");
        for (let i = 0; i < passToggles.length; i++) {
          passToggles[i].addEventListener("click", (event) => {
            toggleViewPassword(event);
          })
        }
        spinner.removeFromView();
        /*        walletService.createWithKeySSI(LOADER_GLOBALS.environment.domain, {
                  secret: Object.values(userData),
                  walletKeySSI: recoveryKey
                }, (err, newWallet) => {
                  if (err) {
                    return console.error(err);
                  }
                  Object.keys(userData).forEach(key=>{
                    LOADER_GLOBALS.credentials[key] = userData[key];
                  })
                  LOADER_GLOBALS.saveCredentials();

                  new WalletRunner({
                    seed: recoveryKey,
                    spinner
                  }).run();
                });*/
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
