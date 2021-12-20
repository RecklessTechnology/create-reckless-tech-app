import PropTypes from 'prop-types';

import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import useAppContext from '../../../App/Contexts/useAppContext';

import usePeersContext from '../../Contexts/usePeersContext';

import PatchValueView from '../../../Components/Patches/PatchValue/view';

const PatchValue = ({ uuid, propName }) => {
  const { subscribe, unsubscribe } = useAppContext();
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
      subscribe(`${uuid}-${propName.toLowerCase()}-updated`, updateProp);
    }
    return () => {
      isMounted.current = false;
      unsubscribe(`${uuid}-${propName.toLowerCase()}-updated`, updateProp);
    };
  }, [subscribe, unsubscribe, peerObj, propName, updateProp, uuid]);

  if (peerObj === undefined) { return <PatchValueView {...{ value: [0, 0, 0] }} />; }

  return <PatchValueView {...{ value: propVal }} />;
};

PatchValue.propTypes = {
  uuid: PropTypes.string.isRequired,
  propName: PropTypes.string.isRequired,
};

export default PatchValue;
