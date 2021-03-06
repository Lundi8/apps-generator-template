export const typeOf = obj => {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase();
};

// export const htmlTypeOf = val => {
//   switch (typeOf(val)) {
//     case 'number':
//       return 'number';
//     case 'string':
//       return 'text';
//     case 'boolean':
//       return 'text';
//   }
// };

export const keygen = str => {
  return `${str}_${Date.now()}${performance
    .now()
    .toString()
    .replace(/\./g, '')}${Math.random()
    .toString()
    .replace(/\./g, '')}`;
};

export default { typeOf, keygen };
