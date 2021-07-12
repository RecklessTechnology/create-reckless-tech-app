import { useEffect } from 'react';

import useAppContext from '../../../contexts/useAppContext';
import useDevicesContext from '../../../contexts/useDevicesContext';
import useGeneratorsContext from '../../../contexts/useGeneratorsContext';
import useTransformContext from '../../../contexts/useTransformContext';

const MultiplyTransform = ({ ...props }) => {
  const { uuid, setValue: setTransValue } = useTransformContext();
  const { sceneJSON } = useAppContext();
  
  const { connections} = sceneJSON;

  const { findGenerator } = useGeneratorsContext();
  const { findDevice } = useDevicesContext();
  
  // Inputs
  useEffect(()=>{
    const updateFromInput = (prop, val)=>{
      switch(prop) {
        default:
          break;
        case 'value':
          setTransValue(val.map((v)=>(v*props.value)));
          break;
      }
    };

    connections.filter((c)=>(c.to===uuid)).forEach((c)=>{
      const gen = findGenerator(c.from);
      if (gen) { gen.subscribe(`${c.fromProp}-updated`, (val)=>{updateFromInput(c.toProp, val)}) }

      const device = findDevice(c.from);
      if (device) { device.subscribe(`${c.fromProp}-updated`, (val)=>{updateFromInput(c.toProp, val)}) }
    })
  }, [connections, uuid, findGenerator, findDevice, props, setTransValue])
  
  return null;
}

MultiplyTransform.whyDidYouRender = false;

export default MultiplyTransform;