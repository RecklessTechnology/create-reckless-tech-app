import React, { useMemo } from 'react';

import RenderChild from './RenderChild';

export default function DynamicScene({ sceneJSON }) {
    const sceneDef = useMemo(()=>{
      // return null;
      return {
        children: sceneJSON.object.children,
        geometries: sceneJSON.geometries,
        materials: sceneJSON.materials,
        inputs: sceneJSON.inputs,
        generators: sceneJSON.generators,
        connections: sceneJSON.connections,
      };
    }, [sceneJSON]);
    
    if (!sceneDef) { return null }
    
    return (<>
    {sceneDef.children.map((childProps)=>{
      return (
      <RenderChild
        key={childProps.uuid}
        props={childProps}
        geometries={sceneDef.geometries}
        materials={sceneDef.materials}
        inputs={sceneDef.inputs}
        generators={sceneDef.generators}
        connections={sceneDef.connections}
      />
    )})}
    </>)
}
