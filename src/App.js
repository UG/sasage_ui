import React from 'react';
import Detail from './ui/Detail.jsx'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
  main: {
    width: 800
  },
}));
function App() {
  const classes = useStyles();
  return (
    <Detail className={classes.main} />
  );
}
export default App;
