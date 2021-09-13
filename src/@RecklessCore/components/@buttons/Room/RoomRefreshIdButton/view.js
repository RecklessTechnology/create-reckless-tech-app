/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core';

import RefreshIcon from '@material-ui/icons/Refresh';

import generateRoomId from '../../../../utils/generateRoomId';

import IconButtonView from '../../IconButton/view';

const useStyles = makeStyles(() => ({
  iconButton: {
    margin: '0px 27.66px',
  },
}));

const RoomRefreshIdButtonView = ({ setRoomInfo }) => {
  const classes = useStyles();
  return (
    <IconButtonView
      {...{
        label: 'Refresh Room ID',
        handeClick: () => {
          setRoomInfo({
            id: generateRoomId(),
          });
        },
      }}
      className={classes.iconButton}
    >
      <RefreshIcon fontSize="small" />
    </IconButtonView>
  );
};

RoomRefreshIdButtonView.whyDidYouRender = true;

RoomRefreshIdButtonView.propTypes = {
  setRoomInfo: PropTypes.func.isRequired,
};

export default memo(RoomRefreshIdButtonView);
