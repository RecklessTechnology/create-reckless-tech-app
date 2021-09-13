import React, {
  useRef, useEffect, useMemo, useState, useCallback,
} from 'react';

import RenderThreeChildren from '../@RecklessCore/components/@objects/RenderThreeChildren';

export default function DynamicScene({ sceneJSON, setSceneJSON, subscribe }) {
  const [sceneData, setSceneData] = useState();

  const isMounted = useRef(false);

  const updateScene = useCallback((data) => { // update data only when peer list is modified
    if (isMounted.current) {
      setSceneJSON(data);
    }
  }, [setSceneJSON]);

  useEffect(() => {
    if (sceneJSON !== undefined) {
      isMounted.current = true;
      subscribe('scene-changed', updateScene);
    }
    return () => {
      isMounted.current = false;
    };
  }, [sceneJSON, subscribe, updateScene]);

  useMemo(() => {
    setSceneData({
      children: sceneJSON.object.children,
      geometries: sceneJSON.geometries,
      materials: sceneJSON.materials,
      devices: sceneJSON.devices,
      generators: sceneJSON.generators,
      connections: sceneJSON.connections,
    });
  }, [sceneJSON]);

  return (sceneData !== undefined ? sceneData.children.map((childProps) => (
    <RenderThreeChildren
      key={childProps.uuid}
      props={childProps}
      geometries={sceneData.geometries}
      materials={sceneData.materials}
      devices={sceneData.devices}
      generators={sceneData.generators}
      connections={sceneData.connections}
    />
  )) : null);
}
