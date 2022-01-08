import {
  useEffect, useState,
} from 'react';

import '@tensorflow/tfjs-backend-webgl';
import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';
import * as posedetection from '@tensorflow-models/pose-detection';

import { useFrame } from '@react-three/fiber';

import useAppContext from '../../../App/Contexts/useAppContext';
import useTransformContext from '../../Contexts/useTransformContext';

tfjsWasm.setWasmPaths(
  `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${
    tfjsWasm.version_wasm}/dist/`,
);

const createDetector = async (model, config) => posedetection.createDetector(
  model,
  config,
);

const TensorflowTransform = () => {
  const {
    uuid,
  } = useTransformContext();
  const {
    sceneJSON, subscribe, unsubscribe, publish,
  } = useAppContext();

  const { connections } = sceneJSON;

  const [detector, setDetector] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);

  const [frame, setFrame] = useState(null);
  const [poses, setPoses] = useState([]);

  useEffect(() => { publish(`${uuid}-poses-updated`, poses); }, [uuid, poses, publish]);

  useEffect(() => {
    createDetector(
      posedetection.SupportedModels.PoseNet,
      {
        quantBytes: 4,
        architecture: 'MobileNetV1',
        outputStride: 16,
        inputResolution: { width: 500, height: 500 },
        multiplier: 0.75,
      },
    ).then((d) => setDetector(d));
  }, [setDetector]);

  useEffect(() => {
    if (detector !== null && frame !== null) {
      // eslint-disable-next-line no-undef
      detector.estimatePoses(
        // eslint-disable-next-line no-undef
        frame,
        {
          maxPoses: 1,
          flipHorizontal: false,
        },
      ).then((p) => setPoses(p));
    }
  }, [detector, frame]);

  useFrame(() => {
    if (detector !== null && mediaStream !== undefined) {
      // eslint-disable-next-line no-undef
      new ImageCapture(mediaStream.getVideoTracks()[0]).grabFrame().then((img) => setFrame(img));
    }
  });

  // Inputs
  useEffect(() => {
    const updateFromInput = (prop, val) => {
      switch (prop.toLowerCase()) {
        default:
          break;
        case 'mediastream':
          setMediaStream(val);
          break;
      }
    };

    connections.filter((c) => (c.to === uuid)).forEach((c) => {
      subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); });
    });

    return () => {
      connections.filter((c) => (c.to === uuid)).forEach((c) => {
        unsubscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); });
      });
    };
  }, [connections, uuid, subscribe, unsubscribe, setMediaStream]);

  return null;
};

TensorflowTransform.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default TensorflowTransform;
