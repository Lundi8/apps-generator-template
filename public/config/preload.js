const { join } = require('path');
const { writeFile } = require('fs-extra');
const { app } = require('electron');

module.exports.init = async () => {
  await writeFile(
    join(app.getPath('userData'), 'preload.js'),
    "const { ipcRenderer } = require('electron');window.ipcRenderer = ipcRenderer;",
    'utf8',
  );
};

module.exports.load = () => {
  return join(app.getPath('userData'), 'preload.js');
};
