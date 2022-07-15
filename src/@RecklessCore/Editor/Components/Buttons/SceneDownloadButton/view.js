import PropTypes from 'prop-types';

import React, { memo, useContext } from 'react';

import { makeStyles } from '@material-ui/core';

import GetAppIcon from '@material-ui/icons/GetApp';

import ButtonView from '../../../../Components/Button/view';

import { RTPopoverContext } from '../../../../Components/Popover';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const SceneDownloadButttonView = ({ sceneJSON }) => {
  const classes = useStyles();
  const { close } = useContext(RTPopoverContext);
  return (
    <ButtonView
      {...{
        onClick: () => {
          // eslint-disable-next-line no-undef
          const link = document.createElement('a');
          link.download = 'RT_Scene.json';
          link.href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(sceneJSON))}`;
          link.click();
          close();
        },
      }}
      className={classes.menuButton}
      disabled={false}
      endIcon={<GetAppIcon fontSize="small" />}
    >
      Download Scene
    </ButtonView>
  );
};

SceneDownloadButttonView.whyDidYouRender = (process.env.NODE_ENV === 'development');

SceneDownloadButttonView.propTypes = {
  sceneJSON: PropTypes.shape({}).isRequired,
};

export default memo(SceneDownloadButttonView);
