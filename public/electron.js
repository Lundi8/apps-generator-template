require('dotenv').config();
const { app, BrowserWindow } = require('electron');
const { join } = require('path');
const isDev = require('./config/isDev');
const menu = require('./config/menu');
const log = require('./config/log');
const store = require('./config/store');
const ipc = require('./config/ipc');
const preload = require('./config/preload');

if (require('electron-squirrel-startup')) app.quit();

let mainWindow;
const createWindow = async () => {
  await preload.init();
  menu.init(isDev);
  ipc.init();

  mainWindow = new BrowserWindow({
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

  if (isDev) mainWindow.webContents.openDevTools();

  await mainWindow.loadURL(
    isDev ? 'http://localhost:3001' : `file://${join(__dirname, '../build/index.html')}`,
  );

  const data = await store.data();
  mainWindow.webContents.send('data', data);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.allowRendererProcessReuse = true;
app.on('ready', createWindow);
app.on('error', err => console.error(err));
app.on('window-all-closed', () => app.quit());
app.on('will-quit', () => app.exit(0));
app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

log({ appName: process.env.REACT_APP_ID });
log({ 'app.getAppPath()': app.getAppPath() });
log({ 'app.getPath(appData)': app.getPath('appData') });
log({ 'app.getPath(userData)': app.getPath('userData') });
