import { useMemo } from 'react'

import useRecklessObject from '../@RecklessCore/useRecklessObject';
import useAppContext from '../@RecklessCore/useAppContext';

export default function Inputs(props) {
  const { uuid } = useRecklessObject();
  const { sceneJSON } = useAppContext();
  const { inputs, connections } = sceneJSON;

  const inps = useMemo(()=>{
        return connections.filter((conn)=>conn.to===uuid).map((conn)=>inputs.filter((gen)=>gen.uuid===conn.from)[0]).filter(x => x !== undefined);
  },[connections, inputs, uuid]);
  
  return (inps.map((inp)=>{
    switch(inp.type) {
        default:
            return null;
    }
  }));
}
