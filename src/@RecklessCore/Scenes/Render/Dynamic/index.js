import PropTypes from 'prop-types';

import React, { memo } from 'react';

import RenderThreeChildren from '../../../ThreeObjects/Render';

const DynamicScene = ({ sceneJSON }) => {
  const {
    object,
    geometries,
    materials,
    devices,
    generators,
    connections,
  } = sceneJSON;
  return (object.children.map((childProps) => (
    <RenderThreeChildren
      key={childProps.uuid}
      props={childProps}
      geometries={geometries}
      materials={materials}
      devices={devices}
      generators={generators}
      connections={connections}
    />
  )));
};

DynamicScene.whyDidYouRender = (process.env.NODE_ENV === 'development');

DynamicScene.propTypes = {
  sceneJSON: PropTypes.shape().isRequired,
};

export default memo(DynamicScene);
