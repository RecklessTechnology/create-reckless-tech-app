import PropTypes from 'prop-types';

import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';

import useAppContext from '../../../../App/Contexts/useAppContext';
import useConnectionsContext from '../../../../Connections/Contexts/useConnectionsContext';

import ShareScenePeerButtonView from './view';

const ShareScenePeerButton = ({ peerInfo }) => {
  const { subscribe, unsubscribe } = useAppContext();
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
      unsubscribe('me-modified', updateMe);
    };
  }, [subscribe, unsubscribe, updateMe]);

  if (!me) { return null; }

  return <ShareScenePeerButtonView {...{ me, peerInfo }} />;
};

ShareScenePeerButton.whyDidYouRender = (process.env.NODE_ENV === 'development');

ShareScenePeerButton.propTypes = {
  peerInfo: PropTypes.shape({}).isRequired,
};

export default ShareScenePeerButton;
