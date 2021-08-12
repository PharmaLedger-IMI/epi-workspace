const MAX_GROUP_SIZE = 10;
const GROUPING_TIMEOUT = 5 * 1000; //5 seconds
const fs = require('fs');

function getEPIMappingEngineMessageResults(server) {
  const epiUtils = require("epi-utils");
  const mappings = epiUtils.loadApi("mappings")
  const apiHub = require("apihub");

  function getLogs(msgParam, domain, callback) {

    let result;
    const fileDir = `${server.rootFolder}/messages/${domain}`
    try {

  /*    if (msgParam === "all") {
        let result = fs.readdirSync(`${fileDir}`).map((elem) => {
          return JSON.parse(fs.readFileSync(`${fileDir}/${elem}`, 'utf8'));
        })

        return callback(null, result)
      }
*/
      result = JSON.parse(fs.readFileSync(`${fileDir}/logs.json`, 'utf8'));
      return callback(null, result);
    } catch (e) {
      return callback(e);
    }

  }

  server.put("/mappingEngine/:domain/:subdomain/saveResult", function (request, response) {
    let msgDomain = request.params.domain;
    let data = [];
    request.on('data', (chunk) => {
      data.push(chunk);
    });

    request.on('end', async () => {

      try {
        let body = Buffer.concat(data).toString();
        let msgToPersist = JSON.parse(body);
        const fileDir = `${server.rootFolder}/messages/${msgDomain}`
        if (!fs.existsSync(fileDir)) {
          fs.mkdirSync(fileDir, {recursive: true});
        }
        // append json to file
        let arr = [msgToPersist];
        fs.readFile(`${fileDir}/logs.json`, (err, data) => {
          if (!err && data) {
            let jsonData = JSON.parse(data);
            arr = [...arr, ...jsonData]
          }
          fs.writeFile(`${fileDir}/logs.json`, JSON.stringify(arr), (err) => {
            if (err) {
              throw err;
            }
            response.statusCode = 200
            response.end();
          });
        })

      } catch (e) {
        response.statusCode = 500;
        response.end();
      }
    });
  })

  server.get("/mappingEngine/:domain/logs", function (request, response) {

    let domainName = request.params.domain;
    let msgParam = request.params.messageParam;
    console.log(`EPI Mapping Engine get called for domain:  ${domainName}`);

    try {
      getLogs(msgParam, domainName, (err, logs) => {
        if (err) {
          console.log(err);
          response.statusCode = 500;
          response.end(JSON.stringify({result: "Error", message: "No logs"}));
        }
        if (!logs || logs.length === 0) {
          logs = "Log list is empty";
        }
        response.statusCode = 200;
        response.end(JSON.stringify(logs));
      });

    } catch (err) {
      console.error(err);
      response.statusCode = 500;
      response.end(JSON.stringify({result: "Error", error: err}));
    }


  });
}

module.exports.getEPIMappingEngineMessageResults = getEPIMappingEngineMessageResults;
