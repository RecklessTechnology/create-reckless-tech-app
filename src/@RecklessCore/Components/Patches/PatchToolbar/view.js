import PropTypes from 'prop-types';

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Grid,
  ListItem,
  AppBar, Toolbar,
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';

import IconButtonView from '../../IconButton/view';

import ButtonView from '../../Button/view';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    // necessary for content to be below app bar
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    overflow: 'hidden',
    padding: 0,
  },
  toolbar: {
    padding: 0,
    minHeight: '32px',
  },
  appbar: {
    background: 'none',
  },
  group: {
    width: '100%',
    display: 'block',
  },
  button: {
    marginRight: 'auto',
    marginLeft: 'auto',
    display: 'block',
  },
  gridItem: {
    borderRight: '1px solid rgba(255,255,255,0.25)',
  },
}));

/**
 * Bottom Toolbar for Patches
 */
const PatchToolbarView = ({
  disabled = false,
  uuid = 'xxx',
  // eslint-disable-next-line no-unused-vars
  removeObj = (event) => {},
  // eslint-disable-next-line no-unused-vars
  hidePatch = (event) => {},
}) => {
  const classes = useStyles();
  return (
    <ListItem dense className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar
          variant="dense"
          className={classes.toolbar}
        >
          <Grid spacing={0} container>
            <Grid item xs={4} className={classes.gridItem} />
            <Grid item xs={4} className={classes.gridItem}>
              {(typeof hidePatch === 'function')
                ? (
                  <IconButtonView
                    {...{
                      disabled,
                      label: 'Hide Patch',
                      onClick: () => {
                        hidePatch(uuid, true);
                      },
                    }}
                    className={classes.button}
                    disabled={disabled}
                  >
                    <FontAwesomeIcon icon={faSignInAlt} />
                  </IconButtonView>
                )
                : <ButtonView className={classes.button} /> }
            </Grid>
            <Grid item xs={4}>
              <IconButtonView
                {...{
                  disabled,
                  label: 'Delete',
                  onClick: () => {
                    removeObj(uuid);
                  },
                }}
                className={classes.button}
                disabled={disabled}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </IconButtonView>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </ListItem>
  );
};

PatchToolbarView.propTypes = {
  /**
   * Disables Toolbar Buttons.
   */
  disabled: PropTypes.bool.isRequired,
  /**
   * Deletes Patch.
   */
  removeObj: PropTypes.func.isRequired,
  /**
   * Hides Patch.
   */
  hidePatch: PropTypes.func.isRequired,
  /**
  * Unique Patch ID.
  */
  uuid: PropTypes.string.isRequired,
};

export default memo(PatchToolbarView);
