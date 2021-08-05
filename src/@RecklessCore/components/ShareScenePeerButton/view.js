/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, {
  memo, useState, useRef, useEffect,
} from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
  IconButton, Tooltip, Menu, MenuItem,
} from '@material-ui/core';

import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';

import testJSON from '../../sceneDefinitions/TestScene.json';
import posenetJSON from '../../sceneDefinitions/PosenetScene.json';
import useAppContext from '../../contexts/useAppContext';

const useStyles = makeStyles(() => ({
  iconButton: {
    padding: '5px',
    marginLeft: '5px',
    position: 'relative',
  },
  sceneMenu: {
    left: 100,
  },
}));

const ShareScenePeerButtonView = ({ me, peerInfo }) => {
  const { sceneJSON } = useAppContext();
  const buttonRef = useRef(null);

  // Create local classes
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (buttonRef.current !== undefined) {
      setAnchorEl(buttonRef.current);
    }
  }, [buttonRef, setAnchorEl]);

  const handleClick = () => {
    setMenuOpen(true);
  };

  const handleClose = (e) => {
    const { menuValue } = e.currentTarget.dataset;
    let json = {};
    switch (menuValue) {
      default:
      case 'my':
        json = sceneJSON;
        break;
      case 'test':
        json = testJSON;
        break;
      case 'posenet':
        json = posenetJSON;
        break;
    }
    if (typeof peerInfo.sendData === 'function') {
      peerInfo.sendData({
        type: 'shareScene', payload: json, uuid: me.uuid, from: me.connectionId, timestamp: Date.now,
      }, peerInfo.connectionId);
    }
    setMenuOpen(false);
  };
  return (
    <div style={{ display: 'block' }}>
      <Tooltip title={peerInfo.isMe ? 'Share Scene With Everyone' : 'Share Scene'} aria-label="Share Scene">
        <IconButton ref={buttonRef} className={classes.iconButton} onClick={handleClick}>
          <OpenInBrowserIcon />
        </IconButton>
      </Tooltip>
      <Menu
        className={classes.sceneMenu}
        id="scene-menu"
        anchorEl={anchorEl}
        keepMounted
        open={menuOpen}
        onClose={handleClose}
      >
        <MenuItem data-menu-value="mine" onClick={handleClose}>My Scene</MenuItem>
        <MenuItem data-menu-value="test" onClick={handleClose}>Test Scene</MenuItem>
        <MenuItem data-menu-value="posenet" onClick={handleClose}>Posenet</MenuItem>
      </Menu>
    </div>
  );
};

ShareScenePeerButtonView.whyDidYouRender = true;

export default memo(ShareScenePeerButtonView);
