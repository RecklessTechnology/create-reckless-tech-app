import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Slider, Typography, Grid, Input } from "@material-ui/core";



function SliderGroup(props) {
  // Deconstruct props from Redux store
  const { title, values, handleXChange, handleYChange, handleZChange } = props;
  
  // Create local classes
  const classes = makeStyles((theme) => ({
    sliderGroupRoot: {
      width: '100%',
    },
    input: {
      width: 42,
    },
  }))();
  
  // Render!
  return (
    <div className={classes.sliderGroupRoot}>
      <Typography id="values-sliders" gutterBottom>
        { title }
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          X:
        </Grid>
        <Grid item xs>
          <Slider
            valueLabelDisplay="auto"
            onChange={handleXChange}
            value={values[0]}
            min={-Math.PI / 2}
            step={0.1}
            max={Math.PI / 2}
            aria-labelledby="non-linear-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            margin="dense"
            onChange={handleXChange}
            value={values[0]}
            inputProps={{
              min:-Math.PI / 2,
              step: 0.1,
              max: Math.PI / 2,
              type: 'number',
              'aria-labelledby': 'values-sliders',
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          Y:
        </Grid>
        <Grid item xs>
          <Slider
            valueLabelDisplay="auto"
            onChange={handleYChange}
            value={values[1]}
            min={-Math.PI / 2}
            step={0.1}
            max={Math.PI / 2}
            aria-labelledby="non-linear-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            margin="dense"
            onChange={handleYChange}
            value={values[1]}
            inputProps={{
              min:-Math.PI / 2,
              step: 0.1,
              max: Math.PI / 2,
              type: 'number',
              'aria-labelledby': 'values-sliders',
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          Z:
        </Grid>
        <Grid item xs>
          <Slider
            valueLabelDisplay="auto"
            onChange={handleZChange}
            value={values[2]}
            min={-Math.PI / 2}
            step={0.1}
            max={Math.PI / 2}
            aria-labelledby="non-linear-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            margin="dense"
            onChange={handleZChange}
            value={values[2]}
            inputProps={{
              min:-Math.PI / 2,
              step: 0.1,
              max: Math.PI / 2,
              type: 'number',
              'aria-labelledby': 'values-sliders',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default SliderGroup;