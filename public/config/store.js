const fs = require('fs-extra');
const { join } = require('path');
const { app } = require('electron');
const { deepChange, deepChange2 } = require('./utils');
const appName = process.env.REACT_APP_ID;

const _stringify = data => JSON.stringify(data);
const _parse = data => JSON.parse(data);
const _getAppPath = () => join(app.getAppPath(), 'public', appName, `data.json`);
const _getRemotePath = () => join(app.getPath('userData'), `data.json`);
const _getAppData = async () => _parse(await fs.readFile(_getAppPath(), 'utf8'));
const _getRemoteData = async () => _parse(await fs.readFile(_getRemotePath(), 'utf8'));
const _setRemoteData = async data => {
  const oldData = await _getRemoteData();
  await fs.writeFile(_getRemotePath(), _stringify(Object.assign(oldData, data)), 'utf8');
};

module.exports.init = async () => {
  const appData = await _getAppData();
  const remotePath = _getRemotePath();

  if (!fs.existsSync(remotePath)) await fs.writeFile(remotePath, _stringify(appData), 'utf8');
  try {
    await _setRemoteData(appData);
  } catch (err) {
    console.error(err);
  }
  return;
};

module.exports.data = async () => {
  try {
    return await _getRemoteData();
  } catch (err) {
    console.error(err);
  }
};

module.exports.replace = async ({ path, data }) => {
  const keys = path.split('/').slice(1);
  let remoteData = await _getRemoteData();
  deepChange(keys, remoteData, data);
  await _setRemoteData(remoteData);
};
