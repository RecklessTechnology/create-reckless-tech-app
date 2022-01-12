import React, { memo } from 'react';

import { PropTypes } from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import {
  Select, MenuItem,
  ListItemIcon, ListItemText,
} from '@material-ui/core';

import { getIconByType } from '../../../Utils/iconLookup';

const useStyles = makeStyles(() => ({
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

/**
* Basic Select List with Type Icons.
*/
const RTSelectWithIcon = ({
  data = ['default', 'values'],
  value = 'default',
  // eslint-disable-next-line no-unused-vars
  onChange = (event) => {},
}) => {
  const classes = useStyles();

  return (
    <Select
      className={classes.selectRoot}
      value={value}
      onChange={onChange}
      renderValue={() => (
        <MenuItem value={value} className={classes.menuItemRoot}>
          <ListItemIcon className={classes.iconRoot}>
            {getIconByType(value)}
          </ListItemIcon>
          <ListItemText>{value}</ListItemText>
        </MenuItem>
      )}
    >
      {data.map((d) => (
        <MenuItem key={d} value={d} className={classes.menuItemRoot}>
          <ListItemIcon className={classes.iconRoot}>
            {getIconByType(d)}
          </ListItemIcon>
          <ListItemText>{d}</ListItemText>
        </MenuItem>
      ))}
    </Select>
  );
};

RTSelectWithIcon.propTypes = {
  /**
    Array of strings to list.
  */
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
    Selected value.
  */
  value: PropTypes.string.isRequired,
  /**
    Handle action on change.
  */
  onChange: PropTypes.func.isRequired,
};

export default memo(RTSelectWithIcon);
