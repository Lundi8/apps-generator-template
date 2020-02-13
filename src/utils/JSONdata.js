const KEYS = ['languages', 'pages', 'global', 'id'];
const LANGUAGES = ['fr', 'en', 'es'];

const typeOf = function(obj) {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase();
};

const checkKeys = data => {
  const keys = Object.keys(data);
  KEYS.forEach(key => {
    if (!keys.includes(key)) throw new Error(`wrong json data at key ${key}`);
  });
};

function find(data, route) {
  let properties = route.split('/');
  let currentObj = data;
  for (let i = 0; i < properties.length; i++) {
    if (!isNaN(parseInt(properties[i], 10))) {
      properties[i] = properties[i] * 1;
    }
    if (currentObj[properties[i]] !== undefined) {
      currentObj = currentObj[properties[i]];
    }
  }

  let key = {
    name: properties[properties.length - 1],
    type: typeOf(currentObj),
  };
  return {
    data: currentObj,
    disabled: false,
    disabledEdit: true,
    visible: true,
    key,
    keys: properties,
    route,
  };
}
const byLanguages = (arr = []) => {
  if (!arr[0]) return [];
  return arr.filter(obj => obj.path.match(/\/(fr|en|es)$/) || obj.path.match(/\/(fr|en|es)\/[0-9]$/));
};

const flatten = (root, obj) => {
  let reducer = [];
  const reduce = (val, route = '') => {
    if (typeOf(val) === 'object') {
      Object.keys(val).forEach(key => reduce(val[key], `${route}/${key}`));
    } else if (typeOf(val) === 'array') {
      val.forEach((item, i) => reduce(item, `${route}/${i}`));
    } else {
      reducer.push({ path: route, value: val });
    }
  };
  reduce(obj, root);

  reducer = reducer.sort();
  return reducer;
};

export default { KEYS, checkKeys, flatten, byLanguages };
