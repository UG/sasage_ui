import React from 'react';
import Detail from './ui/Detail.jsx';
import ListView from './ui/ListView.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => (
  <Router>
    <Switch>
      <Route exact path='/'>
        <ListView />
      </Route>
      <Route path="/Detail/:id" children={<Detail />} />
    </Switch>
  </Router>
);
export default App;