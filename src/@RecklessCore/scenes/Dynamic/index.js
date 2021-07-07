import { memo } from 'react';

import RenderThreeChildren from '../../components/@objects/RenderThreeChildren';

const DynamicScene = ({ sceneJSON }) => {
  
  return (sceneJSON.object.children.map((childProps)=>{
    return (<RenderThreeChildren
      key={childProps.uuid}
      props={childProps}
      geometries={sceneJSON.geometries}
      materials={sceneJSON.materials}
      devices={sceneJSON.devices}
      generators={sceneJSON.generators}
      connections={sceneJSON.connections}
    />)
  }))
}

DynamicScene.whyDidYouRender = true;

export default memo(DynamicScene);