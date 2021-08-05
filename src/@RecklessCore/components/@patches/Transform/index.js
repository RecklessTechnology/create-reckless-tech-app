/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */

import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { ListItem, Typography } from '@material-ui/core';

import PatchValue from './PatchValue/index';
import PatchToolbar from './PatchToolbar/index';

import PatchDetails from '../shared/PatchDetails/index';
import PropListItem from '../shared/PropListItem/index';
import useTransformsContext from '../../../contexts/useTransformsContext';
import PatchRoot from '../shared/PatchRoot';

const useStyles = makeStyles(() => ({
  propItem: {
    margin: 0,
    padding: '0 10px',
  },
  propGrid: {
    width: '100%',
    height: '100%',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  propText: {
    whiteSpace: 'nowrap',
    textAlign: 'center',
    width: '100%',
  },
  toolbar: {
    padding: 0,
    position: 'fixed',
    bottom: 0,
  },
}));

const TransformPatch = ({ data }) => {
  const { findTransform } = useTransformsContext();
  const [transform, setTransform] = useState({ amount: 1 });
  const { uuid, width, label } = data;
  const classes = useStyles({ width });

  const props = [
    {
      uuid, propName: 'value', disableInput: false, disableOutput: false,
    },
  ];

  useEffect(() => {
    const p = findTransform(uuid);
    if (p !== undefined) {
      setTransform(p);
    }
  }, [uuid, findTransform, setTransform]);

  return (
    <PatchRoot {...{ width }}>
      <PatchDetails {...{ name: `${label}`, uuid: `${uuid}`, type: 'Transform' }} />
      <ListItem className={classes.propItem}>
        <Typography className={classes.propText}>{`x${transform.amount}`}</Typography>
      </ListItem>
      {props.map((p) => (<PropListItem key={`${p.uuid}-${p.propName}-prop`} {...p}><PatchValue {...{ uuid: p.uuid, propName: p.propName }} /></PropListItem>))}
      <ListItem className={classes.toolbar}>
        <PatchToolbar parents={[]} uuid={uuid} />
      </ListItem>
    </PatchRoot>
  );
};

export default TransformPatch;
