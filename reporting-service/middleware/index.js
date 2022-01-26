
function Init(server){
    require('./acdc-middleware')(server);
}

module.exports = {
    Init
}