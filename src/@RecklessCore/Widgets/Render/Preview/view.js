import PropTypes from 'prop-types';

import React, {
  useEffect, useRef, useState, useCallback,
} from 'react';
import {
  makeStyles, Card, CardActionArea, CardContent, Typography,
} from '@material-ui/core';

import useAppContext from '../../../App/Contexts/useAppContext';
import useWidgetContext from '../../Contexts/useWidgetContext';

import VideoPlayer from './VideoPlayer';

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

  const { previewStream } = useWidgetContext();

  const isMounted = useRef(false);

  const [stream, setStream] = useState(previewStream);

  const updateProp = useCallback((val) => {
    if (isMounted.current) {
      setStream(val);
    }
  }, [isMounted, setStream]);

  useEffect(() => {
    isMounted.current = true;
    subscribe(`${uuid}-mediastream-updated`, updateProp);

    return () => {
      isMounted.current = false;
      unsubscribe(`${uuid}-mediastream-updated`, updateProp);
    };
  }, [subscribe, unsubscribe, updateProp, uuid]);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent className={classes.content}>
          { stream !== undefined ? <VideoPlayer stream={stream} /> : null }
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

export default CameraPreview;
