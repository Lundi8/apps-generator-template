const { remote } = require('electron');

module.exports.reduxDevTools = autoReload => {
  if (!remote) {
    throw new Error('Redux DevTools can only be installed from an renderer process.');
  }

  const extensions = remote.BrowserWindow.getDevToolsExtensions();
  if (extensions && extensions['Redux DevTools']) return;

  const path = remote.BrowserWindow.addDevToolsExtension(`${__dirname}/build`);
  console.log(`Installing Redux DevTools from ${__dirname}/build`);

  if (autoReload === true) remote.getCurrentWindow().reload();

  return path;
};
