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
    overflow: 'hidden',
  },
}));

/**
* Basic Icon and Title for Patches.
*/
const PatchDetails = ({
  name = 'Patch',
  type = 'mesh',
  uuid = 'xxx',
}) => {
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
  /**
  * Name of Patch.
  */
  name: PropTypes.string.isRequired,
  /**
  * Type of Patch.
  */
  type: PropTypes.string.isRequired,
  /**
  * Unique Patch ID.
  */
  uuid: PropTypes.string.isRequired,
};

export default memo(PatchDetails);
