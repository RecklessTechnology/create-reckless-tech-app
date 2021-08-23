/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */

import PersonIcon from '@material-ui/icons/Person';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import ImageIcon from '@material-ui/icons/Image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun, faLayerGroup,
  faCube, faWaveSquare, faMouse, faKeyboard, faSquareRootAlt,
} from '@fortawesome/free-solid-svg-icons';

const getIconByType = (type) => {
  if (type.toLowerCase().includes('light')) {
    return <EmojiObjectsIcon fontSize="small" />;
  }
  switch (type.toLowerCase()) {
    default:
      return <FontAwesomeIcon icon={faSun} />;
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
    case 'transform':
      return <FontAwesomeIcon icon={faSquareRootAlt} />;
    case 'mouse':
      return <FontAwesomeIcon icon={faMouse} />;
    case 'keyboard':
      return <FontAwesomeIcon icon={faKeyboard} />;
  }
};

export {
  getIconByType,
};
