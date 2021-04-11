import React, { useRef, useMemo } from 'react'
import * as THREE from 'three'

import { useThree } from '@react-three/fiber'
import { a, useSpring } from '@react-spring/three'

import { useDrag } from 'react-use-gesture'

function DragGroup(props) {
  const { name, active, position, rotation, scale, responsiveness, children, updateActive, updateHover, updateRotation, updatePosition } = props;
  const mesh = useRef()

  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width;
  
  const euler = useMemo(() => new THREE.Euler(rotation[0],rotation[1],rotation[2]), rotation)

  const [spring, setSpring] = useSpring(() => ({
    rotation: rotation,
    position: position,
  }))

  setSpring({
    rotation: rotation,
    position: position,
  })


  // Drag event listener sets rotate
  const drag = useDrag(({ delta: [dx, dy] , shiftKey, offset: [x, y] }) => {
    updateActive(mesh.current.name);

    if (!shiftKey) {
      euler.y += (dx / size.width) * responsiveness
      euler.x += (dy / size.width) * responsiveness
      euler.x = THREE.MathUtils.clamp(euler.x, -Math.PI / 2, Math.PI / 2)
      
      updateRotation(mesh.current.name, euler.toArray().slice(0, 3))
    } else {
      updatePosition(mesh.current.name, [x / aspect, -y / aspect, position[2]]);
    }
  })

  return (
    <a.group
      name={name}
      
      scale={active ? [scale*1.15, scale*1.15, scale*1.15] : [scale, scale, scale]}

      onPointerOver={(event) => updateHover(name, true)}
      onPointerOut={(event) => updateHover(name, false)}

      {...drag()}
      {...spring}

      ref={mesh}
    >
      {children}
    </a.group>
  )
}

function Draggable(props) {
  const { name, active, position, rotation, scale, responsiveness, children, updateActive, updateHover, updateRotation, updatePosition } = props;
  
  return (
    <DragGroup
      name={name}

      active={active}

      position={position}
      rotation={rotation}
      scale={scale}

      responsiveness={responsiveness}

      updateActive={updateActive}
      updateHover={updateHover}
      updateRotation={updateRotation}
      updatePosition={updatePosition}
    >
      {children}
    </DragGroup>
  )
}

// function isEqual(prevProps, nextProps) {
//   return JSON.stringify(prevProps.name) === JSON.stringify(nextProps.name) &&
//   JSON.stringify(prevProps.active) === JSON.stringify(nextProps.active) &&
//   JSON.stringify(prevProps.hover) === JSON.stringify(nextProps.active) &&
//   JSON.stringify(prevProps.position) === JSON.stringify(nextProps.position) &&
//   JSON.stringify(prevProps.rotation) === JSON.stringify(nextProps.rotation) &&
//   JSON.stringify(prevProps.responsiveness) === JSON.stringify(nextProps.responsiveness);
// }

// export default React.memo(Draggable, isEqual);

export default Draggable;