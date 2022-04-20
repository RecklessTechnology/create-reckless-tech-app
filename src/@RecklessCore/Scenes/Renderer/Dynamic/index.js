import PropTypes from 'prop-types';

import React, { memo } from 'react';

import ThreeObject from '../../../ThreeObjects';

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
    <ThreeObject
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
  sceneJSON: PropTypes.shape({
    object: PropTypes.shape({}),
    geometries: PropTypes.arrayOf(PropTypes.shape({})),
    materials: PropTypes.arrayOf(PropTypes.shape({})),
    devices: PropTypes.arrayOf(PropTypes.shape({})),
    generators: PropTypes.arrayOf(PropTypes.shape({})),
    connections: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

export default memo(DynamicScene);
