import React, { createContext, memo } from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, IconButton } from "@material-ui/core";

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CreateIcon from '@material-ui/icons/Create';

import Tools from './@RecklessCore/components/@menus/Tools/index';
import Inspector from './@RecklessCore/components/@menus/Inspector/index';
import Editor from './@RecklessCore/components/@menus/Editor/index';

export const ToolsMenuContext = createContext(null);
export const EditorMenuContext = createContext(null);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    overflow: 'scroll',
  },
  rootShiftBottom: {
    height: (props)=>(`calc(100% - ${props.editorMenuOpen ? props.editorMenuHeight : 0}px)`),
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBar: {
    width: (props)=>(`calc(100% - ${(props.toolsMenuOpen ? props.toolsMenuWidth : 0) + (props.inspectorMenuOpen ? props.inspectorMenuWidth : 0)}px)`),
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: 'none',
    boxShadow: 'none',
  },
  appBarShiftLeft: {
    marginLeft: (props)=>(props.toolsMenuWidth),
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarShiftRight: {
    marginRight: (props)=>(props.inspectorMenuWidth),
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  renderArea: {
    flexGrow: 1,
    // paddingTop: theme.spacing(3),
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
    marginLeft: (props)=>(props.toolsMenuWidth),
  },
  renderAreaShiftRight: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: (props)=>(props.inspectorMenuWidth),
  },
  bottomAppBar: {
    width: (props)=>(`calc(100% - ${(props.toolsMenuOpen ? props.toolsMenuWidth : 0) + (props.inspectorMenuOpen ? props.inspectorMenuWidth : 0)}px)`),
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    top: 'auto',
    bottom: (props)=>(props.editorMenuOpen ? props.editorMenuHeight : 0),
    background: 'none',
    boxShadow: 'none',
  },
  bottomToolbar: {
    width: '100%'
  },
  inspectorButton: {
    marginLeft: 'auto',
  }
}));

const AppView = ({
  children,
  editorMenuOpen,
  editorMenuHeight,
  setEditorMenuOpen,
  toolsMenuOpen,
  toolsMenuWidth,
  setToolsMenuOpen,
  inspectorMenuOpen,
  inspectorMenuWidth,
  setInspectorMenuOpen
}) => {
  // Local CSS classes
  const classes = useStyles({
    editorMenuOpen,
    editorMenuHeight,
    toolsMenuOpen,
    toolsMenuWidth,
    inspectorMenuOpen,
    inspectorMenuWidth,
  });

  return(
    <div
      className={clsx(classes.root, {
        [classes.rootShiftBottom]: editorMenuOpen,
      })}
    >
        {toolsMenuOpen === true ? <Tools/> : null}
        <main
          className={clsx(classes.renderArea, {
            [classes.renderAreaShiftLeft]: toolsMenuOpen,
            [classes.renderAreaShiftRight]: inspectorMenuOpen,
          })}
        >
          {children}
          <AppBar position="fixed" color="primary" className={clsx(classes.bottomAppBar, {
            [classes.appBarShiftLeft]: toolsMenuOpen,
            [classes.appBarShiftRight]: inspectorMenuOpen,
          })}>
            <Toolbar className={classes.bottomToolbar}>
            {editorMenuOpen !== true ? <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={()=>{setEditorMenuOpen(!editorMenuOpen)}}
                edge="end"
                className={classes.menuButton}
              >
                <CreateIcon />
              </IconButton> : null}
              {inspectorMenuOpen !== true ? <IconButton
                color="inherit"
                aria-label="open add element"
                onClick={()=>{setInspectorMenuOpen(!inspectorMenuOpen)}}
                edge="end"
                className={classes.inspectorButton}
              >
                <InfoOutlinedIcon />
              </IconButton> : null}
            </Toolbar>
          </AppBar>
        </main>
        {inspectorMenuOpen === true ? <Inspector/> : null}
        {editorMenuOpen === true ? <Editor/> : null}
    </div>
  )
}

AppView.whyDidYouRender = true;

export default memo(AppView);
