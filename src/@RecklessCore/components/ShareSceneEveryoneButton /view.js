/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { memo } from 'react';

import { makeStyles } from '@material-ui/core';

import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';

import IconButtonView from '../@buttons/IconButton/view';

const useStyles = makeStyles(() => ({
  iconButton: {
    padding: '5px',
    marginLeft: '5px',
  },
}));

const ShareSceneEveryoneButtonView = ({ me, sceneJSON }) => {
  const classes = useStyles();
  return (
    <IconButtonView
      {...{
        label: 'Share Scene',
        handeClick: () => {
          // broadcast ping to everyone
          me.sendData({
            type: 'shareScene', payload: sceneJSON, from: me.connectionId, timestamp: Date.now,
          });
        },
      }}
      className={classes.iconButton}
    >
      <OpenInBrowserIcon fontSize="small" />
    </IconButtonView>

  );
};

ShareSceneEveryoneButtonView.whyDidYouRender = true;

export default memo(ShareSceneEveryoneButtonView);
