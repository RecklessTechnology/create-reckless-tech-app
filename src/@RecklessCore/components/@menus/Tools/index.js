/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, Divider,
} from '@material-ui/core';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/Inbox';
import MailIcon from '@material-ui/icons/Mail';

import useToolsMenuContext from '../../../contexts/useToolsMenuContext';
import useEditorMenuContext from '../../../contexts/useEditorMenuContext';

import IconButtonView from '../../@buttons/IconButton/view';

const useStyles = makeStyles((theme) => ({
  drawer: {
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    height: (props) => (`calc(100% - ${(props.editorMenuOpen ? props.editorMenuHeight : 0)}px)`),
    width: (props) => (props.toolsMenuWidth),
    position: 'fixed',
    left: 0,
    top: 0,
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

const ToolsDrawer = () => {
  const { toolsMenuWidth, toolsMenuOpen, setToolsMenuOpen } = useToolsMenuContext();
  const { editorMenuOpen, editorMenuHeight } = useEditorMenuContext();

  const classes = useStyles({ toolsMenuWidth, editorMenuOpen, editorMenuHeight });
  const theme = useTheme();

  const handleDrawerClose = () => {
    setToolsMenuOpen(false);
  };

  if (!toolsMenuOpen) return null;

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={toolsMenuOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButtonView {...{
          label: 'Close',
          handeClick: () => {
            handleDrawerClose();
          },
        }}
        >
          {theme.direction === 'ltr' ? <ChevronLeftIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
        </IconButtonView>
      </div>
      <Divider />
      <List dense>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem dense button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon fontSize="small" /> : <MailIcon fontSize="small" />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List dense>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem dense button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon fontSize="small" /> : <MailIcon fontSize="small" />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List dense>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem dense button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon fontSize="small" /> : <MailIcon fontSize="small" />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

ToolsDrawer.whyDidYouRender = true;

export default ToolsDrawer;
