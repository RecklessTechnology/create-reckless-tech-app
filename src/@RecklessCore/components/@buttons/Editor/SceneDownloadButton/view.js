/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core';

import GetAppIcon from '@material-ui/icons/GetApp';

import IconButtonView from '../../IconButton/view';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const SceneDownloadButttonView = ({ sceneJSON }) => {
  const classes = useStyles();
  return (
    <IconButtonView
      {...{
        label: 'Download Scene',
        handeClick: () => {
          const link = document.createElement('a');
          link.download = 'RT_Scene.json';
          link.href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(sceneJSON))}`;
          link.click();
        },
      }}
      className={classes.menuButton}
    >
      <GetAppIcon fontSize="small" />
    </IconButtonView>
  );
};

SceneDownloadButttonView.whyDidYouRender = true;

SceneDownloadButttonView.propTypes = {
  sceneJSON: PropTypes.shape({}).isRequired,
};

export default memo(SceneDownloadButttonView);
