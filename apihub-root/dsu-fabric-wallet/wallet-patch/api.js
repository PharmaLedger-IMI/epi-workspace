const securityContext = require("opendsu").loadApi("sc");

function mountDSU(path, keySSI, callback) {
    securityContext.getMainDSU((err, mainDSU) => {
        if (err) {
            return callback(err);
        }

        mainDSU.mount(path, keySSI, function (err, res) {
            console.log("mount APIs", err, res);
            callback(err, res)
        });
    })
}

module.exports = {
    mountDSU
}