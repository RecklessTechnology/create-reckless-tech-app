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
  size: 3,
  location: 0,
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

  const [uuid] = useState(props.uuid || DefaultProps.uuid);
  const [name] = useState(props.name || DefaultProps.name);
  const [type, setType] = useState(props.type || DefaultProps.type);
  const [size, setSize] = useState(props.size || DefaultProps.size);
  const [location, setLocation] = useState(props.location || DefaultProps.location);

  const [previewStream, setPreviewStream] = useState();
  const [poses, setPoses] = useState();

  // Inputs
  const updateFromInput = (prop, val) => {
    switch (prop.toLowerCase()) {
      default:
        break;
      case 'size':
        setSize(val);
        break;
      case 'location':
        setLocation(val);
        break;
      case 'poses':
        setPoses(val);
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
  useEffect(() => { publish(`${uuid}-poses-updated`, poses); }, [uuid, poses, publish]);
  useEffect(() => { publish(`${uuid}-size-updated`, size); }, [uuid, size, publish]);
  useEffect(() => { publish(`${uuid}-location-updated`, location); }, [uuid, location, publish]);

  const { registerWidget, unregisterWidget } = useWidgetsContext();
  const forceUpdate = useForceUpdate();

  // Reference to object properties
  const widgetRef = useMemo(() => ({
    uuid,
    id: identifier.current,

    name,

    type,
    setType,

    size,
    setSize,

    location,
    setLocation,

    previewStream,
    setPreviewStream,
  }), [
    uuid,
    name,

    type, setType,

    size, setSize,
    location, setLocation,

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

    size,
    setSize,

    location,
    setLocation,

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

    size, setSize,
    location, setLocation,

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
  size: PropTypes.number.isRequired,
  location: PropTypes.number.isRequired,
};

export default WidgetManager;
