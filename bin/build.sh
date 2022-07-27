killall -9 node
export ENABLE_SSO=false
npm run server &
node ./node_modules/octopus/scripts/setEnv --file=../../../env.json
node ./bin/octopusRun.js build
killall -9 node
export ENABLE_SSO=true
npm run server