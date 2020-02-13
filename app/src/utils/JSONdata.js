const KEYS = ['languages', 'pages', 'global', 'id'];

const checkKeys = data => {
  const keys = Object.keys(data);
  KEYS.forEach(key => {
    if (!keys.includes(key)) throw new Error(`wrong json data at key ${key}`);
  });
};

export default { KEYS, checkKeys };
