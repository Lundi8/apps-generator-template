const isDev = require('./isDev');
const menu = require('./menu');
const log = require('./log');
const store = require('./store');
const ipc = require('./ipc');
const preload = require('./preload');

module.exports = {
  isDev,
  menu,
  log,
  store,
  ipc,
  preload,
};
