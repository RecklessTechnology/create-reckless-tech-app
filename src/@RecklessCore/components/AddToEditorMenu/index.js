/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */

import React, {
  useState,
} from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
  ListSubheader,
  Toolbar,
  AppBar, Tabs, Tab, Box,
  MenuItem,
  Menu, Tooltip,
  ListItemIcon, Typography,
  // Accordion, AccordionSummary, AccordionDetails,
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCube, faWaveSquare, faMouse, faSquareRootAlt,
} from '@fortawesome/free-solid-svg-icons';

import AddIcon from '@material-ui/icons/Add';

import PersonIcon from '@material-ui/icons/Person';

import useAppContext from '../../contexts/useAppContext';
import AddPeersToScene from '../AddPeersToScene';
import { getIconByType } from '../../utils/iconLookup';
import AddToEditorCloseButton from '../AddToEditorCloseButton';

import IconButtonView from '../@buttons/IconButton/view';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
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
    padding: 0,
    margin: 0,
  },
  propAccord: {
    width: '100%',
  },
  propExpanded: {
    margin: '0 !important',
  },
  propSummary: {
    minHeight: '48px !important',
  },
  propSummaryContent: {
    margin: '12px 0px !important',
  },
  propSummaryExpand: {
  },
  propSummaryExpandIcon: {

  },
  propDetails: {
  },
  tabRoot: {
    minWidth: '50px',
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

const AddToEditorMenu = () => {
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
        aria-label="account of current user"
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
          <AppBar position="static">
            <Toolbar
              variant="dense"
            >
              <AddToEditorCloseButton handleClose={closeMenu} />
              <Typography variant="h6" className={classes.title}>
                Add
              </Typography>
              <div className={classes.spacer} />
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="off"
                aria-label="scrollable prevent tabs example"
              >
                <Tooltip title="3D Objects" aria-label="3D Objects">
                  <Tab
                    classes={{
                      root: classes.tabRoot,
                    }}
                    icon={(<FontAwesomeIcon icon={faCube} />)}
                    aria-label="objects"
                    {...{
                      id: 'objects-tab-0',
                      'aria-controls': 'objects-tabpanel-0',
                    }}
                  />
                </Tooltip>
                <Tooltip title="Generators" aria-label="Generators">
                  <Tab
                    classes={{
                      root: classes.tabRoot,
                    }}
                    icon={<FontAwesomeIcon icon={faWaveSquare} />}
                    aria-label="generators"
                    {...{
                      id: 'generators-tab-1',
                      'aria-controls': 'generators-tabpanel-1',
                    }}
                  />
                </Tooltip>
                <Tooltip title="Peers" aria-label="Peers">
                  <Tab
                    classes={{
                      root: classes.tabRoot,
                    }}
                    icon={<PersonIcon />}
                    aria-label="peers"
                    {...{
                      id: 'peers-tab-2',
                      'aria-controls': 'peers-tabpanel-2',
                    }}
                  />
                </Tooltip>
                <Tooltip title="Devices" aria-label="Devices">
                  <Tab
                    classes={{
                      root: classes.tabRoot,
                    }}
                    icon={<FontAwesomeIcon icon={faMouse} />}
                    aria-label="devices"
                    {...{
                      id: 'devices-tab-3',
                      'aria-controls': 'devices-tabpanel-3',
                    }}
                  />
                </Tooltip>
                <Tooltip title="Transforms" aria-label="Transforms">
                  <Tab
                    classes={{
                      root: classes.tabRoot,
                    }}
                    icon={<FontAwesomeIcon icon={faSquareRootAlt} />}
                    aria-label="transforms"
                    {...{
                      id: 'transforms-tab-4',
                      'aria-controls': 'transforms-tabpanel-4',
                    }}
                  />
                </Tooltip>
              </Tabs>
            </Toolbar>
          </AppBar>
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

export default AddToEditorMenu;
