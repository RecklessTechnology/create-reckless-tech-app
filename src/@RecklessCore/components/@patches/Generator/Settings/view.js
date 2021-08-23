/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  ListItem, Grid,
  Typography, Tooltip, TextField,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import PropAccordianView from '../../shared/PropAccordian/view';

const useStyles = makeStyles(() => ({
  propText: {
    fontSize: '12px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
  propItem: {
    margin: 0,
    padding: 0,
    oveflow: 'hidden',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  propGrid: {
    width: '100%',
    height: '100%',
  },
  handleGridLeft: {
    padding: 0,
    paddingLeft: 9,
    paddingTop: 15,
  },
  handleGridRight: {
    padding: 0,
    paddingRight: 9,
    paddingTop: 15,
  },
  expandIcon: {
    padding: 0,
  },
}));

// eslint-disable-next-line no-unused-vars
const GeneratorSettingsView = ({
  rpm, setRPM,
}) => {
  const classes = useStyles();
  return (
    <ListItem dense className={classes.propItem}>
      <Grid spacing={0} container className={classes.propGrid}>
        <Grid item xs={1} className={classes.handleGridLeft} />
        <Grid item xs={10}>
          <PropAccordianView
            defaultOpen
            header={<Typography className={classes.propText}>Speed (RPMs)</Typography>}
            expandIcon={(
              <ExpandMoreIcon fontSize="small" />
            )}
          >
            <Tooltip title={`${rpm} rpm (${(rpm / 60).toFixed(3)}/s)`} aria-label={`${rpm} rpm`}>
              <TextField
                id="rpm"
                type="Number"
                value={rpm}
                onChange={(evt) => {
                  setRPM(evt.currentTarget.value);
                }}
              />
            </Tooltip>
          </PropAccordianView>
        </Grid>
        <Grid item xs={1} className={classes.handleGridRight} />
      </Grid>
    </ListItem>
  );
};

export default memo(GeneratorSettingsView);
