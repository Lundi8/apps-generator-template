# PWA CRA Boilerplate

- PWA that will be deploy behind url prefix (work every where, in any scenario).
- Made with react, redux, jsx, indexedDB.
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Specifications

- optionnal : change the value in package.json at field "name". The value is similar to the interactive's number-room you working on (ex: "032" is for room 0, device 32 ).
- optionnal : if you have large file to store client-side (> 50m), use MediaDB component (exemple in index.js). You can load data stored anywhere in your app with "mediaDB" object from redux-store.
- required : provide a "thumbnail.png" file at 16:9 ratio in ./public folder.
- required : after building your app, your final build will be zipped in ./deploy folder.

## Available Defaults Scripts from CRA

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
