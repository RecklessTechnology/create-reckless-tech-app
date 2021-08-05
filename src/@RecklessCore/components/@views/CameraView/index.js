/* eslint-disable react/jsx-filename-extension */

import React, { useRef } from 'react';
import useUserMedia from '../../../contexts/useUserMedia';

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: 'environment' },
};

const CameraView = () => {
  const videoRef = useRef();
  const mediaStream = useUserMedia(CAPTURE_OPTIONS);

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  function handleCanPlay() {
    videoRef.current.play();
  }

  return (
    <video width="100%" height="100%" ref={videoRef} onCanPlay={handleCanPlay} autoPlay playsInline muted />
  );
};

export default CameraView;
