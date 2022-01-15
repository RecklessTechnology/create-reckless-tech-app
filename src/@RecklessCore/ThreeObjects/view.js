import PropTypes from 'prop-types';

import React, { memo } from 'react';

const ThreeObjectView = ({
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

ThreeObjectView.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  node: PropTypes.shape().isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  rotation: PropTypes.arrayOf(PropTypes.number).isRequired,
  scale: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default memo(ThreeObjectView);
