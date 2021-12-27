import PropTypes from 'prop-types';

import React, { useEffect, useState } from 'react';

import PropListItem from '../../Components/Patches/PropListItem/index';
import PatchValue from './PatchValue/index';
import PatchDetails from '../../Components/Patches/PatchDetails/index';
import useConnectionsContext from '../../Connections/Contexts/useConnectionsContext';
import PatchRoot from '../../Components/Patches/PatchRoot';

import PatchToolbar from './PatchToolbar/index';

const PeerPatch = ({ data }) => {
  const { uuid, width } = data;
  const { findConnection } = useConnectionsContext();
  const [peer, setPeer] = useState(null);

  const [patchProps, setPatchProps] = useState([]);

  useEffect(() => {
    if (peer !== null) {
      setPatchProps([
        {
          uuid: peer.uuid, propName: 'data', disableInput: false, disableOutput: false,
        },
      ]);
    }
  }, [peer]);

  useEffect(() => {
    const p = findConnection(uuid);
    if (p !== undefined) {
      setPeer(p);
    }
  }, [uuid, findConnection, setPeer]);

  if (peer === null) { return null; }

  return (
    <PatchRoot {...{ width }}>
      <PatchDetails {...{ name: `${peer.name}`, uuid: `${peer.uuid}`, type: 'Peer' }} />
      {patchProps.map((p) => (<PropListItem key={`${peer.uuid}-${p.propName}-prop`} {...p}><PatchValue {...{ uuid: peer.uuid, propName: p.propName }} /></PropListItem>))}
      <PatchToolbar uuid={peer.uuid} />
    </PatchRoot>
  );
};

PeerPatch.propTypes = {
  data: PropTypes.shape({
    uuid: PropTypes.string,
    width: PropTypes.string,
  }).isRequired,
};

export default PeerPatch;