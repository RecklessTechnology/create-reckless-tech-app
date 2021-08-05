import { memo } from 'react';

import { ListItemText } from '@material-ui/core';

const ObjectName = ({ name }) => (
  <ListItemText primary={name} />
);

ObjectName.whyDidYouRender = true;

export default memo(ObjectName);
