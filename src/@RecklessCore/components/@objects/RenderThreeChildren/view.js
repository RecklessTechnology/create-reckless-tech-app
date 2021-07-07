import { memo } from 'react';

const RenderThreeChildrenView = ({
    name,
    node,
    position,
    rotation,
    scale,
    children
}) => {
    return (
      <group name={name} ref={node} position={position} rotation={rotation} scale={scale}>
        {children}
      </group>
    );
}

export default memo(RenderThreeChildrenView);