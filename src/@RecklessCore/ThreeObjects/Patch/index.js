import PropTypes from 'prop-types';

import React from 'react';

import PropListItem from '../../Components/Patches/PropListItem/index';
import PatchValue from './PatchValue/index';
import PatchDetails from '../../Components/Patches/PatchDetails/index';
import ParentChildProp from '../../Components/Patches/ParentChildProp/index';
import PatchToolbar from './PatchToolbar/index';
import PatchRoot from '../../Components/Patches/PatchRoot';

// import useAppContext from '../../App/Contexts/useAppContext';

const ThreeObjectPatch = ({ data }) => {
  const {
    uuid, label, type, width, isChildHidden, isHidden, children,
  } = data;

  // const { hideThreeObjPatch } = useAppContext();

  const patchProps = [
    {
      uuid, propName: 'position', disableInput: false, disableOutput: true,
    },
    {
      uuid, propName: 'rotation', disableInput: false, disableOutput: true,
    },
    {
      uuid, propName: 'scale', disableInput: false, disableOutput: true,
    },
  ];

  return (
    <PatchRoot {...{ width }}>
      <PatchDetails {...{ name: `${label}`, uuid: `${uuid}`, type }} />
      <ParentChildProp {...{
        children, isChildHidden, type, uuid, isHidden, hidePatch: false,
      }}
      />
      {
        patchProps.map((p) => (
          <PropListItem key={`${p.uuid}-${p.propName}-prop`} {...p}><PatchValue {...{ uuid: p.uuid, propName: p.propName }} /></PropListItem>
        ))
      }
      <PatchToolbar uuid={uuid} />
    </PatchRoot>
  );
};

ThreeObjectPatch.propTypes = {
  data: PropTypes.shape({
    uuid: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    width: PropTypes.number,
    isChildHidden: PropTypes.bool,
    isHidden: PropTypes.bool,
    children: PropTypes.node,
  }).isRequired,
};

export default ThreeObjectPatch;
