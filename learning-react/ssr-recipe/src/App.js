import React from 'react';
import {Route} from 'react-router-dom';
import Menu from './components/Menu';
import RedPage from './pages/RedPage';
import BluePage from './pages/BluePage';

const App = () => {
  return (
    <div>
      <Menu/>
      <hr/>
      <Route path="/red" component={RedPage}></Route>
      <Route path="/blue" component={BluePage}></Route>
    </div>
  );
};

export default App;