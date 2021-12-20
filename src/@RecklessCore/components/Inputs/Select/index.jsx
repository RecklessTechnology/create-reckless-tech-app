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

const RecklessSelect = ({
  data, // list of values: [1, 2, 3] or ['hello', 'world']
  value, // current value: 1 or 'hello'
  onChange, // callback when new item selected
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

RecklessSelect.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default memo(RecklessSelect);
