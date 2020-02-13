const assetsEnv = process.env.PUBLIC_URL;
const appEnv = process.env.REACT_APP_MHNM_ID;

const assets = () => assetsEnv;
const data = () => `${assetsEnv}/${appEnv}/data.json`;
const imgs = file => `${assetsEnv}/${appEnv}/imgs/${file}`;

export default { assets, data, imgs };
