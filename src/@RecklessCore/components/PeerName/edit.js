import { memo } from 'react';

import { TextField } from '@material-ui/core';

const PeerNameView = ({ value, onNameUpdate }) => {
  return (
    <TextField id="standard-basic" label="Edit name" value={value} onChange={onNameUpdate} />
  );
}

PeerNameView.whyDidYouRender = true;

export default memo(PeerNameView);