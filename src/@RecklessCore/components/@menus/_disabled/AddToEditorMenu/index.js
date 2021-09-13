/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

/* eslint-disable react/jsx-filename-extension */

import React, {
  useState,
} from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
  ListSubheader,
  Box,
  MenuItem,
  Menu,
  ListItemIcon, Typography,
  // Accordion, AccordionSummary, AccordionDetails,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import useAppContext from '../../../contexts/useAppContext';
import AddPeersToScene from '../AddToSceneMenu/AddPeersToScene';
import { getIconByType } from '../../../utils/iconLookup';

import AddToSceneToolbar from '../AddToSceneMenu/AddToSceneToolbar';

import IconButtonView from '../../@buttons/IconButton/view';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
  },
  paper: {
    // width: '375px',
    // height: '485px',
  },
  list: {
    width: '100%',
    paddingTop: 0,
  },
  itemList: {
    width: '100%',
    padding: 0,
    margin: 0,
  },
  tabPanel: {
    padding: 0,
  },
}));

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box classes={{ root: classes.tabPanel }} p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

const AddToSceneMenu = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {
    addThreeObj, addGenerator,
    addDevice, addTransform,
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
      <IconButtonView
        {...{
          label: 'Add',
          handeClick: (evt) => {
            openMenu(evt);
          },
        }}
        aria-label="Add"
        aria-controls="menu-appbar"
        aria-haspopup="true"
      >
        <AddIcon fontSize="small" />
      </IconButtonView>
      <Menu
        className={classes.menu}
        id="menu-appbar"
        anchorEl={anchorEl}
        keepMounted
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
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
        <div className={classes.root}>
          <AddToSceneToolbar {...{ value, handleChange, closeMenu }} />
          <TabPanel value={value} index={0}>
            <ul className={classes.itemList}>
              <ListSubheader>Add 3d Object</ListSubheader>
              <MenuItem dense onClick={() => { addObject('Box'); closeMenu(); }}>
                <ListItemIcon>
                  {getIconByType('Mesh')}
                </ListItemIcon>
                <Typography variant="inherit">Cube</Typography>
              </MenuItem>
              <MenuItem dense onClick={() => { addObject('Sphere'); closeMenu(); }}>
                <ListItemIcon>
                  {getIconByType('Mesh')}
                </ListItemIcon>
                <Typography variant="inherit">Sphere</Typography>
              </MenuItem>
              <MenuItem dense onClick={() => { addObject('Plane'); closeMenu(); }}>
                <ListItemIcon>
                  {getIconByType('Mesh')}
                </ListItemIcon>
                <Typography variant="inherit">Plane</Typography>
              </MenuItem>
            </ul>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ul className={classes.itemList}>
              <ListSubheader>Add Generator</ListSubheader>
              <MenuItem dense onClick={() => { addGenerator('Sinewave'); closeMenu(); }}>
                <ListItemIcon>
                  {getIconByType('Generator')}
                </ListItemIcon>
                <Typography variant="inherit">Sinewave</Typography>
              </MenuItem>
              <MenuItem dense onClick={() => { addGenerator('Orbit'); closeMenu(); }}>
                <ListItemIcon>
                  {getIconByType('Generator')}
                </ListItemIcon>
                <Typography variant="inherit">Orbit</Typography>
              </MenuItem>
            </ul>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AddPeersToScene closeMenu={closeMenu} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ul className={classes.itemList}>
              <ListSubheader>Add Device</ListSubheader>
              <MenuItem dense onClick={() => { addDevice('Mouse'); closeMenu(); }}>
                <ListItemIcon>
                  {getIconByType('Device')}
                </ListItemIcon>
                <Typography variant="inherit">Mouse</Typography>
              </MenuItem>
            </ul>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <ul className={classes.itemList}>
              <ListSubheader>Add Transform</ListSubheader>
              <MenuItem dense onClick={() => { addTransform('Multiply'); closeMenu(); }}>
                <ListItemIcon>
                  {getIconByType('Transform')}
                </ListItemIcon>
                <Typography variant="inherit">Multiply</Typography>
              </MenuItem>
            </ul>
          </TabPanel>
        </div>
      </Menu>
    </div>
  );
};

export default AddToSceneMenu;
