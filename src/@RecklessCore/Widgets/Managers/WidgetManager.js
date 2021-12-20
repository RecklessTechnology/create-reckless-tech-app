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

import useWidgetsContext from '../Contexts/useWidgetsContext';
import useAppContext from '../../App/Contexts/useAppContext';

export const WidgetContext = createContext(null);

export const DefaultProps = {
  uuid: 'xxx',
  name: 'unnamed',
  type: 'widget',
};

const WidgetManager = ({
  children,
  ...props
}) => {
  const {
    sceneJSON, subscribe, unsubscribe, publish,
  } = useAppContext();
  const { connections } = sceneJSON;

  const identifier = useRef(Symbol('device'));
  const node = useRef(null);

  const [uuid] = useState(props.uuid);
  const [name] = useState(props.name);
  const [type, setType] = useState(props.type || '');

  const [previewStream, setPreviewStream] = useState();

  // Inputs
  const updateFromInput = (prop, val) => {
    switch (prop.toLowerCase()) {
      default:
        break;
      case 'mediastream':
        setPreviewStream(val);
        break;
    }
  };

  useEffect(() => {
    connections.filter((c) => (c.to === uuid)).forEach((c) => {
      subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); });
    });
    return () => {
      connections.filter((c) => (c.to === uuid)).forEach((c) => {
        unsubscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); });
      });
    };
  }, [connections, uuid, subscribe, unsubscribe]);

  // Outputs
  useEffect(() => { publish(`${uuid}-mediastream-updated`, previewStream); }, [uuid, previewStream, publish]);

  const { registerWidget, unregisterWidget } = useWidgetsContext();
  const forceUpdate = useForceUpdate();

  // Reference to object properties
  const widgetRef = useMemo(() => ({
    uuid,
    id: identifier.current,

    name,

    type,
    setType,

    previewStream,
    setPreviewStream,
  }), [
    uuid,
    name,

    type, setType,

    previewStream, setPreviewStream,
  ]);

  // Callback to fetch properties of object
  const getRef = useCallback(() => widgetRef, [widgetRef]);

  // On load, register object with app context

  useEffect(() => {
    registerWidget(uuid, widgetRef);
    return () => unregisterWidget(uuid, widgetRef);
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

    previewStream,
    setPreviewStream,

    forceUpdate,
  }),
  [
    uuid,
    identifier,
    name,
    node,
    getRef,

    type, setType,
    previewStream, setPreviewStream,

    forceUpdate,
  ]);

  return (
    <WidgetContext.Provider value={contextValue}>
      {children}
    </WidgetContext.Provider>
  );
};

WidgetManager.whyDidYouRender = (process.env.NODE_ENV === 'development');

WidgetManager.propTypes = {
  children: PropTypes.node.isRequired,
  uuid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default WidgetManager;
