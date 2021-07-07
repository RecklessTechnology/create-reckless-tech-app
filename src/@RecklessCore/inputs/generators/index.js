import { memo, useMemo } from 'react'
import useThreeObjectContext from '../../contexts/useThreeObjectContext';

import GeneratorsView from './view';

const Generators = ({generators, connections}) => {
  const { uuid } = useThreeObjectContext();
  const conns = useMemo(()=>{
    return connections.filter((conn)=>conn.to===uuid)
  }, [connections, uuid]);

  const gens = useMemo(()=>{
        return conns.map((conn)=>generators.filter((gen)=>gen.uuid===conn.from)[0]).filter(x => x !== undefined);
  },[conns, generators]);

  return (conns.length === 0 || gens.length === 0) ? null : gens.map((props)=>{
    return conns.map((conn)=>{
      const key = `rt_${props.type}_generator_${conn.uuid}_${conn.from}_${conn.fromProp}_${conn.to}_${conn.toProp}`;
      return (<GeneratorsView key={key} {...{props: props, connection: conn }}/>);
    })
  });
  
}

Generators.whyDidYouRender = false;

export default memo(Generators);