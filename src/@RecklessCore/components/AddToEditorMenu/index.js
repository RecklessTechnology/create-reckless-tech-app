import { useState } from 'react';

import * as THREE from 'three';

import { makeStyles } from '@material-ui/core/styles';

import { IconButton, MenuItem, Menu, Tooltip, Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddToEditorToolbar from '../AddToEditorToolbar';
import useAppContext from '../../contexts/useAppContext';

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
    width :'375px',
    height: '485px',
  },
  list: {
    paddingTop: 0,
  },
  itemList: {
    width: '100%',
  }
}));

const AddToEditorMenu = () => {
  const classes = useStyles();

  const { addThreeObj } = useAppContext();

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
  }

  return (
    <div>
      <Tooltip title={"Component"} aria-label="Component">
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
              <MenuItem onClick={()=>{ addObject('Box')}}>Cube</MenuItem>
              <MenuItem onClick={()=>{ addObject('Circle')}}>Circle</MenuItem>
              <MenuItem onClick={()=>{ addObject('Cylinder')}}>Cylinder</MenuItem>
              <MenuItem onClick={()=>{ addObject('Dodecahedron')}}>Dodecahedron</MenuItem>
              <MenuItem onClick={()=>{ addObject('Icosahedron')}}>Icosahedron</MenuItem>
              <MenuItem onClick={()=>{ addObject('Lathe')}}>Lathe</MenuItem>
              <MenuItem onClick={()=>{ addObject('Octahedron')}}>Octahedron</MenuItem>
              <MenuItem onClick={()=>{ addObject('Plane')}}>Plane</MenuItem>
              <MenuItem onClick={()=>{ addObject('Ring')}}>Ring</MenuItem>
              <MenuItem onClick={()=>{ addObject('Sphere')}}>Sphere</MenuItem>
              <MenuItem onClick={()=>{ addObject('Sprite')}}>Sprite</MenuItem>
              <MenuItem onClick={()=>{ addObject('Tetrahedron')}}>Tetrahedron</MenuItem>
              <MenuItem onClick={()=>{ addObject('Torus')}}>Torus</MenuItem>
              <MenuItem onClick={()=>{ addObject('TorusKnot')}}>TorusKnot</MenuItem>
              <MenuItem onClick={()=>{ addObject('Tube')}}>Tube</MenuItem>
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
            <MenuItem onClick={closeMenu}>Nope</MenuItem>
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
            <MenuItem onClick={closeMenu}>Nope</MenuItem>
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
            <MenuItem onClick={closeMenu}>Nope</MenuItem>
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
            <MenuItem onClick={closeMenu}>Nope</MenuItem>
          </AccordionDetails>
        </Accordion>
      </Menu>
    </div>
  );
}

export default AddToEditorMenu;