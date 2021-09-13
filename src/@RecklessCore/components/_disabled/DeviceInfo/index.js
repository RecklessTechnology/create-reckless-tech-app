/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { memo, useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/styles';

import { ListItem } from '@material-ui/core';

import DeviceName from '../DeviceName';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: 0,
  },
  buttons: {
    right: 0,
  },
}));

const DeviceInfo = ({ deviceInfo }) => {
  const classes = useStyles();

  const [deviceName, setDeviceName] = useState('');

  useEffect(() => {
    if (deviceInfo) {
      setDeviceName(deviceInfo.name);
    }
  }, [deviceInfo, setDeviceName]);

  if (!deviceInfo) { return null; }

  return (
    <ListItem dense className={classes.listItem} alignItems="flex-start">
      <DeviceName {...{ deviceInfo: { ...deviceInfo, name: deviceName } }} />
    </ListItem>
  );
};

DeviceInfo.whyDidYouRender = true;

export default memo(DeviceInfo);
