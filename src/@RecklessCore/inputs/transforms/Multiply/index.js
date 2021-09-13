import { useEffect } from 'react';

import useAppContext from '../../../contexts/useAppContext';
import useDevicesContext from '../../../contexts/useDevicesContext';
import useGeneratorsContext from '../../../contexts/useGeneratorsContext';
import useTransformContext from '../../../contexts/useTransformContext';

const MultiplyTransform = () => {
  const { uuid, setValue: setTransValue, amount } = useTransformContext();
  const { sceneJSON } = useAppContext();

  const { connections } = sceneJSON;

  const { findGenerator } = useGeneratorsContext();
  const { findDevice } = useDevicesContext();

  // Inputs
  useEffect(() => {
    const updateFromInput = (prop, val) => {
      switch (prop) {
        default:
          break;
        case 'value':
          setTransValue(val.map((v) => (v * amount)));
          break;
      }
    };

    connections.filter((c) => (c.to === uuid)).forEach((c) => {
      const gen = findGenerator(c.from);
      if (gen) { gen.subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); }); }

      const device = findDevice(c.from);
      if (device) { device.subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); }); }
    });
  }, [connections, uuid, findGenerator, findDevice, amount, setTransValue]);

  return null;
};

MultiplyTransform.whyDidYouRender = false;

export default MultiplyTransform;
