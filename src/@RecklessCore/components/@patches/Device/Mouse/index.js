/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React from 'react';

import { ListItem, makeStyles } from '@material-ui/core';

import PatchToolbar from '../PatchToolbar/index';
import PatchValue from '../PatchValue/index';

import PropListItem from '../../shared/PropListItem/index';
import PatchDetails from '../../shared/PatchDetails/index';
import PatchRoot from '../../shared/PatchRoot';

const useStyles = makeStyles(() => ({
  toolbar: {
    padding: 0,
    position: 'fixed',
    bottom: 0,
  },
}));

const MousePatch = ({ data }) => {
  const {
    uuid, width, label, type,
  } = data;

  const props = [
    {
      uuid, propName: 'position', disableInput: true, disableOutput: false,
    },
  ];

  const classes = useStyles();
  return (
    <PatchRoot {...{ width }}>
      <PatchDetails {...{ name: label, type }} />
      {props.map((p) => (<PropListItem key={`${p.uuid}-${p.propName}-prop`} {...p}><PatchValue {...{ uuid: p.uuid, propName: p.propName }} /></PropListItem>))}
      <ListItem className={classes.toolbar}>
        <PatchToolbar parents={[]} uuid={uuid} />
      </ListItem>
    </PatchRoot>
  );
};

MousePatch.propTypes = {
  data: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default MousePatch;
