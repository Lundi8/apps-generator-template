const fs = require('fs-extra');
const { join } = require('path');
const { app } = require('electron');
const appName = process.env.REACT_APP_ID;

const _stringify = data => JSON.stringify(data);
const _parse = data => JSON.parse(data);
const _getAppPath = () => join(app.getAppPath(), 'public', appName, `data.json`);
const _getRemotePath = () => join(app.getPath('userData'), `data.json`);
const _getAppData = async () => _parse(await fs.readFile(_getAppPath(appName), 'utf8'));
const _getRemoteData = async () => _parse(await fs.readFile(_getRemotePath(appName), 'utf8'));

(async () => {
  const appData = await _getAppData(appName);
  const remotePath = _getRemotePath(appName);

  if (!fs.existsSync(remotePath)) await fs.writeFile(remotePath, _stringify(appData), 'utf8');

  const remoteData = await _getRemoteData(appName);
  await fs.writeFile(remotePath, _stringify({ ...remoteData, ...appData }), 'utf8');
  return;
})();

module.exports.data = async () => {
  try {
    // return await fs.readFile(_getRemotePath(appName), 'utf8');
    return await _getRemoteData();
  } catch (err) {
    console.error(err);
  }
};
