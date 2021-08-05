import { memo } from 'react';

import { IconButton } from '@material-ui/core';

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const ObjectDisableButttonView = ({ disabled, setDisabled }) => (
  <IconButton
    edge="end"
    aria-label="disabled"
    onClick={() => {
      setDisabled(!disabled);
    }}
  >
    { !disabled ? <VisibilityIcon /> : <VisibilityOffIcon /> }
  </IconButton>
);

ObjectDisableButttonView.whyDidYouRender = true;

export default memo(ObjectDisableButttonView);
