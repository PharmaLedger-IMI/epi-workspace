export default {
  "appName": "Demiurge",
  "vault": "server",
  "agent": "browser",
  "system": "any",
  "browser": "any",
  "mode": "dev-secure",
  "vaultDomain": "vault",
  "didDomain": "vault",
  "enclaveType": "WalletDBEnclave",
  "disabledFeatures": "",
  "enable_credentials_management": false,
  "enable_enclaves_management": false,
  "enable_deactivate_group_member_feature": false,
  "sw": false,
  "pwa": false
}
/*Legend:
  vault:(server, browser)
  agent:(mobile,  browser)
  system:(iOS, Android, any)
  browser:(Chrome, Firefox, any)
  mode:(autologin,dev-autologin, secure, dev-secure, sso-direct, sso-pin)
  sw:(true, false)
  pwa:(true, false)
  lockFeatures: (true, false)
  disabledFeatures: '01, 02 ...'
    - (01 = Patient leaflet, 02 = Batch date validation checks, 03 = Show leaflet if batch unknown, 04 = Healthcare practitioner info, 05= Video source, 06 = Adverse Events reporting
07 = Anti-counterfeiting functions, 08 = Recall functions, 09 = Batch message)*/
