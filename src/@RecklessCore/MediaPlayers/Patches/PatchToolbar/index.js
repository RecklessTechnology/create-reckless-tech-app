import PropTypes from 'prop-types';

import React from 'react';

import useAppContext from '../../../App/Contexts/useAppContext';
import PatchToolbarView from '../../../Components/Patches/PatchToolbar/view';

const PatchToolbar = ({ uuid }) => {
  const { removeMediaPlayer, hideMediaPlayer, sceneJSON } = useAppContext();
  const { metadata } = sceneJSON;
  const { editorInteractive } = metadata;
  return (
    <PatchToolbarView {...{
      disabled: !editorInteractive,
      uuid,
      removeObj: removeMediaPlayer,
      hidePatch: hideMediaPlayer,
    }}
    />
  );
};

PatchToolbar.whyDidYouRender = (process.env.NODE_ENV === 'development');

PatchToolbar.propTypes = {
  uuid: PropTypes.string.isRequired,
};

export default PatchToolbar;
