/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  ListItem, ListItemText, ListItemIcon, Tooltip,
} from '@material-ui/core';

import KeyboardIcon from '@material-ui/icons/Keyboard';
import MouseIcon from '@material-ui/icons/Mouse';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import SpeakerIcon from '@material-ui/icons/Speaker';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import FilterTiltShiftIcon from '@material-ui/icons/FilterTiltShift';
import PersonIcon from '@material-ui/icons/Person';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import ImageIcon from '@material-ui/icons/Image';
import FunctionsIcon from '@material-ui/icons/Functions';
import GridOnIcon from '@material-ui/icons/GridOn';

const useStyles = makeStyles(() => ({
  propItem: {
    margin: 0,
    padding: '0 10px 10px 10px',
  },
  propIcon: {
    minWidth: '30px',
  },
}));

const typeIcon = (type) => {
  if (type.toLowerCase().includes('light')) {
    return <EmojiObjectsIcon />;
  }
  switch (type.toLowerCase()) {
    default:
      return <FilterTiltShiftIcon />;
    case 'group':
      return <FilterNoneIcon />;
    case 'generator':
      return <GraphicEqIcon />;
    case 'peer':
      return <PersonIcon />;
    case 'device':
      return <SpeakerIcon />;
    case 'mesh':
      return <GridOnIcon />;
    case 'scene':
      return <ImageIcon />;
    case 'transform':
      return <FunctionsIcon />;
    case 'mouse':
      return <MouseIcon />;
    case 'keyboard':
      return <KeyboardIcon />;
  }
};

const PatchDetails = ({ name, type, uuid }) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.propItem}>
      <ListItemIcon className={classes.propIcon}>
        <Tooltip title={type} aria-label={type}>{typeIcon(type)}</Tooltip>
      </ListItemIcon>
      <Tooltip title={uuid} aria-label={uuid}>
        <ListItemText
          primary={name}
        />
      </Tooltip>
    </ListItem>
  );
};

PatchDetails.propTypes = {
  name: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default memo(PatchDetails);
