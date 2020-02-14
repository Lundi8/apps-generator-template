import { typeOf } from './method';

const LANGUAGES = ['fr', 'en', 'es'];
const lg = new RegExp(`\\/(${LANGUAGES.join('|')})$`);
const lgList = new RegExp(`\\/(${LANGUAGES.join('|')})\\/[0-9]$`);

class JSONdata {
  constructor({ json = {}, root = '' }) {
    this._json = json;
    this._arr = [];
    this._root = root;
  }
  root(root) {
    this._root = root;
  }

  json(json) {
    this._json = json;
  }

  get list() {
    return this._arr;
  }

  get toEditor() {
    this.flatten();
    // this.filterByLanguages();
    return this._arr;
  }

  model({ index, path, value }) {
    return { index, path, value, type: typeOf(value), language: this.addLanguage(path) };
  }

  check() {
    if (typeOf(this._arr) !== 'array') throw new Error('data malformed');
  }

  addLanguage(path) {
    if (path.match(/\/fr$/) || path.match(/\/fr\/[0-9]$/)) {
      return 'fr';
    } else if (path.match(/\/en$/) || path.match(/\/en\/[0-9]$/)) {
      return 'en';
    } else if (path.match(/\/es$/) || path.match(/\/es\/[0-9]$/)) {
      return 'es';
    } else {
      return '';
    }
  }

  flatten() {
    const reduce = (val, route = '') => {
      if (typeOf(val) === 'object') {
        Object.keys(val).forEach(key => reduce(val[key], `${route}/${key}`));
      } else if (typeOf(val) === 'array') {
        val.forEach((item, i) => reduce(item, `${route}/${i}`));
      } else {
        this._arr.push(this.model({ index: this._arr.length, path: route, value: val }));
      }
    };
    reduce(this._json, this._root);
    return this;
  }

  filterByLanguages() {
    this._arr.filter(obj => obj.path.match(lg) || obj.path.match(lgList));
    return this;
  }
}

const factory = ({ json = {}, root = '' }) => {
  if (root) return new JSONdata({ json, root });
  return new JSONdata({ json });
};

export default factory;

// const lg = new RegExp(`${reg}$`);
// const lglist = new RegExp(`${reg}\\/[0-9]$`);
// return arr.filter(obj => obj.path.match(/\/(fr|en|es)$/) || obj.path.match(/\/(fr|en|es)\/[0-9]$/));

// function find(data, route) {
//   let properties = route.split('/');
//   let currentObj = data;
//   for (let i = 0; i < properties.length; i++) {
//     if (!isNaN(parseInt(properties[i], 10))) {
//       properties[i] = properties[i] * 1;
//     }
//     if (currentObj[properties[i]] !== undefined) {
//       currentObj = currentObj[properties[i]];
//     }
//   }

//   let key = {
//     name: properties[properties.length - 1],
//     type: typeOf(currentObj),
//   };
//   return {
//     data: currentObj,
//     disabled: false,
//     disabledEdit: true,
//     visible: true,
//     key,
//     keys: properties,
//     route,
//   };
// }
