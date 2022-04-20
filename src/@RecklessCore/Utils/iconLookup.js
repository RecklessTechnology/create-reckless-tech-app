import React from 'react';

import PersonIcon from '@material-ui/icons/Person';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import ImageIcon from '@material-ui/icons/Image';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faQuestion, faLayerGroup,
  faCube, faWaveSquare,
  faMouse, faKeyboard, faVideo,
  faCalculator,
  faPlus, faMinus, faTimes, faDivide, faThLarge,
  faRobot, faBorderNone,
} from '@fortawesome/free-solid-svg-icons';

import GLTF_ICON from '../ThreeObjects/Assets/gltf_file.png';

const getIconByType = (type) => {
  if (type.toLowerCase().includes('light')) {
    return <EmojiObjectsIcon fontSize="small" />;
  }
  switch (type.toLowerCase()) {
    default:
      // eslint-disable-next-line no-console
      console.log(`Unknown Icon Type: ${type}`);
      return <FontAwesomeIcon title={type} icon={faQuestion} />;
    case 'datagrid':
      return <FontAwesomeIcon icon={faBorderNone} />;
    case 'nativeaudioanalyzer':
    case 'audiomotionanalyzer':
      return <FontAwesomeIcon icon={faRobot} />;
    case 'musicplayer':
      return <MusicNoteIcon title={type} fontSize="small" />;
    case 'musiccontrols':
      return <PlayCircleOutlineIcon title={type} fontSize="small" />;
    case 'audiovisualizer':
      return <FontAwesomeIcon icon={faWaveSquare} />;
    case 'gltf':
      return (
        <img
          src={GLTF_ICON}
          alt={type}
          fill="#FFF"
          style={{
            width: 20,
            height: 20,
            filter: 'invert(100%)',
          }}
        />
      );
    case 'group':
      return <FontAwesomeIcon title={type} icon={faLayerGroup} />;
    case 'generator':
      return <FontAwesomeIcon title={type} icon={faWaveSquare} />;
    case 'peer':
      return <PersonIcon title={type} fontSize="small" />;
    case 'device':
      return <FontAwesomeIcon title={type} icon={faMouse} />;
    case 'mesh':
      return <FontAwesomeIcon title={type} icon={faCube} />;
    case 'scene':
      return <ImageIcon title={type} fontSize="small" />;
    case 'calculator':
      return <FontAwesomeIcon title={type} icon={faCalculator} />;
    case 'mouse':
      return <FontAwesomeIcon title={type} icon={faMouse} />;
    case 'keyboard':
      return <FontAwesomeIcon title={type} icon={faKeyboard} />;
    case 'camera':
      return <FontAwesomeIcon title={type} icon={faVideo} />;
    case 'add':
      return <FontAwesomeIcon title={type} icon={faPlus} />;
    case 'subtract':
      return <FontAwesomeIcon title={type} icon={faMinus} />;
    case 'multiply':
      return <FontAwesomeIcon title={type} icon={faTimes} />;
    case 'divide':
      return <FontAwesomeIcon title={type} icon={faDivide} />;
    case 'preview':
      return <FontAwesomeIcon title={type} icon={faThLarge} />;
  }
};

export {
  // eslint-disable-next-line import/prefer-default-export
  getIconByType,
};
