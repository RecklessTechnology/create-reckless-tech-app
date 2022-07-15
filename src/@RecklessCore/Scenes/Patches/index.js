import PropTypes from 'prop-types';

import React, { useEffect } from 'react';

import PatchDetails from '../../Components/Patches/PatchDetails/index';
import ParentChildProp from '../../Components/Patches/ParentChildProp/index';
import PatchRoot from '../../Components/Patches/PatchRoot';

import useAppContext from '../../App/Contexts/useAppContext';

const ScenePatch = ({ selected, data }) => {
  const { selectedComponent, setSelectedComponent } = useAppContext();
  const {
    uuid, label, type, width, isChildHidden, isHidden, children,
  } = data;
  const { hideThreeObjPatch } = useAppContext();

  useEffect(() => {
    setSelectedComponent({ uuid, label, type });
  }, [label, selected, setSelectedComponent, type, uuid]);

  // Don't show if scene patch if has no children.
  if (children === undefined || children.length === 0) {
    return null;
  }

  switch (type.toLowerCase()) {
    default:
      // eslint-disable-next-line no-console
      console.log(`Unknown Scene Patch: ${type}`);
      return null;
    case 'scene':
      return (
        <PatchRoot
          {...{
            width,
            selected: !!((selectedComponent === uuid || selected === true)),
          }}
        >
          <PatchDetails {...{ name: `${label}`, uuid: `${uuid}`, type: 'scene' }} />
          <ParentChildProp {...{
            children, isChildHidden, type, uuid, isHidden, hidePatch: hideThreeObjPatch,
          }}
          />
        </PatchRoot>
      );
  }
};

ScenePatch.propTypes = {
  selected: PropTypes.bool.isRequired,
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
