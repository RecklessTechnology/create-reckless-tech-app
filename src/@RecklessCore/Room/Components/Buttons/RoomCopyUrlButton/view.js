import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core';

import FileCopyIcon from '@material-ui/icons/FileCopy';

import IconButtonView from '../../../../Components/Buttons/IconButton/view';

const useStyles = makeStyles(() => ({
  iconButton: {
    margin: '0px 27.66px',
  },
}));

const RoomCopyUrlButtonView = ({ url }) => {
  const classes = useStyles();
  return (
    <IconButtonView
      {...{
        label: 'Copy URL',
        handeClick: () => {
          // eslint-disable-next-line no-undef
          navigator.clipboard.writeText(url).then();
        },
      }}
      className={classes.iconButton}
      disabled={false}
    >
      <FileCopyIcon fontSize="small" />
    </IconButtonView>
  );
};

RoomCopyUrlButtonView.whyDidYouRender = (process.env.NODE_ENV === 'development');

RoomCopyUrlButtonView.propTypes = {
  url: PropTypes.string.isRequired,
};

export default memo(RoomCopyUrlButtonView);
