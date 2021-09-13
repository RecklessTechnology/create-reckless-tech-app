/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
  Drawer,
} from '@material-ui/core';

import RoomMenu from '../RoomMenu';
import PeersMenu from '../PeersMenu';
import InspectorToolbar from './InspectorToolbar';
import HelpMenu from '../HelpMenu';

const useStyles = makeStyles((theme) => ({
  drawer: {
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    height: (props) => (`calc(100% - ${(props.editorMenuOpen ? props.editorMenuHeight : 0)}px)`),
    width: (props) => (props.inspectorMenuWidth),
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 1300,
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

const InspectorView = ({
  editorMenuOpen,
  editorMenuHeight,
  inspectorMenuWidth,
  inspectorMenuOpen,
  inspectorMenuTab,
  setInspectorMenuTab,
}) => {
  const classes = useStyles({
    editorMenuOpen,
    editorMenuHeight,
    inspectorMenuWidth,
  });

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={inspectorMenuOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <InspectorToolbar {...{ handleChange: setInspectorMenuTab, value: inspectorMenuTab }} />
      {inspectorMenuTab === 0 ? <RoomMenu /> : null}
      {inspectorMenuTab === 1 ? <PeersMenu /> : null}
      {inspectorMenuTab === 2 ? <HelpMenu /> : null}
    </Drawer>
  );
};

InspectorView.propTypes = {
  editorMenuOpen: PropTypes.bool.isRequired,
  editorMenuHeight: PropTypes.number.isRequired,
  inspectorMenuWidth: PropTypes.number.isRequired,
  inspectorMenuOpen: PropTypes.bool.isRequired,
  inspectorMenuTab: PropTypes.number.isRequired,
  setInspectorMenuTab: PropTypes.func.isRequired,
};

InspectorView.whyDidYouRender = true;

export default memo(InspectorView);
