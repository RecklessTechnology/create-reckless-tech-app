/* eslint-disable react/jsx-filename-extension */

import React, { memo } from 'react';

import RenderThreeChildren from '../../components/@objects/RenderThreeChildren';

const DynamicScene = ({ sceneJSON }) => (sceneJSON.object.children.map((childProps) => (
  <RenderThreeChildren
    key={childProps.uuid}
    props={childProps}
    geometries={sceneJSON.geometries}
    materials={sceneJSON.materials}
    devices={sceneJSON.devices}
    generators={sceneJSON.generators}
    connections={sceneJSON.connections}
  />
)));

DynamicScene.whyDidYouRender = true;

export default memo(DynamicScene);
