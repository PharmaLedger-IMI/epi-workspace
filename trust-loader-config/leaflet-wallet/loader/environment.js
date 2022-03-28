export default  {
  "appName": "eLeaflet",
  "vault": "server",
  "agent": "browser",
  "system":   "any",
  "browser":  "any",
  "mode":  "autologin",
  "vaultDomain":  "vault",
  "didDomain":  "vault",
  "enclaveType": "WalletDBEnclave",
  "sw": false,
  "pwa": false,
  "allowPinLogin": false,
  "disabledFeatures": "",
  "legenda for properties": " vault:(server, browser) agent:(mobile,  browser)  system:(iOS, Android, any) browser:(Chrome, Firefox, any) mode:(development, release) sw:(true, false) pwa:(true, false)"+
    "disabledFeatures: '01, 02 ...' - (01 = Patient leaflet, 02 = Show leaflet if batch expired, 03 = Show leaflet if batch unknown, 04 = Healthcare practitioner info, 05= Video source, 06 = Adverse Events reporting" +
    "07 = Anti-counterfeiting functions, 08 = Recall functions, 09 = Batch message) "
}
