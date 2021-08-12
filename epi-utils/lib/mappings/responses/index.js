let responses = {};

module.exports = {
  buildResponse: function (version) {
    return new responses[version];
  },
  registerResponseVersion: function (version, buildFunction) {
    responses[version] = buildFunction;
  }
}
module.exports.registerResponseVersion(0.2, require("./response02"))
