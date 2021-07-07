import { memo } from 'react';

import { ListItemText } from '@material-ui/core';

const PatchDetails = ({ name, type}) => {
  return <ListItemText primary={name} secondary={type}></ListItemText>;
}

export default memo(PatchDetails);