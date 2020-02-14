export default str => {
  return `${str}_${Date.now()}${performance
    .now()
    .toString()
    .replace(/\./g, '')}${Math.random()
    .toString()
    .replace(/\./g, '')}`;
};
