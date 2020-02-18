const fs = require('fs-extra');
const { join } = require('path');
const { app } = require('electron');
const { deepChange } = require('./utils');

const _stringify = data => JSON.stringify(data);
const _parse = data => JSON.parse(data);
const _getAppPath = appId => join(app.getAppPath(), 'public', appId, `data.json`);
const _getRemotePath = () => join(app.getPath('userData'), `data.json`);
const _getAppData = async appId => _parse(await fs.readFile(_getAppPath(appId), 'utf8'));
const _getRemoteData = async () => _parse(await fs.readFile(_getRemotePath(), 'utf8'));
const _setRemoteData = async data => {
  const oldData = await _getRemoteData();
  await fs.writeFile(_getRemotePath(), _stringify(Object.assign(oldData, data)), 'utf8');
};

module.exports.init = async appId => {
  const appData = await _getAppData(appId);
  const remotePath = _getRemotePath();

  if (!fs.existsSync(remotePath)) await fs.writeFile(remotePath, _stringify(appData), 'utf8');
  // if (isDev) {
  try {
    await _setRemoteData(appData);
  } catch (err) {
    console.error(err);
  }
  // }
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
  try {
    await _setRemoteData(remoteData);
    return { path, data };
  } catch (err) {
    return err;
  }
};
