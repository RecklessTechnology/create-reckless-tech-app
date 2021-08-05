/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Grid, ListItem, Typography } from '@material-ui/core';

import PatchDetails from '../shared/PatchDetails/index';
import PatchValue from './PatchValue/index';
import ShapePreview from './ShapePreview/index';
import PatchToolbar from './PatchToolbar/index';
import PatchRoot from '../shared/PatchRoot';
import OutputHandle from '../shared/OutputHandle';

const useStyles = makeStyles(() => ({
  propItem: {
    margin: 0,
    padding: '0 10px',
  },
  propGrid: {
    width: '100%',
    height: '100%',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  propText: {
    fontSize: '12px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
  toolbar: {
    padding: 0,
    position: 'fixed',
    bottom: 0,
  },
}));

const Generator = ({ data }) => {
  const { uuid, label, width } = data;

  const classes = useStyles();

  return (
    <PatchRoot {...{ width }}>
      <PatchDetails {...{ name: `${label}`, uuid: `${uuid}`, type: 'Generator' }} />
      <ListItem className={classes.propItem}>
        <Grid container className={classes.propGrid}>
          <Grid item xs={12}>
            <Typography className={classes.propText}>Position</Typography>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={10} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <PatchValue {...{ uuid, propName: 'position' }} />
          </Grid>
          <Grid item xs={1}>
            <OutputHandle {...{ uuid, propName: 'position' }} />
          </Grid>
        </Grid>
      </ListItem>
      <ListItem className={classes.propItem}>
        <ShapePreview {...{ uuid, propName: 'position' }} />
      </ListItem>
      <ListItem className={classes.toolbar}>
        <PatchToolbar uuid={uuid} />
      </ListItem>
    </PatchRoot>
  );
};

Generator.whyDidYouRender = true;

Generator.propTypes = {
  data: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,
};

export default memo(Generator);
