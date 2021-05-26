import configConstants from './config-constants.js';

window.LOADER_GLOBALS = configConstants;

let linkElement = document.createElement("link");
let theme = LOADER_GLOBALS.THEME;
linkElement.href = "assets/css/" + theme + ".css";
linkElement.type = "text/css";
linkElement.rel = "stylesheet";
document.head.appendChild(linkElement);


if (LOADER_GLOBALS.PLUGIN_SCRIPT) {
  let scriptElement = document.createElement("script");
  scriptElement.src = LOADER_GLOBALS.PLUGIN_SCRIPT;
  scriptElement.type = "module";
  document.body.appendChild(scriptElement);
}


import env from "./environment.js";

LOADER_GLOBALS.environment = env;

LOADER_GLOBALS.LOCALSTORAGE_CREDENTIALS_KEY = env.appName + "-credentials";
LOADER_GLOBALS.LOCALSTORAGE_PINCODE_KEY = env.appName + "-pincode";

LOADER_GLOBALS.saveCredentials = function () {
  localStorage.setItem(LOADER_GLOBALS.LOCALSTORAGE_CREDENTIALS_KEY, JSON.stringify(LOADER_GLOBALS.credentials));
}

LOADER_GLOBALS.savePinCodeCredentials = function (pincode, credentials) {
  const crypto = require("opendsu").loadAPI("crypto");
  const encryptionKey = crypto.deriveEncryptionKey(pincode);
  const encryptedCredentials = crypto.encrypt(JSON.stringify(credentials), encryptionKey);
  localStorage.setItem(pincode, JSON.stringify(encryptedCredentials));
  addPin(pincode);
}

function addPin(pinCode) {
  let pinArr = localStorage.getItem(LOADER_GLOBALS.LOCALSTORAGE_PINCLOCALSTORAGE_PINCODE_KEYODE_KEY);
  if (!pinArr) {
    pinArr = [pinCode];
  } else {
    pinArr = JSON.parse(pinArr);
    pinArr.push(pinCode);
  }
  localStorage.setItem(LOADER_GLOBALS.LOCALSTORAGE_PINCODE_KEY, JSON.stringify(pinArr));
}

function removePin(pinCode) {
  let pinArr = localStorage.getItem(LOADER_GLOBALS.LOCALSTORAGE_PINCODE_KEY);
  if (pinArr) {
    pinArr = JSON.parse(pinArr);
    pinArr = pinArr.filter(elem => elem !== pinCode);
  } else {
    return
  }
  localStorage.setItem(LOADER_GLOBALS.LOCALSTORAGE_PINCODE_KEY, JSON.stringify(pinArr));
}

LOADER_GLOBALS.loadPinCodeCredentials = function (pincode) {
  let pinCodeCredentials = localStorage.getItem(pincode);
  pinCodeCredentials = $$.Buffer.from(JSON.parse(pinCodeCredentials));
  if (!pinCodeCredentials) {
    pinCodeCredentials = "{}";
  } else {
    const crypto = require("opendsu").loadAPI("crypto");
    const encryptionKey = crypto.deriveEncryptionKey(pincode);
    pinCodeCredentials = crypto.decrypt(pinCodeCredentials, encryptionKey);
  }
  LOADER_GLOBALS.credentials = JSON.parse(pinCodeCredentials.toString());
}

LOADER_GLOBALS.changePinCode = function (newPin, oldPin) {
  const pinCredentials = localStorage.getItem(oldPin);
  localStorage.setItem(newPin, pinCredentials);
  localStorage.removeItem(oldPin);
}

LOADER_GLOBALS.hasPinCodes = function () {
  return !!localStorage.getItem(LOADER_GLOBALS.LOCALSTORAGE_PINCODE_KEY);
}

LOADER_GLOBALS.getLastPinCode = function () {
  let pinArr = localStorage.getItem(LOADER_GLOBALS.LOCALSTORAGE_PINCODE_KEY);
  if (!pinArr) {
    return null;
  } else {
    pinArr = JSON.parse(pinArr);
    return pinArr[pinArr.length - 1];
  }
}

LOADER_GLOBALS.pinCodeExists = function (pinCode) {
  let pinArr = localStorage.getItem(LOADER_GLOBALS.LOCALSTORAGE_PINCODE_KEY);
  if (!pinArr) {
    return false;
  } else {
    return pinArr.indexOf(pinCode)>=0;
  }
}

LOADER_GLOBALS.loadCredentials = function () {
  let knownCredentials = localStorage.getItem(LOADER_GLOBALS.LOCALSTORAGE_CREDENTIALS_KEY);
  if (!knownCredentials) {
    knownCredentials = "{}";
  }
  LOADER_GLOBALS.credentials = JSON.parse(knownCredentials);
}

LOADER_GLOBALS.clearCredentials = function () {
  localStorage.removeItem(LOADER_GLOBALS.LOCALSTORAGE_CREDENTIALS_KEY);
  LOADER_GLOBALS.credentials = {};
}

LOADER_GLOBALS.loadCredentials();

if (typeof require !== 'undefined') {
  let config = require("opendsu").loadApi("config");
  config.autoconfigFromEnvironment(LOADER_GLOBALS.environment);
}
