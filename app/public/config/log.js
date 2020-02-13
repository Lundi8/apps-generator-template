module.exports = obj =>
  console.log('\x1b[33m%s\x1b[0m', `[electron] ${Object.keys(obj)[0]}`, Object.values(obj)[0]);
