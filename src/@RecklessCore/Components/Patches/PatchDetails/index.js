import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  ListItem, ListItemText, ListItemIcon, Tooltip,
} from '@material-ui/core';

import { getIconByType } from '../../../Utils/iconLookup';

const useStyles = makeStyles(() => ({
  propItem: {
    margin: 0,
    padding: '0 13px 0 13px',
  },
  propIcon: {
    minWidth: '30px',
  },
  propText: {
    whiteSpace: 'nowrap',
  },
}));

const PatchDetails = ({ name, type, uuid }) => {
  const classes = useStyles();

  return (
    <ListItem dense className={classes.propItem}>
      <Tooltip title={type}>
        <ListItemIcon
          className={classes.propIcon}
        >
          {getIconByType(type)}
        </ListItemIcon>
      </Tooltip>
      <Tooltip title={uuid}>
        <ListItemText
          className={classes.propText}
          primary={name}
        />
      </Tooltip>
    </ListItem>
  );
};

PatchDetails.propTypes = {
  name: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default memo(PatchDetails);
