/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  ListItem, Grid,
  Typography, Tooltip, TextField,
  Select, MenuItem,
  ListItemIcon, ListItemText,
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faMinus, faTimes, faDivide,
} from '@fortawesome/free-solid-svg-icons';

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
  selectRoot: {
    width: '100%',
  },
  menuItemRoot: {
    padding: 0,
  },
  iconRoot: {
    minWidth: 10,
    marginRight: 10,
  },
}));

const getIcon = (type) => {
  switch (type) {
    default:
    case 'Add':
      return <FontAwesomeIcon icon={faPlus} />;
    case 'Subtract':
      return <FontAwesomeIcon icon={faMinus} />;
    case 'Multiply':
      return <FontAwesomeIcon icon={faTimes} />;
    case 'Divide':
      return <FontAwesomeIcon icon={faDivide} />;
  }
};

// eslint-disable-next-line no-unused-vars
const TransformSettingsView = ({
  amount, setAmount,
  operation, setOperation,
  uuid, propName, disableInput, disableOutput,
}) => {
  const classes = useStyles();
  const options = ['Add', 'Subtract', 'Multiply', 'Divide'];
  return (
    <ListItem dense className={classes.propItem}>
      <Grid spacing={0} container className={classes.propGrid}>
        <Grid item xs={1} className={classes.handleGridLeft} />
        <Grid item xs={10}>
          <PropAccordianView
            defaultOpen
            header={<Typography className={classes.propText}>Operation</Typography>}
            expandIcon={(
              <ExpandMoreIcon fontSize="small" />
            )}
          >
            <Tooltip title={operation} aria-label={operation}>
              <Select
                className={classes.selectRoot}
                labelId="label"
                id="select"
                value={operation}
                onChange={(evt) => {
                  setOperation(options[evt.currentTarget.value]);
                }}
                renderValue={() => (
                  <MenuItem className={classes.menuItemRoot} value={operation}>
                    <ListItemIcon className={classes.iconRoot}>
                      {getIcon(operation)}
                    </ListItemIcon>
                    <ListItemText primary={operation} />
                  </MenuItem>
                )}
              >
                {options.map((o) => (
                  <MenuItem key={`calc_select_${o}`} value={o}>
                    <ListItemIcon className={classes.iconRoot}>
                      {getIcon(o)}
                    </ListItemIcon>
                    <ListItemText primary={o} />
                  </MenuItem>
                ))}
              </Select>
            </Tooltip>
          </PropAccordianView>
        </Grid>
        <Grid item xs={1} className={classes.handleGridLeft} />
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
