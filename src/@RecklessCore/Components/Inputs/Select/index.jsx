import React, { memo } from 'react';

import { PropTypes } from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import {
  Select, MenuItem,
  ListItemText,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  selectRoot: {
    width: '100%',
  },
  menuItemRoot: {
    padding: 0,
  },
}));

/**
* Basic Select List.
*/
const RTSelect = ({
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
          <ListItemText>{value}</ListItemText>
        </MenuItem>
      )}
    >
      {data.map((d) => (
        <MenuItem key={d} value={d} className={classes.menuItemRoot}>
          <ListItemText>{d}</ListItemText>
        </MenuItem>
      ))}
    </Select>
  );
};

RTSelect.propTypes = {
  /**
    List of options.
  */
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
    Selected option.
  */
  value: PropTypes.string.isRequired,
  /**
    Do something when changed.
  */
  onChange: PropTypes.func.isRequired,
};

export default memo(RTSelect);
