import PropTypes from 'prop-types';

import React from 'react';

import useAppContext from '../../../App/Contexts/useAppContext';
import PatchToolbarView from '../../../Components/Patches/PatchToolbar/view';

const PatchToolbar = ({ uuid }) => {
  const { removePeer } = useAppContext();
  return (
    <PatchToolbarView {...{
      uuid, removeObj: removePeer, hidePatch: () => {},
    }}
    />
  );
};

PatchToolbar.whyDidYouRender = (process.env.NODE_ENV === 'development');

PatchToolbar.propTypes = {
  uuid: PropTypes.string.isRequired,
};

export default PatchToolbar;
