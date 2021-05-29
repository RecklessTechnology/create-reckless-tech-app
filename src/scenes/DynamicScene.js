import React, { useMemo, useState } from 'react';
import useAppContext from '../@RecklessCore/useAppContext';

import RenderChild from './RenderChild';

export default function DynamicScene() {
  const { sceneJSON, setSceneJSON, subscribe } = useAppContext();
  const [sceneData, setSceneData] = useState();
  
  subscribe('scene-changed', (data)=>{ //update data only when peer list is modified
    setSceneJSON(data);
  });

  useMemo(()=>{
      setSceneData({
        children: sceneJSON.object.children,
        geometries: sceneJSON.geometries,
        materials: sceneJSON.materials,
        inputs: sceneJSON.inputs,
        generators: sceneJSON.generators,
        connections: sceneJSON.connections,
      });
    }, [sceneJSON]);
    
    if (!sceneData) { return null }
    
    return (<>
      {sceneData.children.map((childProps)=>{
        return (<RenderChild
          key={childProps.uuid}
          props={childProps}
          geometries={sceneData.geometries}
          materials={sceneData.materials}
          inputs={sceneData.inputs}
          generators={sceneData.generators}
          connections={sceneData.connections}
        />)
      })}
    </>)
}
