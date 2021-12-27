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

const RecklessSelectWithIcon = ({
  data, // list of values: ['hello', 'world']
  value, // current value: 'hello'
  onChange, // callback when item selected
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

RecklessSelectWithIcon.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default memo(RecklessSelectWithIcon);
