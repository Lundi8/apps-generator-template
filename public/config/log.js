const color = '\x1b[33m%s\x1b[0m';

module.exports = (obj, pr) => {
  const key = Object.keys(obj)[0];
  const value = Object.values(obj)[0];

  if (pr) return console.log(color, `[${pr}] ${key}`, value);
  return console.log(color, `[electron] ${key}`, value);
};
