const typeOf = obj => {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase();
};

const deepChangeRecusrive = (keys, obj, data) => {
  keys.forEach(key => {
    if (typeOf(obj) === 'object') {
      for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
          if (property === key) {
            keys = keys.slice(1);
            deepChangeRecusrive(keys, obj[property], data);
          }

          if (!keys.length && property === key) {
            obj[property] = data;
          }
        }
      }
    } else if (typeOf(obj) === 'array') {
      for (var i = 0; i < obj.length; i++) {
        key = key * 1;
        if (i === key) {
          keys = keys.slice(1);
          deepChangeRecusrive(keys, obj[i], data);
        }

        if (!keys.length && i === key) {
          obj[i] = data;
        }
      }
    }
  });
  return obj;
};

const deepChange = (keys, obj, data) => {
  for (let i = 0; i < keys.length; i++) {
    if (!isNaN(parseInt(keys[i], 10))) {
      keys[i] = keys[i] * 1;
    }
    if (obj[keys[i]] !== undefined) {
      if (i < keys.length - 1) obj = obj[keys[i]];
      else {
        const type = typeOf(obj[keys[i]]);
        if (type === 'number') obj[keys[i]] = data * 1;
        else obj[keys[i]] = data;
      }
    }
  }
};

module.exports = { typeOf, deepChangeRecusrive, deepChange };
