import { memo, useMemo } from 'react'

import useThreeObjectContext from '../../contexts/useThreeObjectContext';

import PeersView from './view';

const Peers = ({peers, connections}) => {
  const { uuid } = useThreeObjectContext();
  const conns = useMemo(()=>{
    return connections.filter((conn)=>conn.to===uuid)
  }, [connections, uuid]);

  const prs = useMemo(()=>{
        return conns.map((conn)=>peers.filter((peer)=>peer.uuid===conn.from)[0]).filter(x => x !== undefined);
  },[conns, peers]);

  return (conns.length === 0 || prs.length === 0) ? null : prs.map((props)=>{
    return conns.map((conn)=>{
      const key = `rt_${props.type}_peer_${conn.uuid}_${conn.from}_${conn.fromProp}_${conn.to}_${conn.toProp}`;
      return (<PeersView key={key} {...{props: props, connection: conn }}/>);
    })
  });
  
}

Peers.whyDidYouRender = false;

export default memo(Peers);