const fs = require('fs-extra');
const { join } = require('path');
const { app } = require('electron');
const appName = process.env.REACT_APP_ID;

const _stringify = data => JSON.stringify(data);
const _parse = data => JSON.parse(data);
const _getAppPath = () => join(app.getAppPath(), 'public', appName, `data.json`);
const _getRemotePath = () => join(app.getPath('userData'), `data.json`);
const _getAppData = async () => _parse(await fs.readFile(_getAppPath(), 'utf8'));
const _getRemoteData = async () => _parse(await fs.readFile(_getRemotePath(), 'utf8'));
const _setRemoteData = async data => {
  const oldData = await _getRemoteData();
  await fs.writeFile(_getRemotePath(), _stringify({ ...oldData, ...data }), 'utf8');
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
  let remoteData = await _getRemoteData();
  let keys = path.split('/');
  for (let i = 0; i < keys.length; i++) {
    if (!isNaN(parseInt(keys[i], 10))) {
      keys[i] = keys[i] * 1;
    }
    if (remoteData[keys[i]] !== undefined) {
      if (i < keys.length - 1) remoteData = remoteData[keys[i]];
      else remoteData[keys[i]] = data;
    }
  }
  console.log({ path, data }, remoteData);
  await _setRemoteData(remoteData);
};
