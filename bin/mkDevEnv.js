const argIdentifier = "--file=";
const errorMessage = `Misuse of script. Syntax node path_to_script ${argIdentifier}'path_to_env_file' `;
const args = process.argv;
args.splice(0, 2);

if(args.length <1){
    console.error(errorMessage);
}

let fileArg = args.shift();

fileArg = fileArg.replace(argIdentifier, "");

let envJson;

let fileArgDevel = fileArg + ".devel";
let fs = require("fs");
fs.writeFile(fileArgDevel, "This file indicates that octopus is using octopus.json and not octopus-dev.json file to install dependencies", function(err){
if(err){
	console.error(err);
   }
});
