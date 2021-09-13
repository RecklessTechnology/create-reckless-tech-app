/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { memo } from 'react';

import { makeStyles } from '@material-ui/core';

import AdjustIcon from '@material-ui/icons/Adjust';

import IconButtonView from '../@buttons/IconButton/view';

const useStyles = makeStyles(() => ({
  iconButton: {
    padding: '5px',
    marginLeft: '5px',
  },
}));

const PingEveryoneButtonView = ({ me }) => {
  const classes = useStyles();
  return (
    <IconButtonView
      {...{
        label: 'Ping Everyone',
        handeClick: () => {
          // broadcast ping to everyone
          setInterval(() => {
            me.sendData({
              type: 'ping', payload: {}, from: me.connectionId, timestamp: Date.now,
            });
          }, 1000 / 60);
        },
      }}
      className={classes.iconButton}
    >
      <AdjustIcon fontSize="small" />
    </IconButtonView>
  );
};

PingEveryoneButtonView.whyDidYouRender = true;

export default memo(PingEveryoneButtonView);
