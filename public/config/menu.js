const { Menu, shell, BrowserWindow } = require('electron');
const store = require('./store');
const isDev = require('./isDev');
const preload = require('./preload');

const template = [
  {
    label: '&File',
    submenu: [
      {
        label: '&Open',
        accelerator: 'Ctrl+O',
      },
      {
        label: '&Close',
        accelerator: 'Ctrl+W',
        click: (itm, win) => {
          win.close();
        },
      },
    ],
  },
  {
    label: '&View',
    submenu: [
      {
        label: '&Reload',
        accelerator: 'Ctrl+R',
        click: async (itm, win) => {
          await win.webContents.reload();
          const data = await store.data();
          win.webContents.send('data', data);
        },
      },
      {
        label: '&Restart',
        accelerator: 'F5',
        click: async (itm, win) => {
          await win.loadURL(
            isDev ? 'http://localhost:3001' : `file://${join(__dirname, '../build/index.html')}`,
          );
          const data = await store.data();
          win.webContents.send('data', data);
        },
      },
      {
        label: 'Toggle &Developer Tools',
        accelerator: 'Alt+Ctrl+I',
        click: (itm, win) => {
          win.toggleDevTools();
        },
      },
      {
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click: (itm, win) => {
          win.setFullScreen(!win.isFullScreen());
        },
      },
      {
        label: 'Switch Edit Mode',
        accelerator: 'F2',

        click: (itm, win) => {
          win.webContents.send('edit-mode');
        },
      },
      {
        label: 'Switch Editor',
        accelerator: 'F3',
        click: (itm, win) => {
          win.webContents.send('editor');
        },
      },
    ],
  },
  {
    label: 'About',
    click() {
      let win = new BrowserWindow({
        width: 500,
        height: 300,
        frame: false,
        center: true,
        webPreferences: {
          nodeIntegration: false,
          preload: preload.load(),
        },
      });

      win.loadURL(
        isDev ? 'http://localhost:3001/about.html' : `file://${join(__dirname, '../build/about.html')}`,
      );
    },
  },
];

module.exports.init = () => {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
