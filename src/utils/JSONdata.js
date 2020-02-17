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
    this.filterByLanguages();
    this.index();

    return this._arr;
  }

  model({ index, path, value }) {
    return { index, path, json_type: typeOf(value), language: this.addLanguage(path), value };
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

  index() {
    this._arr.forEach((item, i) => (item.index = i));
    return this;
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
    this._arr = this._arr.filter(obj => obj.path.match(lg) || obj.path.match(lgList));
    return this;
  }
}

const factory = ({ json = {}, root = '' }) => {
  if (root) return new JSONdata({ json, root });
  return new JSONdata({ json });
};

export default factory;
