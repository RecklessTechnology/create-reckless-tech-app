import PropTypes from 'prop-types';

import React, {
  memo, useState, useRef, useEffect,
} from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
  Menu, MenuItem,
} from '@material-ui/core';

import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';

import testJSON from '../../../../../scenes/TestScene.json';
import posenetJSON from '../../../../../scenes/PosenetScene.json';
import useAppContext from '../../../../App/Contexts/useAppContext';

import IconButtonView from '../../../../Components/Buttons/IconButton/view';

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
  const { uuid: meUUID, connectionId: meConnectionId } = me;
  const { sendData, connectionId, isMe } = peerInfo;
  const { sceneJSON } = useAppContext();
  const buttonRef = useRef(null);

  // Create local classes
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (buttonRef.current !== undefined) {
      setAnchorEl(buttonRef.current);
    }
  }, [buttonRef, setAnchorEl]);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = (e) => {
    const { menuValue } = e.currentTarget.dataset;
    let json = {};
    switch (menuValue.toLowerCase()) {
      default:
        // eslint-disable-next-line no-console
        console.log(`Menu Selection Not Found: ${menuValue}`);
        break;
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
    if (typeof sendData === 'function') {
      sendData({
        type: 'shareScene', payload: json, uuid: meUUID, from: meConnectionId, timestamp: Date.now,
      }, connectionId);
    }
    setAnchorEl(null);
  };

  return (
    <div style={{ display: 'block' }}>
      <IconButtonView
        {...{
          label: isMe ? 'Share Scene With Everyone' : 'Share Scene',
          onClick: (evt) => {
            openMenu(evt);
          },
        }}
        className={classes.iconButton}
        disabled={false}
      >
        <OpenInBrowserIcon fontSize="small" />
      </IconButtonView>
      <Menu
        className={classes.sceneMenu}
        id="scene-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={closeMenu}
      >
        <MenuItem dense data-menu-value="mine" onClick={closeMenu}>My Scene</MenuItem>
        <MenuItem dense data-menu-value="test" onClick={closeMenu}>Test Scene</MenuItem>
        <MenuItem dense data-menu-value="posenet" onClick={closeMenu}>Posenet</MenuItem>
      </Menu>
    </div>
  );
};

ShareScenePeerButtonView.whyDidYouRender = (process.env.NODE_ENV === 'development');

ShareScenePeerButtonView.propTypes = {
  me: PropTypes.shape({
    uuid: PropTypes.string,
    connectionId: PropTypes.string,
  }).isRequired,
  peerInfo: PropTypes.shape({
    sendData: PropTypes.func,
    connectionId: PropTypes.string,
    isMe: PropTypes.bool,
  }).isRequired,
};

export default memo(ShareScenePeerButtonView);
