import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";

import Scene from './components/Scene';
import RTMenu from './components/RTMenu';

function App(props) {
  // Local classes
  const classes = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexFlow: "column",
      height: "100vh"
    },
    grid: {
      width: '100%',
      height: '100%',
    },
    item: {
      width: '100%',
      height: '100%',
    }
  }))();
  
  // Render!
  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={0} className={classes.grid}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.item} >
            <Scene />
          </Grid>
      </Grid>
      <RTMenu />
    </div>
  );
}

const mapStateToProps = state => {
  return ({
  })
}

 const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch);
}

function isEqual(prevProps, nextProps) {
  return true;
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(App, isEqual));
