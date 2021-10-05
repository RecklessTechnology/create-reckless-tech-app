import { useCallback, useEffect } from 'react';

import useAppContext from '../../../contexts/useAppContext';
import useDevicesContext from '../../../contexts/useDevicesContext';
import useGeneratorsContext from '../../../contexts/useGeneratorsContext';
import useTransformContext from '../../../contexts/useTransformContext';

const CalculatorTransform = () => {
  const {
    uuid, setValue: setTransValue, amount, operator,
  } = useTransformContext();
  const { sceneJSON } = useAppContext();

  const { connections } = sceneJSON;

  const { findGenerator } = useGeneratorsContext();
  const { findDevice } = useDevicesContext();

  const calculate = useCallback((v) => {
    switch (operator) {
      default:
      case 'Add':
        return (v + amount);
      case 'Subtract':
        return (v - amount);
      case 'Multiply':
        return (v * amount);
      case 'Divide':
        return (v / amount);
    }
  }, [amount, operator]);

  // Inputs
  useEffect(() => {
    const updateFromInput = (prop, val) => {
      switch (prop) {
        default:
          break;
        case 'value':
          setTransValue(val.map(calculate));
          break;
      }
    };

    connections.filter((c) => (c.to === uuid)).forEach((c) => {
      const gen = findGenerator(c.from);
      if (gen) { gen.subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); }); }

      const device = findDevice(c.from);
      if (device) { device.subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); }); }
    });
  }, [connections, uuid, findGenerator, findDevice, amount, setTransValue, calculate]);

  return null;
};

CalculatorTransform.whyDidYouRender = false;

export default CalculatorTransform;
