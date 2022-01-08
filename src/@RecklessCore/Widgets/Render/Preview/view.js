import PropTypes from 'prop-types';

import React, {
  useEffect, useRef, useState, useCallback,
  memo,
} from 'react';
import {
  makeStyles, Card, CardActionArea, CardContent, Typography,
} from '@material-ui/core';

import useAppContext from '../../../App/Contexts/useAppContext';
import useWidgetContext from '../../Contexts/useWidgetContext';

import VideoPlayer from './VideoPlayer';
import Canvas from './Canvas';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    width: (props) => {
      switch (props.size.toLowerCase()) {
        default:
        case 'small':
          return '15%';
        case 'medium':
          return '30%';
        case 'large':
          return '45%';
        case 'huge':
          return '60%';
        case 'fullscreen':
          return '100%';
      }
    },
    right: (props) => {
      switch (props.location.split('-')[1].toLowerCase()) {
        default:
        case 'right':
          return 0;
        case 'left':
          return 'auto';
      }
    },
  },
  content: {
    paddingBottom: '5px',
  },
});

const CameraPreview = ({
  name, size, location, uuid,
}) => {
  const classes = useStyles({ size, location });

  const { subscribe, unsubscribe } = useAppContext();

  const { previewStream, poses } = useWidgetContext();

  const isMounted = useRef(false);

  const [stream, setStream] = useState(previewStream);
  const [poseList, setPoseList] = useState(poses);
  const [dim, setDim] = useState();

  const previewRef = useRef(null);

  const updateStream = useCallback((val) => {
    if (isMounted.current) {
      setStream(val);
    }
  }, [isMounted, setStream]);

  const updatePoses = useCallback((val) => {
    if (isMounted.current) {
      setPoseList(val);
    }
  }, [isMounted, setPoseList]);

  useEffect(() => {
    isMounted.current = true;
    subscribe(`${uuid}-mediastream-updated`, updateStream);
    // eslint-disable-next-line no-console
    subscribe(`${uuid}-poses-updated`, updatePoses);

    return () => {
      isMounted.current = false;
      unsubscribe(`${uuid}-mediastream-updated`, updateStream);
    };
  }, [subscribe, unsubscribe, updatePoses, updateStream, uuid]);

  useEffect(() => {
    if (previewRef.current) {
      setDim([previewRef.current.offsetWidth, previewRef.current.offsetHeight]);
    }
  }, [previewRef, setDim, stream]);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent className={classes.content}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              minWidth: '100%',
              height: '100%',
              minHeight: '100%',
              border: '1px solid white',
            }}
            ref={previewRef}
          >
            { stream !== undefined ? <VideoPlayer stream={stream} /> : null }
            { poseList !== undefined ? <Canvas dim={dim} poses={poseList} /> : null }
          </div>
          <Typography variant="body2" color="textSecondary" component="p">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

CameraPreview.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
};

export default memo(CameraPreview);
