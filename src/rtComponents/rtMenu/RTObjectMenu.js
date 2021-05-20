import React from 'react'

import { ListItem, ListItemText, Grid } from "@material-ui/core";

import useAppContext from '../../@RecklessCore/useAppContext';

const RTObjectMenu = ({ name }) => {
  const { findRecklessObjectByName } = useAppContext();
  const recklessObj = findRecklessObjectByName(name);
  
  return (
    <ListItem>
      <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={0}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
          <ListItemText primary={recklessObj.name}/>
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default RTObjectMenu;