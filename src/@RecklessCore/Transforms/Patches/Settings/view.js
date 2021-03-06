import PropTypes from 'prop-types';

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  ListItem, Grid,
  Typography, Tooltip, TextField,
  List,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import InputHandle from '../../../Components/Patches/InputHandle/index';
import OutputHandle from '../../../Components/Patches/OutputHandle';

import PropAccordianView from '../../../Components/Patches/PropAccordian/view';

import RTSelectWithIcon from '../../../Components/Inputs/SelectWithIcon/index';

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
const TransformSettingsView = ({
  // eslint-disable-next-line react/prop-types
  value,
  setValue,
  uuid, propName, disableInput, disableOutput,
  type,
  // eslint-disable-next-line react/prop-types
  data,
}) => {
  const classes = useStyles();

  switch (type.toLowerCase()) {
    default:
      // eslint-disable-next-line no-console
      console.log(`Unknown Setting Type: ${type}`);
      return null;
    case 'input':
      return (
        <ListItem dense className={classes.propItem}>
          <Grid spacing={0} container className={classes.propGrid}>
            <Grid item xs={1} className={classes.handleGridLeft}>
              {disableInput === false ? <InputHandle {...{ uuid, propName }} /> : null}
            </Grid>
            <Grid item xs={10}>
              <PropAccordianView
                defaultOpen
                header={<Typography className={classes.propText}>{propName}</Typography>}
                expandIcon={(
                  <ExpandMoreIcon fontSize="small" />
                )}
              >
                <Tooltip title={value}>
                  <TextField
                    id="amt"
                    type="Number"
                    value={value}
                    onChange={(evt) => {
                      setValue(parseInt(evt.currentTarget.value, 10));
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
    case 'select':
      return (
        <ListItem dense className={classes.propItem}>
          <Grid spacing={0} container className={classes.propGrid}>
            <Grid item xs={1} className={classes.handleGridLeft}>
              {disableInput === false ? <InputHandle {...{ uuid, propName }} /> : null}
            </Grid>
            <Grid item xs={10}>
              <PropAccordianView
                defaultOpen
                header={<Typography className={classes.propText}>{propName}</Typography>}
                expandIcon={(
                  <ExpandMoreIcon fontSize="small" />
                )}
              >
                <Tooltip title={value}>
                  <List className={classes.selectListRoot}>
                    <RTSelectWithIcon
                      data={data}
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                    />
                  </List>
                </Tooltip>
              </PropAccordianView>
            </Grid>
            <Grid item xs={1} className={classes.handleGridRight}>
              {disableOutput === false ? <OutputHandle {...{ uuid, propName }} /> : null}
            </Grid>
          </Grid>
        </ListItem>
      );
  }
};

TransformSettingsView.propTypes = {
  setValue: PropTypes.func.isRequired,
  uuid: PropTypes.string.isRequired,
  propName: PropTypes.string.isRequired,
  disableInput: PropTypes.bool.isRequired,
  disableOutput: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

export default memo(TransformSettingsView);
