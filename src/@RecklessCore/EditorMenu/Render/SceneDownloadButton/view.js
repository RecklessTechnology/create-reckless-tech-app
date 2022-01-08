import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core';

import GetAppIcon from '@material-ui/icons/GetApp';

import IconButtonView from '../../../Components/Buttons/IconButton/view';

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
          // eslint-disable-next-line no-undef
          const link = document.createElement('a');
          link.download = 'RT_Scene.json';
          link.href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(sceneJSON))}`;
          link.click();
        },
      }}
      className={classes.menuButton}
      disabled={false}
    >
      <GetAppIcon fontSize="small" />
    </IconButtonView>
  );
};

SceneDownloadButttonView.whyDidYouRender = (process.env.NODE_ENV === 'development');

SceneDownloadButttonView.propTypes = {
  sceneJSON: PropTypes.shape({}).isRequired,
};

export default memo(SceneDownloadButttonView);
