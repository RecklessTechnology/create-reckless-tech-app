import PropTypes from 'prop-types';

import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
  createContext,
} from 'react';
import useForceUpdate from '../../Utils/useForceUpdate';

import useAppContext from '../../App/Contexts/useAppContext';
import useTransformsContext from '../Contexts/useTransformsContext';

export const TransformContext = createContext(null);
TransformContext.displayName = 'Transform Context';

export const DefaultProps = {
  uuid: 'xxx',
  name: 'unnamed',
  type: 'calculator',
  displayName: 'unnamed',
  amount: 1,
  value: '',
  operator: '',
};

const TransformManager = ({
  connections,
  children,
  ...props
}) => {
  const {
    subscribe, unsubscribe, publish,
  } = useAppContext();

  const [uuid] = useState(props.uuid);
  const [name] = useState(props.name);
  const [displayName] = useState(props.displayName);
  const [type, setType] = useState(props.type || 'calculator');

  const identifier = useRef(Symbol(`${type}-${uuid}`));
  const node = useRef(null);

  const [amount, setAmount] = useState(props.amount || 1);
  const [value, setValue] = useState(props.value || [0, 0, 0]);
  const [operator, setOperator] = useState(props.operator || 'Add');

  const [audio, setAudio] = useState(null);

  // Inputs
  const updateFromInput = useCallback((prop, val) => {
    switch (prop.toLowerCase()) {
      default:
        // eslint-disable-next-line no-console
        console.log(`Unknown Prop Sent to TransformManager: ${prop}`);
        break;
      case 'value':
        setValue(val);
        break;
      case 'audio':
        setAudio(val);
        break;
      case 'data':
        setValue(val);
        break;
    }
  }, [setValue]);

  useEffect(() => {
    connections.filter((c) => (c.to === uuid)).forEach((c) => {
      subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); });
    });
    return () => {
      connections.filter((c) => (c.to === uuid)).forEach((c) => {
        unsubscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); });
      });
    };
  }, [connections, uuid, subscribe, unsubscribe, updateFromInput]);

  useEffect(() => { publish(`${uuid}-value-updated`, value); }, [value, publish, uuid]);
  useEffect(() => { publish(`${uuid}-amount-updated`, amount); }, [amount, publish, uuid]);
  useEffect(() => { publish(`${uuid}-operator-updated`, operator); }, [operator, publish, uuid]);
  useEffect(() => { publish(`${uuid}-audio-updated`, audio); }, [audio, publish, uuid]);

  const { registerTransform, unregisterTransform } = useTransformsContext();
  const forceUpdate = useForceUpdate();

  // Reference to object properties
  const peerRef = useMemo(() => ({
    uuid,
    id: identifier.current,

    name,
    displayName,

    type,
    setType,

    value,
    setValue,

    amount,
    setAmount,

    operator,
    setOperator,

    audio,
    setAudio,
  }), [
    uuid,
    name, displayName,

    type, setType,

    value, setValue,
    amount, setAmount,
    operator, setOperator,

    audio, setAudio,
  ]);

  // Callback to fetch properties of object
  const getRef = useCallback(() => peerRef, [peerRef]);

  // On load, register object with app context
  useEffect(() => {
    // const id = identifier.current;
    registerTransform(uuid, peerRef);
    return () => unregisterTransform(uuid, peerRef);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Final context for provider
  const contextValue = useMemo(() => ({
    uuid,
    id: identifier.current,
    name,
    nodeRef: node,
    getRef,

    type,
    setType,

    value,
    setValue,

    amount,
    setAmount,

    operator,
    setOperator,

    audio,
    setAudio,

    forceUpdate,
  }),
  [
    uuid,
    identifier,
    name,
    node,
    getRef,

    type, setType,
    value, setValue,
    amount, setAmount,
    operator, setOperator,

    audio, setAudio,

    forceUpdate,
  ]);

  return (
    <TransformContext.Provider value={contextValue}>
      {children}
    </TransformContext.Provider>
  );
};

TransformManager.whyDidYouRender = (process.env.NODE_ENV === 'development');

TransformManager.propTypes = {
  children: PropTypes.node.isRequired,
};

TransformManager.propTypes = {
  connections: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  children: PropTypes.node.isRequired,
  uuid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  operator: PropTypes.string.isRequired,
};

export default TransformManager;
