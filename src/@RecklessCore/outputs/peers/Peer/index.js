import { useState, useMemo, useCallback, useEffect } from 'react';

import useThreeObjectContext from '../../../contexts/useThreeObjectContext';
import usePeerOutputContext from '../../../contexts/usePeerOutputContext';

import DrawCircle from '../../../shapes/drawCircle';

import { useSpring } from '@react-spring/core';

const PeerProvider = ({ toProp }) => {
  const { type, resolution, rpm, loop, paused, setPosition: setPeerPosition } = usePeerOutputContext();
  return null;
}

PeerProvider.whyDidYouRender = false;

export default PeerProvider;