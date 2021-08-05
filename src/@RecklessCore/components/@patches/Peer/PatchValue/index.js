/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';

import usePeersContext from '../../../../contexts/usePeersContext';

import PatchValueView from '../../shared/PatchValue/view';

const PatchValue = ({ uuid, propName }) => {
  const { findPeer } = usePeersContext();
  const peerObj = findPeer(uuid);
  const [propVal, setPropVal] = useState([0, 0, 0]);

  const isMounted = useRef(false);

  const updateProp = useCallback((val) => {
    if (isMounted.current) {
      setPropVal(val);
    }
  }, [isMounted, setPropVal]);

  useEffect(() => {
    if (peerObj !== undefined) {
      isMounted.current = true;
      if (typeof peerObj.subscribe === 'function') {
        peerObj.subscribe(`${uuid}-${propName.toLowerCase()}-updated`, updateProp);
      }
    }
    return () => {
      isMounted.current = false;
    };
  }, [peerObj, propName, updateProp, uuid]);

  if (peerObj === undefined) { return <PatchValueView {...{ value: [0, 0, 0] }} />; }

  return <PatchValueView {...{ value: propVal }} />;
};

PatchValue.propTypes = {
  uuid: PropTypes.string.isRequired,
  propName: PropTypes.string.isRequired,
};

export default PatchValue;
