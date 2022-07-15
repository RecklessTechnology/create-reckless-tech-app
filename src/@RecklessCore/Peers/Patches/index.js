import PropTypes from 'prop-types';

import React, { memo, useEffect, useState } from 'react';

import PropListItem from '../../Components/Patches/PropListItem/index';
import PatchValue from './PatchValue/index';
import PatchDetails from '../../Components/Patches/PatchDetails/index';
import useConnectionsContext from '../../Connections/Contexts/useConnectionsContext';
import PatchRoot from '../../Components/Patches/PatchRoot';

import PatchToolbar from './PatchToolbar/index';
import useAppContext from '../../App/Contexts/useAppContext';

/**
 * Patch for Controlling Peers
 */
const PeerPatch = ({
  // eslint-disable-next-line no-unused-vars
  type = 'peer',
  // eslint-disable-next-line no-unused-vars
  name = 'default',
  // eslint-disable-next-line no-unused-vars
  uuid = 'xxx',
  // eslint-disable-next-line no-unused-vars
  userData = {
    isPatchHidden: false,
  },
  selected,
  data,
}) => {
  const { selectedComponent } = useAppContext();
  const { uuid: uid, width } = data;
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
    const p = findConnection(uid);
    if (p !== undefined) {
      setPeer(p);
    }
  }, [uid, findConnection, setPeer]);

  if (peer === null) { return null; }

  switch (type.toLowerCase()) {
    default:
      // eslint-disable-next-line no-console
      console.log(`Unknown Peer Patch: ${type}`);
      return (
        <PatchRoot
          {...{
            width,
            selected: !!((selectedComponent === uuid || selected === true)),
          }}
        >
          <PatchDetails {...{ name: `${peer.name}`, uuid: `${peer.uuid}`, type: 'Peer' }} />
          {patchProps.map((p) => (<PropListItem key={`${peer.uuid}-${p.propName}-prop`} {...p}><PatchValue {...{ uuid: peer.uuid, propName: p.propName }} /></PropListItem>))}
          <PatchToolbar uuid={peer.uuid} />
        </PatchRoot>
      );
  }
};

PeerPatch.propTypes = {
  /**
   * Name of Patch.
   */
  // eslint-disable-next-line react/require-default-props
  name: PropTypes.string,
  /**
   * Type of Patch.
   */
  // eslint-disable-next-line react/require-default-props
  type: PropTypes.string,
  /**
   * Unique Patch Id.
   */
  // eslint-disable-next-line react/require-default-props
  uuid: PropTypes.string,
  /**
   * Props.
   */
  // eslint-disable-next-line react/require-default-props
  userData: PropTypes.shape({
    isPatchHidden: PropTypes.bool,
  }),
  selected: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    uuid: PropTypes.string,
    width: PropTypes.number,
  }).isRequired,
};

export default memo(PeerPatch);
