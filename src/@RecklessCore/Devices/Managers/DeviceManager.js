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

import useDevicesContext from '../Contexts/useDevicesContext';
import useAppContext from '../../App/Contexts/useAppContext';

export const DeviceContext = createContext(null);

export const DefaultProps = {
  uuid: 'xxx',
  name: 'unnamed',
  type: '',
  position: [0, 0, 0],
  active: false,
  deviceList: [{}],
  selectedDevice: {},
};

const DeviceManager = ({
  children,
  uuid: passedUUID,
  name: passedName,
  type: passedType,
  position: passedPosition,
  active: passedActive,
  deviceList: passedDeviceList,
  selectedDevice: passedSelectedDevice,
}) => {
  const {
    sceneJSON, subscribe, unsubscribe, publish,
  } = useAppContext();
  const { connections } = sceneJSON;

  const identifier = useRef(Symbol('device'));
  const node = useRef(null);

  const [uuid] = useState(passedUUID);
  const [name] = useState(passedName);

  const [type, setType] = useState(passedType || '');
  const [position, setPosition] = useState(passedPosition || [0, 0, 0]);
  const [mediaStream, setMediaStream] = useState();

  const [active, setActive] = useState(passedActive || false);
  const [deviceList, setDeviceList] = useState(passedDeviceList || []);
  const [selectedDevice, setSelectedDevice] = useState(passedSelectedDevice || deviceList[0]);

  // Inputs
  const updateFromInput = (prop, val) => {
    switch (prop.toLowerCase()) {
      default:
        break;
      case 'position':
        setPosition(val);
        break;
      case 'mediastream':
        setMediaStream(val);
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
  useEffect(() => { publish(`${uuid}-position-updated`, position); }, [uuid, position, publish]);
  useEffect(() => { publish(`${uuid}-mediastream-updated`, mediaStream); }, [uuid, mediaStream, publish]);

  useEffect(() => { publish(`${uuid}-active-updated`, active); }, [uuid, active, publish]);
  useEffect(() => { publish(`${uuid}-selected-device-updated`, selectedDevice); }, [uuid, selectedDevice, publish]);
  useEffect(() => { publish(`${uuid}-device-list-updated`, deviceList); if (selectedDevice.deviceId === undefined) { setSelectedDevice(deviceList[0]); } }, [uuid, deviceList, publish, setSelectedDevice, selectedDevice]);

  const { registerDevice, unregisterDevice } = useDevicesContext();
  const forceUpdate = useForceUpdate();

  // Reference to object properties
  const deviceRef = useMemo(() => ({
    uuid,
    id: identifier.current,

    name,

    type,
    setType,

    position,
    setPosition,

    mediaStream,
    setMediaStream,

    active,
    setActive,
    selectedDevice,
    setSelectedDevice,
    deviceList,
    setDeviceList,
  }), [
    uuid,
    name,

    type, setType,

    position, setPosition,
    mediaStream, setMediaStream,

    active, setActive,
    selectedDevice, setSelectedDevice,
    deviceList, setDeviceList,
  ]);

  // Callback to fetch properties of object
  const getRef = useCallback(() => deviceRef, [deviceRef]);

  // On load, register object with app context

  useEffect(() => {
    registerDevice(uuid, deviceRef);
    return () => unregisterDevice(uuid, deviceRef);
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

    position,
    setPosition,

    mediaStream,
    setMediaStream,

    active,
    setActive,
    selectedDevice,
    setSelectedDevice,
    deviceList,
    setDeviceList,

    forceUpdate,
  }),
  [
    uuid,
    identifier,
    name,
    node,
    getRef,

    type, setType,
    position, setPosition,
    mediaStream, setMediaStream,

    active, setActive,
    selectedDevice, setSelectedDevice,
    deviceList, setDeviceList,

    forceUpdate,
  ]);

  return (
    <DeviceContext.Provider value={contextValue}>
      {children}
    </DeviceContext.Provider>
  );
};

DeviceManager.whyDidYouRender = (process.env.NODE_ENV === 'development');

DeviceManager.propTypes = {
  children: PropTypes.node.isRequired,
  uuid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  active: PropTypes.bool.isRequired,
  deviceList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedDevice: PropTypes.shape({
    deviceId: PropTypes.string,
  }).isRequired,
};

export default DeviceManager;
