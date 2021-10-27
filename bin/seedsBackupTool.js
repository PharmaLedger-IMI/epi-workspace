let op = process.argv[2];
if(op  == undefined){
    op = "backup";
}

let os = require("os");
let slash = "/";

if(os.platform() == "win32"){
    slash = "\\";
}

myPath = process.cwd() + slash;

console.log("Doing...", op, myPath);


let fs = require('fs');
let path = require('path');

function  walk(dir, filterFiles, filterFolders, done) {
    let results = [];

    let recWalk = function(dir, filterFiles, filterFolders, done) {
        fs.readdir(dir, function(err, list) {
            if (err) return done(err, result);
            let i = 0;
            (function next() {
                let file = list[i++];
                if (!file) return done(null, results);
                file = path.resolve(dir, file);
                fs.stat(file, function(err, stat) {
                    if (stat && stat.isDirectory()) {
                        if(filterFolders(file)) {
                            results.push(file);
                        }
                        recWalk(file, filterFiles, filterFolders,function(err, res) {
                            next();
                        });
                    } else {
                        if(filterFiles(file)) {
                            results.push(file);
                        }
                        next();
                    }
                });
            })();
        });
    };

    recWalk(dir, filterFiles, filterFolders, done);
}


let seedList = {

}


function filterFiles(name){
    if(name.endsWith("\\seed") || name.endsWith("/seed")){
        let relPath = name.replace(myPath,"");
        console.log(name, myPath);
        seedList[relPath] = fs.readFileSync(name).toString();
        }
    return undefined;
}


function filterFolders(name){
    if(name){

    }
    return undefined;
}

if(op == "backup"){
    walk(myPath, filterFiles, filterFolders, function(err, result){
        result.map( name => {
            console.log("Folder:", name);

        })
        console.log("Storing seeds:", seedList);
        fs.writeFileSync("./apihub-root/seedsBackup", JSON.stringify(seedList));
    });
} else {
    try{
        let seedList = fs.readFileSync("./apihub-root/seedsBackup");
        let list = JSON.parse(seedList);
        for(let f in list){
            try{
                fs.writeFileSync(f, list[f]);
            }catch(error){
                console.log("Not able to write file", f, "skipping");
            }
        }
    } catch(err){
        console.log("Caught an error while trying to read the backup file. ", err);
        console.log("File ./apihub-root/seedsBackup does not exist, hopefully you are doing an initial build by generating fresh seeds");
    }
}