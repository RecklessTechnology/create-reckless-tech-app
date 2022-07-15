import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core';

import RefreshIcon from '@material-ui/icons/Refresh';

import generateRoomId from '../../../../Utils/generateRoomId';

import IconButtonView from '../../../../Components/IconButton/view';

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
        onClick: () => {
          setRoomInfo({
            id: generateRoomId(),
          });
        },
      }}
      className={classes.iconButton}
      disabled={false}
    >
      <RefreshIcon fontSize="small" />
    </IconButtonView>
  );
};

RoomRefreshIdButtonView.whyDidYouRender = (process.env.NODE_ENV === 'development');

RoomRefreshIdButtonView.propTypes = {
  setRoomInfo: PropTypes.func.isRequired,
};

export default memo(RoomRefreshIdButtonView);
