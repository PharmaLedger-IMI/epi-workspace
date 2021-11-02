export default {
    "oauthEnabled": false,
    "issuer": {
        "issuer": "http://localhost:8000/auth/realms/sso",
        "authorizationEndpoint": "http://localhost:8000/auth/realms/sso/protocol/openid-connect/auth",
        "tokenEndpoint": "http://localhost:8000/auth/realms/sso/protocol/openid-connect/token"
    },
    "client": {
        "clientId": "demo",
        "scope": "email",
        "redirectPath": "/#something"
    }
}