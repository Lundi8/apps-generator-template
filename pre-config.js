require('dotenv').config();
const fs = require('fs-extra');
const { join } = require('path');
const { execSync } = require('child_process');
const log = require('./public/config/log');
let ID = 'appTest';
const IDS = ['mm01', 'mm02'];
const BUILD_IDS = ['mm01', 'mm02'];
const pr = 'pre-config';
const _setEnv = () => {
  const envPath = join(process.cwd(), '.env');
  const envData = fs.readFileSync(envPath, 'utf8').replace(/(\nREACT_APP_ID\=)(.*)/gm, (cor, p) => {
    return `${p}${ID}`;
  });
  fs.writeFileSync(envPath, envData, 'utf8');

  log({ '.env': `REACT_APP_ID=${ID}` }, pr);
};

const _removeFolders = () => {
  const rootFilePath = join(process.cwd(), 'public');
  IDS.forEach(id => {
    const path = join(rootFilePath, id);
    if (fs.existsSync(path)) {
      fs.removeSync(path);
      log({ 'folder removed': path }, pr);
    }
  });
};

const _setFolder = () => {
  // move app folder from ./data to ./public
  const appFilePath = join(process.cwd(), 'public', ID);
  const remoteFilePath = join(process.cwd(), 'data', ID);
  if (!fs.existsSync(appFilePath)) fs.mkdirSync(appFilePath);
  fs.copySync(remoteFilePath, appFilePath);

  log({ 'folder created': appFilePath }, pr);
};

const _setPackage = () => {
  // modify package.json
  const packagePath = join(process.cwd(), 'package.json');
  const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  packageData.build.productName = ID;
  fs.writeFileSync(packagePath, JSON.stringify(packageData), 'utf8');
  log({ 'package.json': `"productName" = "${ID}"` }, pr);
};

const build = () => {
  log({ start: ID }, pr);
  _setEnv();
  _removeFolders();
  _setFolder();
  _setPackage();
  log({ finish: ID }, pr);
};

if (process.env.PRE_CONFIG_BUILD_ALL === 'true') {
  log({ 'start build all': BUILD_IDS }, pr);

  BUILD_IDS.forEach(id => {
    ID = id;
    build();
    execSync('yarn build');
  });
  log({ 'finish build all': BUILD_IDS }, pr);
} else {
  build();
}
