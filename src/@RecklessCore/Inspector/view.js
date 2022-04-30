import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
  Drawer, Divider,
} from '@material-ui/core';

import RoomMenu from '../Room';
import PeersMenu from '../Peers';
import InspectorToolbar from './Components/Toolbars/InspectorToolbar';
import HelpMenu from '../Help/Menus/HelpMenu';

const useStyles = makeStyles((theme) => ({
  drawer: {
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    height: (props) => (`calc(100% - ${(props.editorMenuOpen ? props.editorMenuHeight : 0)}px)`),
    width: (props) => (props.inspectorMenuWidth),
    position: 'relative',
    right: 0,
    top: 0,
    zIndex: 1300,
    pointerEvents: 'all',
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
      <Divider />
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

InspectorView.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(InspectorView);
