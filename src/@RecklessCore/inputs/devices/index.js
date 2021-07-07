import { useMemo } from 'react'

import useAppContext from '../../contexts/useAppContext';
import useThreeObjectContext from '../../contexts/useThreeObjectContext';


const Devices = ({ children }) => {
  const { uuid } = useThreeObjectContext();
  const { sceneJSON } = useAppContext();
  const { devices, connections } = sceneJSON;

  const devs = useMemo(()=>{
        return connections.filter((conn)=>conn.to===uuid).map((conn)=>devices.filter((gen)=>gen.uuid===conn.from)[0]).filter(x => x !== undefined);
  },[connections, devices, uuid]);
  
  return (<group>{devs.map((props)=>{
    switch(props.type) {
      default:
        return null
    }
  })}
  {children}
  </group>);
}

export default Devices;