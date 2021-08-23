/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { memo } from 'react';

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import IconButtonView from '../@buttons/IconButton/view';

const ObjectDisableButttonView = ({ disabled, setDisabled }) => (
  <IconButtonView {...{
    label: 'Close',
    handeClick: () => {
      setDisabled(!disabled);
    },
  }}
  >
    { !disabled ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" /> }
  </IconButtonView>
);

ObjectDisableButttonView.whyDidYouRender = true;

export default memo(ObjectDisableButttonView);
