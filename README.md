# Apps-generator-template

## Descriptions

Generate multiple electron/react apps. Provide your data in ./data (json, images, etc..) that will be
imported in react.

- Use electron, electron-builder, react, redux, react-router, material-ui, styled jsx, gsap.
- !important! if you don't have a second screen in dev mode, you have to set BrowserWindow.x to 0 in
  ./public/electron.js. Otherwise you should not see the electron-app pop-up

## Basic scripts

- dev : `yarn dev`
- build : `yarn build`
