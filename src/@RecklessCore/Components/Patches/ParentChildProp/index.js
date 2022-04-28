import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import clsx from 'clsx';

import {
  ListItemSecondaryAction,
  List, ListItemText, ListItemIcon,
  ListItem, Typography, Grid,
  Tooltip,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

import OutputHandle from '../OutputHandle';
import InputHandle from '../InputHandle';

import PropAccordianView from '../PropAccordian/view';

import { getIconByType } from '../../../Utils/iconLookup';

import IconButtonView from '../../Buttons/IconButton/view';

const useStyles = makeStyles(() => ({
  propItem: {
    margin: 0,
    padding: 0,
    oveflow: 'hidden',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  propGrid: {
    width: '100%',
    height: '100%',
  },
  propText: {
    fontSize: '12px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  propAccordList: {
    margin: 0,
    padding: 0,
  },
  toolbar: {
    padding: 0,
    position: 'fixed',
    bottom: 0,
  },
  propAccord: {
    width: '100%',
    marginBottom: '0px !important',
    background: 'none',
    boxShadow: 'none',
    borderRadius: 0,
  },
  propSummary: {
    padding: '0 0px',
    width: '100%',
    minHeight: '25px !important',
  },
  propSummaryContent: {
    margin: '0 !important',
  },
  propSummaryExapand: {
    padding: '0 12px',
  },
  propDetails: {
    padding: 0,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  handleGridLeft: {
    padding: 0,
    paddingLeft: 9,
    paddingTop: 15,
  },
  handleGridRight: {
    padding: 0,
    paddingRight: 9,
    paddingTop: 15,
  },
  iconButton: {
    // margin: 0,
    // padding: 0,
  },
  childList: {
    width: '100%',
  },
  childListItem: {
    padding: 0,
  },
  secondRoot: {
    right: 0,
    background: 'linear-gradient(90deg, transparent, #555555)',
  },
  childListIcon: {
    minWidth: 'auto',
    padding: 10,
  },
  lightIcon: {
    padding: '10px 7px',
  },
}));

const ParentChildProp = ({
  type, uuid, children, hidePatch,
}) => {
  const classes = useStyles();
  return (
    <ListItem dense className={classes.propItem}>
      <Grid spacing={0} container className={classes.propGrid}>
        <Grid item xs={1} className={classes.handleGridLeft}>
          <InputHandle {...{ uuid, propName: 'children' }} />
        </Grid>
        <Grid item xs={10}>
          <PropAccordianView
            defaultOpen={false}
            header={(
              <Typography className={classes.propText}>
                {
                `Children (${children.length}) ${type.toLowerCase() !== 'scene' ? '' : ''}`
                }
              </Typography>
)}
            expandIcon={(
              <ExpandMoreIcon fontSize="small" />
            )}
          >
            <List dense className={classes.childList}>
              {
                children.filter((c) => (c.userData.isPatchHidden)).map((c) => (
                  <ListItem dense key={`${c.uuid}_${c.name}_patch_child_list`} className={classes.childListItem}>
                    <Tooltip title={c.type}>
                      <ListItemIcon className={
                    clsx(classes.childListIcon, { [classes.lightIcon]: c.type.toLowerCase().includes('light') })
                  }
                      >
                        {getIconByType(c.type)}
                      </ListItemIcon>
                    </Tooltip>
                    <Tooltip title={c.uuid}>
                      <ListItemText primary={c.name} />
                    </Tooltip>
                    <ListItemSecondaryAction classes={{
                      root: classes.secondRoot,
                    }}
                    >
                      <IconButtonView
                        {...{
                          label: 'Pop Out',
                          handleClick: () => {
                            hidePatch(c.uuid, false);
                          },
                        }}
                        className={classes.iconButton}
                        disabled={false}
                      >
                        <FontAwesomeIcon flip="horizontal" icon={faSignOutAlt} />
                      </IconButtonView>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              }
            </List>
          </PropAccordianView>
        </Grid>
        <Grid item xs={1} className={classes.handleGridRight}>
          {type.toLowerCase() !== 'scene' ? <OutputHandle {...{ uuid, propName: 'parent' }} /> : null}
        </Grid>
      </Grid>
    </ListItem>
  );
};

ParentChildProp.propTypes = {
  type: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  hidePatch: PropTypes.func.isRequired,
};

export default memo(ParentChildProp);
