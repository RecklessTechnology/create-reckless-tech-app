import React from 'react';

import { Divider } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import useAppContext from '../../@RecklessCore/useAppContext';

import RTObjectMenu from './RTObjectMenu';

function SceneMenu(props) {
  const { recklessObjectNamesArray } = useAppContext();
  
  // Create local classes
  const classes = makeStyles((theme) => ({
    root: {}
  }))();
  return (
    <div
      className={classes.root}
      role="tabpanel"
      id={`full-width-tabpanel-${1}`}
      aria-labelledby={`full-width-tab-${1}`}
    >
      {recklessObjectNamesArray().map((name)=>(<div key={name}><RTObjectMenu name={name}/><Divider /></div>))}
    </div>
  );
}

export default SceneMenu;
