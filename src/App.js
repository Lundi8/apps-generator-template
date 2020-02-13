import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { setEditMode, setId, setLanguages, setPages, setGlobal } from './redux';
import { JSONdata } from './utils';
import CMS from './pages/CMS';
const MhnmApp = React.lazy(() => import(`./apps/${process.env.REACT_APP_MHNM_ID}`));

console.log(process.env);

const App = ({ setEditMode, setId, setLanguages, setPages, setGlobal }) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    window.ipcRenderer.on('data', (evt, data) => {
      JSONdata.checkKeys(data);
      setLanguages(data.languages);
      setPages(data.pages);
      setGlobal(data.global);
      setId(data.id);
      setInit(true);
    });
  });

  useEffect(() => {
    const reInit = () => {
      if (!init) window.ipcRenderer.send('data');
    };
    const fireInit = setTimeout(reInit, 2000);
    return () => clearTimeout(fireInit);
  });

  useEffect(() => {
    window.ipcRenderer.on('edit mode', () => {
      setEditMode('edit mode');
    });
  });

  useEffect(() => {
    window.ipcRenderer.on('editor mode', () => {
      setEditMode('editor mode');
    });
  });

  return (
    <Switch>
      <React.Suspense fallback={<div>Loading app "{process.env.REACT_APP_MHNM_ID}"...</div>}>
        <MhnmApp />
      </React.Suspense>
      <Route exact path='/cms' component={CMS} />
    </Switch>
  );
};

const mS2P = state => {
  console.log(state);
  const { editor } = state;
  return { editor };
};
export default connect(null, { setEditMode, setId, setLanguages, setPages, setGlobal })(App);
