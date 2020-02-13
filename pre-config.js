require('dotenv').config();
const fs = require('fs-extra');
const { join } = require('path');
const log = require('./public/config/log');

const APPIDS = ['mm01', 'mm02'];
const ID = process.env.REACT_APP_MHNM_ID;
const rootFilePath = join(process.cwd(), 'public');
const appFilePath = join(process.cwd(), 'public', ID);
const remoteFilePath = join(process.cwd(), 'data', ID);

log({ pre: 'start' });
log({ NODE_ENV: process.env.NODE_ENV });

APPIDS.forEach(app => {
  const path = join(rootFilePath, app);
  if (fs.existsSync(path)) fs.removeSync(path);
});

if (!fs.existsSync(appFilePath)) fs.mkdirSync(appFilePath);
fs.copySync(remoteFilePath, appFilePath);

log({ pre: 'done' });
