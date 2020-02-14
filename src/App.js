import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setEditMode, setId, setLanguages, setPages, setGlobal } from './redux';
import Editor from './pages/Editor';

const AppID = React.lazy(() => import(`./apps/${process.env.REACT_APP_ID}`));
// import AppID from './apps/mm01';

if (process.env.NODE_ENV !== 'production') console.log(process.env);

const App = ({ editor, setEditMode, setId, setLanguages, setPages, setGlobal }) => {
  /**
   * DATA
   * grab data from electron
   */
  const [init, setInit] = useState(false);

  useEffect(() => {
    const ipcListener = (evt, data) => {
      setLanguages(data.languages);
      setPages(data.pages);
      setGlobal(data.global);
      setId(data.id);
      setInit(true);
    };
    window.ipcRenderer.on('data', ipcListener);
    return () => window.ipcRenderer.removeListener('data', ipcListener);
  });

  useEffect(() => {
    const reInit = () => {
      if (!init) window.ipcRenderer.send('data');
    };
    const fireInit = setTimeout(reInit, 2000);
    return () => clearTimeout(fireInit);
  });

  /**
   * EDITOR
   * activate edit mode or go to editor
   */
  const history = useHistory();

  useEffect(() => {
    const ipcListener = () => {
      if (!history.location.pathname.match(/editor$/)) history.push('/editor');
      else history.push('/');
    };

    window.ipcRenderer.on('editor', ipcListener);
    return () => window.ipcRenderer.removeListener('editor', ipcListener);
  }, [history]);

  useEffect(() => {
    const ipcListener = () => setEditMode(!editor);
    window.ipcRenderer.on('edit-mode', ipcListener);
    return () => window.ipcRenderer.removeListener('edit-mode', ipcListener);
  }, [editor, setEditMode]);

  return (
    <Switch>
      <React.Suspense fallback={<div>Loading app "{process.env.REACT_APP_ID}"...</div>}>
        <React.Fragment>
          <AppID />
          <Route exact path='/editor' component={Editor} />
        </React.Fragment>
      </React.Suspense>
    </Switch>
  );
};

const mapSTP = ({ editor }) => {
  return { editor };
};
export default connect(mapSTP, { setEditMode, setId, setLanguages, setPages, setGlobal })(App);
