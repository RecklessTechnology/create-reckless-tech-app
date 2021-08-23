/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { memo, useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/styles';

import { ListItem } from '@material-ui/core';

import TransformName from '../TransformName';

const useStyles = makeStyles(() => ({
  listItem: {
    padding: 0,
  },
  buttons: {
    right: 0,
  },
}));

const TransformInfo = ({ transformInfo }) => {
  const classes = useStyles();

  const [transformName, setTransformName] = useState('');

  useEffect(() => {
    if (transformInfo) {
      setTransformName(transformInfo.name);
    }
  }, [transformInfo, setTransformName]);

  if (!transformInfo) { return null; }

  return (
    <ListItem dense className={classes.listItem} alignItems="flex-start">
      <TransformName {...{ transformInfo: { ...transformInfo, name: transformName } }} />
    </ListItem>
  );
};

TransformInfo.whyDidYouRender = true;

export default memo(TransformInfo);
