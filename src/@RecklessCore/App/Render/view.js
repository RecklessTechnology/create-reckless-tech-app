import { PropTypes } from 'prop-types';

import React, { memo } from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import {
  AppBar, Toolbar,
} from '@material-ui/core';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CreateIcon from '@material-ui/icons/Create';

import Inspector from '../../InspectorMenu/Render/index';
import Editor from '../../EditorMenu/Render/index';

import IconButtonView from '../../Components/Buttons/IconButton/view';
import WelcomeModal from '../../Components/Modals/Welcome';

import Widgets from '../../Widgets/Render';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    overflow: 'scroll',
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
  },
  bottomToolbar: {
    width: '100%',
  },
  editorButton: {},
  inspectorButton: {
    marginLeft: 'auto !important',
  },
}));

const AppView = ({
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
        <Widgets
          {...{
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
                  handeClick: () => {
                    setEditorMenuOpen(!editorMenuOpen);
                  },
                }}
                className={classes.editorButton}
              >
                <CreateIcon fontSize="small" />
              </IconButtonView>
            ) : null}
            {inspectorMenuOpen !== true ? (
              <IconButtonView
                {...{
                  label: 'Inspect',
                  handeClick: () => {
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
