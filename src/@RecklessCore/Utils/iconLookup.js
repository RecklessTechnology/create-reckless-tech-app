import React from 'react';

import PersonIcon from '@material-ui/icons/Person';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import ImageIcon from '@material-ui/icons/Image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faQuestion, faLayerGroup,
  faCube, faWaveSquare,
  faMouse, faKeyboard, faVideo,
  faCalculator,
  faPlus, faMinus, faTimes, faDivide, faThLarge,
} from '@fortawesome/free-solid-svg-icons';

const getIconByType = (type) => {
  if (type.toLowerCase().includes('light')) {
    return <EmojiObjectsIcon fontSize="small" />;
  }
  switch (type.toLowerCase()) {
    default:
      return <FontAwesomeIcon icon={faQuestion} />;
    case 'group':
      return <FontAwesomeIcon icon={faLayerGroup} />;
    case 'generator':
      return <FontAwesomeIcon icon={faWaveSquare} />;
    case 'peer':
      return <PersonIcon fontSize="small" />;
    case 'device':
      return <FontAwesomeIcon icon={faMouse} />;
    case 'mesh':
      return <FontAwesomeIcon icon={faCube} />;
    case 'scene':
      return <ImageIcon fontSize="small" />;
    case 'calculator':
      return <FontAwesomeIcon icon={faCalculator} />;
    case 'mouse':
      return <FontAwesomeIcon icon={faMouse} />;
    case 'keyboard':
      return <FontAwesomeIcon icon={faKeyboard} />;
    case 'camera':
      return <FontAwesomeIcon icon={faVideo} />;
    case 'add':
      return <FontAwesomeIcon icon={faPlus} />;
    case 'subtract':
      return <FontAwesomeIcon icon={faMinus} />;
    case 'multiply':
      return <FontAwesomeIcon icon={faTimes} />;
    case 'divide':
      return <FontAwesomeIcon icon={faDivide} />;
    case 'preview':
      return <FontAwesomeIcon icon={faThLarge} />;
  }
};

export {
  // eslint-disable-next-line import/prefer-default-export
  getIconByType,
};
