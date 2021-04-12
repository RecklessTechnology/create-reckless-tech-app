import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";

import { clearMenuActive, updateMenuActive } from './actions/rt_menu';

import Scene from './components/Scene';
import RTMenu from './components/RTMenu';

function App(props) {
  const { clearMenuActive, isMenuActive } = props;

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
    },
    button: {
      position: 'absolute',
    }
  }))();
  
  // Render!
  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={0} className={classes.grid}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.item} >
            <Scene
              clearMenuActive={clearMenuActive}
            />
          </Grid>
      </Grid>
      <RTMenu
        isMenuActive={isMenuActive}
        clearMenuActive={clearMenuActive}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return ({
    isMenuActive: state.rt_menu.active,
  })
}

 const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateMenuActive: updateMenuActive,
    clearMenuActive: clearMenuActive,
  }, dispatch);
}

function isEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps.isMenuActive) === JSON.stringify(nextProps.isMenuActive);
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(App, isEqual));
