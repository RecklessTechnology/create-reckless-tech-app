import React, {
  memo, createRef, useEffect,
} from 'react';

import PropTypes from 'prop-types';

const VideoPlayer = ({ stream }) => {
  const videoRef = createRef();

  useEffect(() => {
    if (videoRef.current.srcObject !== stream) {
      videoRef.current.srcObject = null;
    }
    videoRef.current.srcObject = stream;
  }, [stream, videoRef]);

  return (
    <video width="100%" height="100%" ref={videoRef} autoPlay playsInline muted />
  );
};

VideoPlayer.propTypes = {
  stream: PropTypes.shape({}).isRequired,
};

export default memo(VideoPlayer);
