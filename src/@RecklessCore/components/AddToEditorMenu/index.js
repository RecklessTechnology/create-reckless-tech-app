/* eslint-disable react/jsx-filename-extension */

import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
  IconButton, MenuItem, Menu, Tooltip, Accordion, AccordionSummary, AccordionDetails, Typography,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddToEditorToolbar from '../AddToEditorToolbar';
import useAppContext from '../../contexts/useAppContext';
import AddPeersToScene from '../AddPeersToScene';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  paper: {
    width: '375px',
    height: '485px',
  },
  list: {
    width: '100%',
    paddingTop: 0,
  },
  itemList: {
    width: '100%',
  },
}));

const AddToEditorMenu = () => {
  const classes = useStyles();

  const {
    addThreeObj, addGenerator, addDevice, addTransform,
  } = useAppContext();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const addObject = (type) => {
    addThreeObj(type);
    closeMenu();
  };

  return (
    <div>
      <Tooltip title="Component" aria-label="Component">
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={openMenu}
          color="inherit"
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Menu
        className={classes.root}
        id="menu-appbar"
        anchorEl={anchorEl}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={closeMenu}
        classes={{
          paper: classes.paper,
          list: classes.list,
        }}
      >
        <AddToEditorToolbar closeMenu={closeMenu} />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="3d-objects-content"
            id="3d-objects-header"
          >
            <Typography className={classes.heading}>3d Objects</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul className={classes.itemList}>
              <MenuItem onClick={() => { addObject('Box'); closeMenu(); }}>Cube</MenuItem>
              <MenuItem onClick={() => { addObject('Sphere'); closeMenu(); }}>Sphere</MenuItem>
              <MenuItem onClick={() => { addObject('Plane'); closeMenu(); }}>Plane</MenuItem>
            </ul>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="peers-content"
            id="peers-header"
          >
            <Typography className={classes.heading}>Peers</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AddPeersToScene closeMenu={closeMenu} />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="generators-content"
            id="generators-header"
          >
            <Typography className={classes.heading}>Generators</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul className={classes.itemList}>
              <MenuItem onClick={() => { addGenerator('Sinewave'); closeMenu(); }}>Sinewave</MenuItem>
              <MenuItem onClick={() => { addGenerator('Orbit'); closeMenu(); }}>Orbit</MenuItem>
            </ul>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="devices-content"
            id="devices-header"
          >
            <Typography className={classes.heading}>Devices</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MenuItem onClick={() => { addDevice('Mouse'); closeMenu(); }}>Mouse</MenuItem>
            <MenuItem onClick={() => { addDevice('Keyboard'); closeMenu(); }}>Keyboard</MenuItem>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="transforms-content"
            id="transforms-header"
          >
            <Typography className={classes.heading}>Transforms</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MenuItem onClick={() => { addTransform('Multiply'); closeMenu(); }}>Multiply</MenuItem>
          </AccordionDetails>
        </Accordion>
      </Menu>
    </div>
  );
};

export default AddToEditorMenu;
