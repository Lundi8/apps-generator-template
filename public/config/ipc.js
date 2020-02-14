const { ipcMain } = require('electron');
const store = require('./store');

module.exports.init = () => {
  ipcMain.on('data', async (evt, args) => {
    const data = await store.data();
    evt.reply('data', data);
  });

  ipcMain.on('update-data', async (evt, { path, data }) => {
    let res = {};
    try {
      await store.replace({ path, data });
      res.success = true;
    } catch (err) {
      res.success = false;
      res.error = err;
    }
    evt.reply('update-data', res);
  });
};
