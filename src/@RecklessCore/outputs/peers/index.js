import { memo } from 'react'

// import useThreeObjectContext from '../../contexts/useThreeObjectContext';

// import PeersOutputView from './view';

const PeersOutputs = ({peers, connections}) => {
  // const { uuid } = useThreeObjectContext();
  // const conns = useMemo(()=>{
  //   return connections.filter((conn)=>conn.to===uuid)
  // }, [connections, uuid]);

  // const prs = useMemo(()=>{
  //       return conns.map((conn)=>peers.filter((peer)=>peer.uuid===conn.from)[0]).filter(x => x !== undefined);
  // },[conns, peers]);

  // // useEffect(()=>{
  // //   if (connections.length > 0 || peers.length > 0) {
  // //     console.log(connections, peers);
  // //   }
  // // }, [connections, peers]);

  // return (conns.length === 0 || prs.length === 0) ? null : prs.map((props)=>{
  //   return conns.map((conn)=>{
  //     const key = `rt_${props.type}_peer_${conn.uuid}_${conn.from}_${conn.fromProp}_${conn.to}_${conn.toProp}`;
  //     return null;
  //     // return (<PeersOutputView key={key} {...{props: props, connection: conn }}/>);
  //   })
  // });
  return null;
}

PeersOutputs.whyDidYouRender = false;

export default memo(PeersOutputs);