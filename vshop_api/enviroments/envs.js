const localEnv = require('./local');
const prodEnv = require('./prod');

const envObjs = [
  {
    name: 'local',
    env: localEnv
  },
  {
    name: 'prod',
    env: prodEnv
  }
];

let selectedEnv = envObjs[0];

exports.getEnvs = function () {
    return envObjs;
}

exports.setSelEnv = function (env) {
    
    selectedEnv = env;
}

exports.getSelEnv = function () {
    return selectedEnv;
}
