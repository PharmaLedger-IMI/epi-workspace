const fileArgDevel = "env.json.devel";
const child_process = require("child_process");
const fs = require("fs");

let ENV = {
    COMMENT: `File (${fileArgDevel}) indicates that Octopus is using octopus.json and not octopus-freeze.json file to install dependencies`,
    DEV: true
};
let args = process.argv.slice(2);

let script = 'npm install';
for (let arg of args) {
    if (arg.indexOf("cmd=") !== -1) {
        script = arg.replace("cmd=", "");
    } else {
        if (arg.indexOf("=") !== -1) {
            let variable = arg.split("=");
            let varName = variable[0].replaceAll("-", "");
            ENV[varName] = variable[1];
        } else {
            console.error(`Unknown argument ${arg}`);
            process.exit(1);
        }
    }
}

fs.writeFile(fileArgDevel, JSON.stringify(ENV, null, 4), function (err) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    child_process.execSync(`${script}`, {stdio: [0, 1, 2]});
});
