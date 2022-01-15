import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles, Link } from '@material-ui/core';

import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import IconButtonView from '../../../../Components/Buttons/IconButton/view';

const useStyles = makeStyles(() => ({
  iconButton: {
    margin: '0px 27.66px',
  },
}));

const RoomOpenUrlButtonView = ({ url }) => {
  const classes = useStyles();
  return (
    <Link href={url} target="_blank" rel="noopener">
      <IconButtonView
        {...{
          label: 'Open URL',
          handeClick: () => {
          },
        }}
        className={classes.iconButton}
        disabled={false}
      >
        <OpenInNewIcon fontSize="small" />
      </IconButtonView>
    </Link>
  );
};
RoomOpenUrlButtonView.whyDidYouRender = (process.env.NODE_ENV === 'development');

RoomOpenUrlButtonView.propTypes = {
  url: PropTypes.string.isRequired,
};

export default memo(RoomOpenUrlButtonView);
