import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import CreateIcon from '@material-ui/icons/Create';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import IconButtonView from '../../../../Components/Buttons/IconButton/view';

const useStyles = makeStyles(() => ({
  iconButton: {
    padding: '5px',
    marginLeft: '5px',
  },
}));

const EditPeerNameButtonView = ({ peerInfo, updateConnectionInfo }) => {
  // Create local classes
  const classes = useStyles();

  switch (peerInfo.mode.toLowerCase()) {
    default:
      // eslint-disable-next-line no-console
      console.log(`Unknown Mode: ${peerInfo.mode}`);
      return null;
    case 'view':
      return (
        <IconButtonView
          {...{
            label: 'Edit',
            handeClick: () => {
              updateConnectionInfo(peerInfo.uuid, 'cancel', { mode: 'edit' });
            },
          }}
          className={classes.iconButton}
          disabled={false}
        >
          <CreateIcon fontSize="small" />
        </IconButtonView>
      );
    case 'edit':
      return (
        <div>
          <IconButtonView
            {...{
              label: 'Cancel',
              handeClick: () => {
                updateConnectionInfo(peerInfo.uuid, 'cancel', { mode: 'view' });
              },
            }}
            className={classes.iconButton}
            disabled={false}
          >
            <CloseIcon fontSize="small" />
          </IconButtonView>
          <IconButtonView
            {...{
              label: 'Save',
              handeClick: () => {
                updateConnectionInfo(peerInfo.uuid, 'save', { mode: 'view' });
              },
            }}
            className={classes.iconButton}
            disabled={false}
          >
            <CheckIcon fontSize="small" />
          </IconButtonView>
        </div>
      );
  }
};

EditPeerNameButtonView.whyDidYouRender = (process.env.NODE_ENV === 'development');

EditPeerNameButtonView.propTypes = {
  peerInfo: PropTypes.shape({
    mode: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
  }).isRequired,
  updateConnectionInfo: PropTypes.func.isRequired,
};

export default memo(EditPeerNameButtonView);
