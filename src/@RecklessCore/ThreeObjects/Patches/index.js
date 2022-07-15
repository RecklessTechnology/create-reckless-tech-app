import PropTypes from 'prop-types';

import React, { useEffect } from 'react';

import PropListItem from '../../Components/Patches/PropListItem/index';
import PatchValue from './PatchValue/index';
import PatchDetails from '../../Components/Patches/PatchDetails/index';
import ParentChildProp from '../../Components/Patches/ParentChildProp/index';
import PatchToolbar from './PatchToolbar/index';
import PatchRoot from '../../Components/Patches/PatchRoot';

import useAppContext from '../../App/Contexts/useAppContext';

const ThreeObjectPatch = ({ selected, data }) => {
  const { selectedComponent, setSelectedComponent } = useAppContext();
  const {
    uuid, label, type, width, isChildHidden, isHidden, children,
  } = data;

  const { hideThreeObjPatch } = useAppContext();

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
    {
      uuid, propName: 'freqs', disableInput: false, disableOutput: true,
    },
  ];

  useEffect(() => {
    setSelectedComponent({ uuid, label, type });
  }, [label, selected, setSelectedComponent, type, uuid]);

  switch (type.toLowerCase()) {
    default:
      // eslint-disable-next-line no-console
      console.log(`Unknown Three Object Patch: ${type}`);
      return (
        <PatchRoot
          {...{
            width,
            selected: !!((selectedComponent === uuid || selected === true)),
          }}
        >
          <PatchDetails {...{ name: `${label}`, uuid: `${uuid}`, type }} />
          <ParentChildProp {...{
            children, isChildHidden, type, uuid, isHidden, hidePatch: hideThreeObjPatch,
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
  }
};

ThreeObjectPatch.propTypes = {
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

export default ThreeObjectPatch;
