import PropTypes from 'prop-types';

import React from 'react';

import useAppContext from '../../../App/Contexts/useAppContext';
import PatchToolbarView from '../../../Components/Patches/PatchToolbar/view';

const PatchToolbar = ({ uuid }) => {
  const { removeGenerator, hideGenerator, sceneJSON } = useAppContext();
  const { metadata } = sceneJSON;
  const { editorInteractive } = metadata;
  return (
    <PatchToolbarView {...{
      disabled: !editorInteractive,
      uuid,
      removeObj: removeGenerator,
      hidePatch: hideGenerator,
    }}
    />
  );
};

PatchToolbar.whyDidYouRender = (process.env.NODE_ENV === 'development');

PatchToolbar.propTypes = {
  uuid: PropTypes.string.isRequired,
};

export default PatchToolbar;
