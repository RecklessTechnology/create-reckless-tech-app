/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  ListItem, Grid,
  Typography, Tooltip,
  List,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import PropAccordianView from '../../../../Components/Patches/PropAccordian/view';

import RecklessSelect from '../../../../Components/Inputs/Select/index';

const useStyles = makeStyles(() => ({
  propText: {
    fontSize: '12px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    textTransform: 'capitalize',
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
  selectListRoot: {
    width: '100%',
    margin: 0,
    padding: 0,
  },
  selectRoot: {
    width: '100%',
  },
  menuItemRoot: {
    padding: 0,
  },
  iconRoot: {
    margin: 0,
    minWidth: 10,
    marginRight: 10,
  },
}));

// eslint-disable-next-line no-unused-vars
const CameraSettingsView = ({
  value, setValue,
  propName, data,
}) => {
  const classes = useStyles();

  return (
    <ListItem dense className={classes.propItem}>
      <Grid spacing={0} container className={classes.propGrid}>
        <Grid item xs={1} className={classes.handleGridLeft} />
        <Grid item xs={10}>
          <PropAccordianView
            defaultOpen
            header={<Typography className={classes.propText}>{propName}</Typography>}
            expandIcon={(
              <ExpandMoreIcon fontSize="small" />
            )}
          >
            <Tooltip title={value.label === undefined ? '' : value.label} aria-label={value.label === undefined ? '' : value.label}>
              <List className={classes.selectListRoot}>
                <RecklessSelect
                  data={data.map((d) => d.label)}
                  value={value.label === undefined ? '' : value.label}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
              </List>
            </Tooltip>
          </PropAccordianView>
        </Grid>
        <Grid item xs={1} className={classes.handleGridRight} />
      </Grid>
    </ListItem>
  );
};

CameraSettingsView.propTypes = {
  setValue: PropTypes.func.isRequired,
  propName: PropTypes.string.isRequired,
};

export default memo(CameraSettingsView);
