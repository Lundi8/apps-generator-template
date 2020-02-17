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
      res.message = `update successfully, new data : ${data}`;
    } catch (err) {
      res.success = false;
      res.message = err;
    }
    evt.reply('update-data', res);
  });
};
