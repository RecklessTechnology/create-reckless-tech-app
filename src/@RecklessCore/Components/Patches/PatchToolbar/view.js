import PropTypes from 'prop-types';

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Grid,
  ListItem, Button,
  AppBar, Toolbar,
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';

import IconButtonView from '../../Buttons/IconButton/view';

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
                      disabled: false,
                      label: 'Hide Patch',
                      handeClick: () => {
                        hidePatch(uuid, true);
                      },
                    }}
                    className={classes.button}
                    disabled={false}
                  >
                    <FontAwesomeIcon icon={faSignInAlt} />
                  </IconButtonView>
                )
                : <Button className={classes.button} /> }
            </Grid>
            <Grid item xs={4}>
              <IconButtonView
                {...{
                  label: 'Delete',
                  handeClick: () => {
                    removeObj(uuid);
                  },
                }}
                className={classes.button}
                disabled={false}
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
