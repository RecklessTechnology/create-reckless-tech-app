import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";

import { clearActive, updateActive, updateHover, updatePosition, updateRotation, updateScale } from './actions/objects';

import Scene from './components/Scene';
import Inspector from './components/Inspector';

function App(props) {
  const { clearActive, updateActive, updateHover, updatePosition, updateRotation, updateScale, objects } = props;

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
              updateActive={updateActive}
              updateRotation={updateRotation}
              updatePosition={updatePosition}
              updateHover={updateHover}
              clearActive={clearActive}
              objs={objects}
            />
          </Grid>
      </Grid>
      { (objects.filter((o)=>{ return o.active === true}).length === 0) ? // only show inspector if an object is selected
        null :
        <Inspector
          updatePosition={updatePosition}
          updateRotation={updateRotation}
          updateScale={updateScale}
          clearActive={clearActive}
          activeObject={objects.filter((o)=>{ return o.active === true})[0]}
        />
      }
    </div>
  );
}

const mapStateToProps = state => {
  return ({
    objects: state.objects.objectList,
  })
}

 const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateActive: updateActive,
    updatePosition: updatePosition,
    updateRotation: updateRotation,
    updateScale: updateScale,
    updateHover: updateHover,
    clearActive: clearActive,
  }, dispatch);
}

function isEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps.objects) === JSON.stringify(nextProps.objects);
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(App, isEqual));
