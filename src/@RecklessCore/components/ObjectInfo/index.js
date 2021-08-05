import { memo } from 'react';

import { ListItem, ListItemSecondaryAction } from '@material-ui/core';

import ObjectName from '../ObjectName';
import ObjectDisableButtton from '../ObjectDisableButton';

const ObjectInfo = ({ name }) => (
  <ListItem>
    <ObjectName {...{ name }} />
    <ListItemSecondaryAction>
      <ObjectDisableButtton {...{ name }} />
    </ListItemSecondaryAction>
  </ListItem>
);

ObjectInfo.whyDidYouRender = true;

export default memo(ObjectInfo);
