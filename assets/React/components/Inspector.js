import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Drawer, List, ListItem, ListItemText, Divider, Slider, Typography, Grid, Input, AppBar, Toolbar, IconButton } from "@material-ui/core";
import GitHubIcon from '@material-ui/icons/GitHub';
import SliderGroup from './SliderGroup';



function Inspector(props) {
  // Deconstruct props from Redux store
  const { updatePosition, updateRotation, updateScale, activeObject } = props;
  
  // Create local classes
  const classes = makeStyles((theme) => ({
    listRoot: {
      width: "250px",
      height: "100%"
    },
    sliderGroupRoot: {
      width: '100%',
    },
    input: {
      width: 42,
    },
    appBar: {
      top: 'auto',
      bottom: 0,
      width: '250px'
    },
    footerText: {
      marginRight: '25px',
    }
  }))();

  const { id, position, rotation, url, scale } = activeObject;

  const handleRotXChange = (event, newValue) => {
    updateRotation(activeObject.id, [newValue === undefined ? Number(event.target.value) : newValue, activeObject.rotation[1], activeObject.rotation[2]])
  };

  const handleRotYChange = (event, newValue) => {
    updateRotation(activeObject.id, [activeObject.rotation[0], newValue === undefined ? Number(event.target.value) : newValue, activeObject.rotation[2]])
  };

  const handleRotZChange = (event, newValue) => {
    updateRotation(activeObject.id, [activeObject.rotation[0], activeObject.rotation[1], newValue === undefined ? Number(event.target.value) : newValue])
  };

  const handlePosXChange = (event, newValue) => {
    updatePosition(activeObject.id, [newValue === undefined ? Number(event.target.value) : newValue, activeObject.position[1], activeObject.position[2]])
  };

  const handlePosYChange = (event, newValue) => {
    updatePosition(activeObject.id, [activeObject.position[0], newValue === undefined ? Number(event.target.value) : newValue, activeObject.position[2]])
  };

  const handlePosZChange = (event, newValue) => {
    updatePosition(activeObject.id, [activeObject.position[0], activeObject.position[1], newValue === undefined ? Number(event.target.value) : newValue])
  };

  const handleScaleChange = (event, newValue) => {
    updateScale(activeObject.id, newValue === undefined ? Number(event.target.value) : newValue)
  };
  
  // Render!
  return (
      <Drawer
        variant="permanent"
        BackdropProps={{ invisible: true }}
        anchor={'right'}
        open={true}
      >
        <div className={classes.listRoot}>
          <List component="nav" aria-label="inspector">
            <ListItem>
              <ListItemText primary={id ? id : 'null'} secondary={url} />
            </ListItem>
            <Divider />
            <ListItem>
              <SliderGroup title={"Position"} values={position} handleXChange={handlePosXChange} handleYChange={handlePosYChange} handleZChange={handlePosZChange} />
            </ListItem>
            <Divider />
            <ListItem key={'rotationGroup'}>
              <SliderGroup title={"Rotation"} values={rotation} handleXChange={handleRotXChange} handleYChange={handleRotYChange} handleZChange={handleRotZChange} />
            </ListItem>
            <Divider />
            <ListItem>
              <div className={classes.sliderGroupRoot}>
                <Typography id="values-sliders" gutterBottom>
                  Scale
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Slider
                      valueLabelDisplay="auto"
                      onChange={handleScaleChange}
                      value={scale}
                      min={0.1}
                      step={0.05}
                      max={3}
                      aria-labelledby="non-linear-slider"
                    />
                  </Grid>
                  <Grid item>
                    <Input
                      className={classes.input}
                      margin="dense"
                      onChange={handleScaleChange}
                      value={scale}
                      inputProps={{
                        min:0.1,
                        step: 0.05,
                        max: 3,
                        type: 'number',
                        'aria-labelledby': 'values-sliders',
                      }}
                    />
                  </Grid>
                </Grid>
              </div>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary={'Viewport Interaction'} />
            </ListItem>
            <ListItem>
              <ListItemText secondary={'Drag Object to Rotate'} />
            </ListItem>
            <ListItem>
              <ListItemText secondary={'Shift + Drag Object to Position'} />
            </ListItem>
          </List>
        </div>
        
        <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <div className={classes.listRoot}>
          <List component="nav" aria-label="inspector">
            <ListItem button component="a" target={"_blank"} href="https://github.com/MeterParts/travis-TAP">
              <ListItemText primary={"View source code"} />
              <GitHubIcon />
          </ListItem>
          </List>
          </div>
        </Toolbar>
      </AppBar>
      </Drawer>
  );
}

function isEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps.activeObject.name) === JSON.stringify(nextProps.activeObject.name) &&
  JSON.stringify(prevProps.activeObject.active) === JSON.stringify(nextProps.activeObject.active) &&
  JSON.stringify(prevProps.activeObject.position) === JSON.stringify(nextProps.activeObject.position) &&
  JSON.stringify(prevProps.activeObject.rotation) === JSON.stringify(nextProps.activeObject.rotation) &&
  JSON.stringify(prevProps.activeObject.scale) === JSON.stringify(nextProps.activeObject.scale) &&
  JSON.stringify(prevProps.activeObject.responsiveness) === JSON.stringify(nextProps.activeObject.responsiveness);
}

export default React.memo(Inspector, isEqual);