require('dotenv').config();
const { app, BrowserWindow } = require('electron');
const { join } = require('path');
const { isDev, menu, log, store, ipc, preload } = require('./config');

if (require('electron-squirrel-startup')) app.quit();

let window;
const createWindow = async () => {
  await preload.init();
  await store.init();
  menu.init(isDev);
  ipc.init();

  window = new BrowserWindow({
    x: isDev ? 1920 : 0,
    y: 0,
    maximizable: true,
    minimizable: isDev,
    closable: isDev,
    autoHideMenuBar: !isDev,
    fullscreen: true,
    icon: join(app.getAppPath(), 'public', 'favicon.ico'),
    webPreferences: {
      nodeIntegration: false,
      preload: preload.load(),
    },
  });

  if (isDev) window.webContents.openDevTools();

  await window.loadURL(
    isDev ? 'http://localhost:3001' : `file://${join(__dirname, '../build/index.html')}`,
  );

  const data = await store.data();
  window.webContents.send('data', data);

  window.on('closed', () => {
    window = null;
  });
};

app.allowRendererProcessReuse = true;
app.on('ready', createWindow);
app.on('error', err => console.error(err));
app.on('window-all-closed', () => app.quit());
app.on('will-quit', () => app.exit(0));
app.on('activate', () => {
  if (window === null) createWindow();
});

log({ appName: process.env.REACT_APP_ID });
log({ 'app.getAppPath()': app.getAppPath() });
log({ 'app.getPath(appData)': app.getPath('appData') });
log({ 'app.getPath(userData)': app.getPath('userData') });
