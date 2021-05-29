import { useMemo } from 'react'

import OrbitGenerator from './OrbitGenerator';
import SinewaveGenerator from './SinewaveGenerator';

import useRecklessObject from '../@RecklessCore/useRecklessObject';
import useAppContext from '../@RecklessCore/useAppContext';

export default function Generators(props) {
  const { uuid } = useRecklessObject();
  const { sceneJSON } = useAppContext();
  const { generators, connections } = sceneJSON;

  const gens = useMemo(()=>{
        return connections.filter((conn)=>conn.to===uuid).map((conn)=>generators.filter((gen)=>gen.uuid===conn.from)[0]).filter(x => x !== undefined);
  },[connections, generators, uuid]);
  
  return (gens.map((gen)=>{
    switch(gen.type) {
      default:
      case 'Orbit':
        return <OrbitGenerator key={gen.uuid}/>;
      case 'Sinewave':
        return <SinewaveGenerator key={gen.uuid}/>;
    }
  }));
}
