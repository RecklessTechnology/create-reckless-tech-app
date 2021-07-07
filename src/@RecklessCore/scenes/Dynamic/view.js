import { memo } from 'react';

import RenderThreeChildren from '../../components/@objects/RenderThreeChildren';

const DynamicSceneView = ({ sceneData }) => {
  
  return (sceneData.children.map((childProps)=>{
    return (<RenderThreeChildren
      key={childProps.uuid}
      props={childProps}
      geometries={sceneData.geometries}
      materials={sceneData.materials}
      devices={sceneData.devices}
      generators={sceneData.generators}
      connections={sceneData.connections}
    />)
  }))
}

DynamicSceneView.whyDidYouRender = true;

export default memo(DynamicSceneView);