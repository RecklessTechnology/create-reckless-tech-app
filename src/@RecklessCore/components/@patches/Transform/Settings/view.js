/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  ListItem, Grid,
  Typography, Tooltip, TextField,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import InputHandle from '../../shared/InputHandle';
import OutputHandle from '../../shared/OutputHandle';

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
}));

// eslint-disable-next-line no-unused-vars
const TransformSettingsView = ({
  amount, setAmount, uuid, propName, disableInput, disableOutput,
}) => {
  const classes = useStyles();
  return (
    <ListItem dense className={classes.propItem}>
      <Grid spacing={0} container className={classes.propGrid}>
        <Grid item xs={1} className={classes.handleGridLeft}>
          {disableInput === false ? <InputHandle {...{ uuid, propName }} /> : null}
        </Grid>
        <Grid item xs={10}>
          <PropAccordianView
            defaultOpen
            header={<Typography className={classes.propText}>Amount</Typography>}
            expandIcon={(
              <ExpandMoreIcon fontSize="small" />
            )}
          >
            <Tooltip title={amount} aria-label={amount}>
              <TextField
                id="amt"
                type="Number"
                value={amount}
                onChange={(evt) => {
                  setAmount(evt.currentTarget.value);
                }}
              />
            </Tooltip>
          </PropAccordianView>
        </Grid>
        <Grid item xs={1} className={classes.handleGridRight}>
          {disableOutput === false ? <OutputHandle {...{ uuid, propName }} /> : null}
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default memo(TransformSettingsView);
