import React, { useMemo, useState, useCallback } from 'react';

import RenderThreeChildren from '../@RecklessCore/components/@objects/RenderThreeChildren';

export default function DynamicScene({ sceneJSON, setSceneJSON, subscribe }) {
  const [sceneData, setSceneData] = useState();
  
  const updateScene = useCallback((data) => { //update data only when peer list is modified
    setSceneJSON(data);
  }, [setSceneJSON]);

  subscribe('scene-changed', updateScene);

  useMemo(()=>{
    setSceneData({
      children: sceneJSON.object.children,
      geometries: sceneJSON.geometries,
      materials: sceneJSON.materials,
      devices: sceneJSON.devices,
      generators: sceneJSON.generators,
      connections: sceneJSON.connections,
    });
  }, [sceneJSON]);

  return (sceneData !== undefined ? sceneData.children.map((childProps)=>{
    return (<RenderThreeChildren
      key={childProps.uuid}
      props={childProps}
      geometries={sceneData.geometries}
      materials={sceneData.materials}
      devices={sceneData.devices}
      generators={sceneData.generators}
      connections={sceneData.connections}
    />)
  }) : null)
}
