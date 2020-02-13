const { ipcMain } = require('electron');
const store = require('./store');

module.exports.init = () => {
  ipcMain.on('data', async (evt, args) => {
    const data = await store();
    evt.reply('data', data);
  });
  ipcMain.on('update-data', async (evt, { path, data }) => {
    const data = await store(path, data);
    evt.reply('data', data);
  });
};
