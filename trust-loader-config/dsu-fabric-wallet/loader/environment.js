export default {
  "appName": "DSU_Fabric",
  "vault": "server",
  "agent": "browser",
  "system": "any",
  "browser": "any",
  "mode": "dev-secure",
  "vaultDomain": "vault",
  "didDomain": "vault",
  "epiDomain": "epi",
  "epiSubdomain": "epi",
  "enclaveType": "WalletDBEnclave",
  "sw": false,
  "pwa": false,
  "allowPinLogin": false,
  "companyName": "Company Inc",
  "disabledFeatures": "04, 05, 06, 07, 08, 09",
  "lockFeatures": true,
  "epiProtocolVersion": 1,
  "appBuildVersion": "v1.5.4",
  "legenda for properties": " vault:(server, browser) agent:(mobile,  browser)  system:(iOS, Android, any) browser:(Chrome, Firefox, any)" +
    " mode:(autologin,dev-autologin, secure, dev-secure, sso-direct, sso-pin) sw:(true, false) pwa:(true, false) lockFeatures: (true, false)" +
    "disabledFeatures: '01, 02 ...' - (01 = Patient leaflet, 02 = Show leaflet if batch expired, 03 = Show leaflet if batch unknown, 04 = Healthcare practitioner info, 05= Video source, 06 = Adverse Events reporting" +
    "07 = Anti-counterfeiting functions, 08 = Recall functions, 09 = Batch message) "
}
