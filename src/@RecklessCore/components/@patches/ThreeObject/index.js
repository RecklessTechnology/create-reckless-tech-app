/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { ListItem } from '@material-ui/core';

import PropListItem from '../shared/PropListItem/index';
import PatchValue from './PatchValue/index';
import PatchDetails from '../shared/PatchDetails/index';
import ParentChildProp from '../shared/ParentChildPro/index';
import PatchToolbar from './PatchToolbar/index';
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
    fontSize: '12px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
  toolbar: {
    padding: 0,
    position: 'fixed',
    bottom: 0,
  },
}));

const ThreeObjectPatch = ({ data }) => {
  const {
    uuid, label, type, width, children, isChildHidden, parents,
  } = data;

  const classes = useStyles();

  const props = [
    {
      uuid, propName: 'position', disableInput: false, disableOutput: true,
    },
    {
      uuid, propName: 'rotation', disableInput: false, disableOutput: true,
    },
    {
      uuid, propName: 'scale', disableInput: false, disableOutput: true,
    },
  ];

  return (
    <PatchRoot {...{ width }}>
      <PatchDetails {...{ name: `${label}`, uuid: `${uuid}`, type }} />
      <ListItem className={classes.propItem}>
        <ParentChildProp {...{
          isChildHidden, type, uuid, children,
        }}
        />
      </ListItem>
      {
        props.map((p) => (
          <PropListItem key={`${p.uuid}-${p.propName}-prop`} {...p}><PatchValue {...{ uuid: p.uuid, propName: p.propName }} /></PropListItem>
        ))
      }
      <ListItem className={classes.toolbar}>
        <PatchToolbar parents={parents} uuid={uuid} />
      </ListItem>
    </PatchRoot>
  );
};

export default ThreeObjectPatch;
