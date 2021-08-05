/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';

const useUserMedia = (requestedMedia) => {
  const [mediaStream, setMediaStream] = useState(null);

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(requestedMedia);
        setMediaStream(stream);
      } catch (err) {
        // Removed for brevity
      }
    }

    if (!mediaStream) {
      enableStream();
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      };
    }
    return mediaStream;
  }, [mediaStream, requestedMedia]);

  return mediaStream;
};

useUserMedia.propTypes = {
  requestedMedia: PropTypes.string.isRequired,
};

export default useUserMedia;
