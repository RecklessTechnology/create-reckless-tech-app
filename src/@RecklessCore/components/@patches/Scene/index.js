/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { ListItem } from '@material-ui/core';

import PatchDetails from '../shared/PatchDetails/index';

import ParentChildProp from '../shared/ParentChildPro/index';
import PatchRoot from '../shared/PatchRoot';

const useStyles = makeStyles(() => ({
  propItem: {
    margin: 0,
    padding: '0 10px',
  },
}));

const ScenePatch = ({ data }) => {
  const {
    uuid, label, type, width, children, isChildHidden,
  } = data;
  const classes = useStyles();

  return (
    <PatchRoot {...{ width }}>
      <PatchDetails {...{ name: `${label}`, uuid: `${uuid}`, type: 'Scene' }} />
      <ListItem className={classes.propItem}>
        <ParentChildProp {...{
          isChildHidden, type, uuid, children,
        }}
        />
      </ListItem>
    </PatchRoot>
  );
};

export default ScenePatch;
