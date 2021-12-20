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
  children,
  ...props
}) => {
  const {
    sceneJSON, subscribe, unsubscribe, publish,
  } = useAppContext();
  const { connections } = sceneJSON;

  const identifier = useRef(Symbol('Transform'));
  const node = useRef(null);

  const [uuid] = useState(props.uuid);
  const [name] = useState(props.name);
  const [displayName] = useState(props.displayName);
  const [type, setType] = useState(props.type || 'calculator');

  const [amount, setAmount] = useState(props.amount || 1);
  const [value, setValue] = useState(props.value || [0, 0, 0]);
  const [operator, setOperator] = useState(props.operator || 'Add');

  // Inputs
  const updateFromInput = useCallback((prop, val) => {
    switch (prop.toLowerCase()) {
      default:
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
  }), [
    uuid,
    name, displayName,

    type, setType,

    value, setValue,
    amount, setAmount,
    operator, setOperator,
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
