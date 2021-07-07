import Peers from "../outputs/peers";

const Outputs = ({ sceneJSON }) => {
  const { peers, connections } = sceneJSON;
  return <Peers {...{peers, connections}} />
}

export default Outputs;