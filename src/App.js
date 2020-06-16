import React from 'react';
import Detail from './ui/Detail.jsx';
import ListView from './ui/ListView.jsx';
import { makeStyles } from '@material-ui/core/styles'
import { BrowserRouter, Route } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  main: {
    maxWidth: 1024
  },
}));
const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path='/' component={ListView} />
      <Route path="/Detail/:id" component={Detail} />
    </div>
  </BrowserRouter>
);
export default App