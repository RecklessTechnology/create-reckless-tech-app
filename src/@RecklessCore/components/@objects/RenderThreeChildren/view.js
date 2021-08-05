/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { memo } from 'react';

const RenderThreeChildrenView = ({
  name,
  node,
  position,
  rotation,
  scale,
  children,
}) => (
  <group name={name} ref={node} position={position} rotation={rotation} scale={scale}>
    {children}
  </group>
);

export default memo(RenderThreeChildrenView);
