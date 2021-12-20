import PropTypes from 'prop-types';

import React from 'react';

import PatchDetails from '../../Components/Patches/PatchDetails/index';
import ParentChildProp from '../../Components/Patches/ParentChildProp/index';
import PatchRoot from '../../Components/Patches/PatchRoot';

import useAppContext from '../../App/Contexts/useAppContext';

const ScenePatch = ({ data }) => {
  const {
    uuid, label, type, width, isChildHidden, isHidden, children,
  } = data;
  const { hideThreeObjPatch } = useAppContext();

  return (
    <PatchRoot {...{ width }}>
      <PatchDetails {...{ name: `${label}`, uuid: `${uuid}`, type: 'scene' }} />
      <ParentChildProp {...{
        children, isChildHidden, type, uuid, isHidden, hidePatch: hideThreeObjPatch,
      }}
      />
    </PatchRoot>
  );
};

ScenePatch.propTypes = {
  data: PropTypes.shape({
    uuid: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    width: PropTypes.number,
    isChildHidden: PropTypes.bool,
    isHidden: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

export default ScenePatch;
