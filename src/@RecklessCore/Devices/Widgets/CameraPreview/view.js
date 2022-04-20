import PropTypes from 'prop-types';

import clsx from 'clsx';

import React, {
  memo, useRef,
  // useEffect, useState,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardContent,
} from '@material-ui/core';

import VideoPlayer from '../../../Components/VideoPlayer';

const useStyles = makeStyles(() => ({
  root: {
    pointerEvents: 'all',
    height: '100%',
    position: 'relative',
  },
  details: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  detailText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  content: {
    width: '100%',
    zIndex: 1,
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    height: '100%',
  },
  glassBackground: {
    /* From https://css.glass */
    background: 'rgba(255, 255, 255, 0.05)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(2px)',
  },
  videoContainer: {
    position: 'relative',
    width: '100%',
    minWidth: '100%',
    height: '100%',
    minHeight: '100%',
    border: '1px solid white',
  },
  controls: {
    width: '100%',
    zIndex: 1,
    bottom: 30,
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
  },
}));

const CameraPreviewView = ({
  stream = {},
}) => {
  const classes = useStyles();
  const previewRef = useRef();
  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={clsx(classes.content, classes.glassBackground)}>
          <div
            className={classes.videoContainer}
            ref={previewRef}
          >
            {/* eslint-disable-next-line react/jsx-no-undef */}
            { stream !== {} ? <VideoPlayer stream={stream} /> : null }
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

CameraPreviewView.propTypes = {
  stream: PropTypes.shape({}).isRequired,
};

export default memo(CameraPreviewView);
