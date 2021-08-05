/* eslint-disable react/jsx-filename-extension */

import PropTypes from 'prop-types';

import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';

import useAppContext from '../../contexts/useAppContext';
import useConnectionsContext from '../../contexts/useConnectionsContext';

import ShareScenePeerButtonView from './view';

const ShareScenePeerButton = ({ peerInfo }) => {
  const { subscribe } = useAppContext();
  const { getMe } = useConnectionsContext();

  const [me, setMe] = useState({});

  const isMounted = useRef(false);

  useEffect(() => {
    const m = getMe();
    if (m !== undefined) {
      setMe(m);
    }
  }, [setMe, getMe]);

  const updateMe = useCallback(() => { // update data only when peer list is modified
    if (isMounted.current) {
      const m = getMe();
      if (m !== undefined) {
        setMe(m);
      }
    }
  }, [getMe, setMe]);

  useEffect(() => {
    isMounted.current = true;
    subscribe('me-modified', updateMe);
    return () => {
      isMounted.current = false;
    };
  }, [subscribe, updateMe]);

  if (!me) { return null; }

  return <ShareScenePeerButtonView {...{ me, peerInfo }} />;
};

ShareScenePeerButton.whyDidYouRender = true;

ShareScenePeerButton.propTypes = {
  peerInfo: PropTypes.shape({}).isRequired,
};

export default ShareScenePeerButton;
