import { PropTypes } from 'prop-types';

import React, { memo } from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import {
  AppBar, Toolbar,
} from '@material-ui/core';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CreateIcon from '@material-ui/icons/Create';

import Inspector from '../Inspector';
import Editor from '../Editor';

import IconButtonView from '../Components/Buttons/IconButton/view';
import WelcomeModal from '../Help/Modals/Welcome';

import WidgetsProvider from '../Widgets/Providers';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    position: 'relative',
  },
  rootShiftBottom: {
    height: (props) => (`calc(100% - ${props.editorMenuOpen ? props.editorMenuHeight : 0}px)`),
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBar: {
    width: (props) => (`calc(100% - ${(props.inspectorMenuOpen ? props.inspectorMenuWidth : 0)}px)`),
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: 'none',
    boxShadow: 'none',
    pointerEvents: 'none',
  },
  appBarShiftLeft: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarShiftRight: {
    marginRight: (props) => (props.inspectorMenuWidth),
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  renderArea: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    marginRight: 0,
    height: '100%',
    pointerEvents: 'none',
  },
  renderAreaShiftLeft: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  renderAreaShiftRight: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: (props) => (props.inspectorMenuWidth),
  },
  bottomAppBar: {
    width: (props) => (`calc(100% - ${(props.inspectorMenuOpen ? props.inspectorMenuWidth : 0)}px)`),
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    top: 'auto',
    bottom: (props) => (props.editorMenuOpen ? props.editorMenuHeight : 0),
    background: 'none',
    boxShadow: 'none',
    pointerEvents: 'none',
    position: 'absolute',
  },
  bottomToolbar: {
    width: '100%',
    pointerEvents: 'none',
  },
  editorButton: {
    pointerEvents: 'all',
  },
  inspectorButton: {
    marginLeft: 'auto !important',
    pointerEvents: 'all',
  },
}));

const AppView = ({
  sceneJSON,
  children,
  editorMenuOpen,
  editorMenuHeight,
  setEditorMenuOpen,
  inspectorMenuOpen,
  inspectorMenuWidth,
  setInspectorMenuOpen,
}) => {
  // Local CSS classes
  const classes = useStyles({
    editorMenuOpen,
    editorMenuHeight,
    inspectorMenuOpen,
    inspectorMenuWidth,
  });
  const { widgets, connections, metadata } = sceneJSON;
  const { editorInteractive } = metadata;
  return (
    <div
      className={clsx(classes.root, {
        [classes.rootShiftBottom]: editorMenuOpen,
      })}
    >
      <main
        className={clsx(classes.renderArea, {
          [classes.renderAreaShiftRight]: inspectorMenuOpen,
        })}
      >
        <WidgetsProvider
          {...{
            connections,
            widgets,
            editorMenuOpen,
            editorMenuHeight,
            inspectorMenuOpen,
            inspectorMenuWidth,
          }}
        />
        {children}
        <AppBar
          position="fixed"
          color="primary"
          className={clsx(classes.bottomAppBar, {
            [classes.appBarShiftRight]: inspectorMenuOpen,
          })}
        >
          <Toolbar
            variant="dense"
            className={classes.bottomToolbar}
          >
            {editorMenuOpen !== true ? (
              <IconButtonView
                {...{
                  label: 'Edit',
                  onClick: () => {
                    setEditorMenuOpen(!editorMenuOpen);
                  },
                }}
                className={classes.editorButton}
                disabled={false}
              >
                <CreateIcon fontSize="small" />
              </IconButtonView>
            ) : null}
            {inspectorMenuOpen !== true ? (
              <IconButtonView
                {...{
                  disabled: !editorInteractive,
                  label: 'Inspect',
                  onClick: () => {
                    setInspectorMenuOpen(!inspectorMenuOpen);
                  },
                }}
                className={classes.inspectorButton}
              >
                <InfoOutlinedIcon fontSize="small" />
              </IconButtonView>
            ) : null}
          </Toolbar>
        </AppBar>
      </main>
      {inspectorMenuOpen === true ? <Inspector /> : null}
      {editorMenuOpen === true ? <Editor /> : null}
      <WelcomeModal />
    </div>
  );
};

AppView.whyDidYouRender = (process.env.NODE_ENV === 'development');

AppView.propTypes = {
  sceneJSON: PropTypes.shape({
    connections: PropTypes.arrayOf(PropTypes.shape({})),
    widgets: PropTypes.arrayOf(PropTypes.shape({})),
    metadata: PropTypes.shape({
      editorInteractive: PropTypes.bool,
    }),
  }).isRequired,
  children: PropTypes.node.isRequired,
  editorMenuOpen: PropTypes.bool.isRequired,
  editorMenuHeight: PropTypes.number.isRequired,
  setEditorMenuOpen: PropTypes.func.isRequired,
  inspectorMenuOpen: PropTypes.bool.isRequired,
  inspectorMenuWidth: PropTypes.number.isRequired,
  setInspectorMenuOpen: PropTypes.func.isRequired,
};

AppView.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(AppView);
