import PropTypes from 'prop-types';

import React, { memo, Suspense } from 'react';

import { useGLTF } from '@react-three/drei';

const GLTFObject = (props) => {
  const { url } = props;
  const { scene } = useGLTF(url);
  return (
    <group dispose={null}>
      <Suspense fallback={null}>
        <primitive object={scene} {...props} />
      </Suspense>
    </group>
  );
};

GLTFObject.propTypes = {
  url: PropTypes.string.isRequired,
};

export default memo(GLTFObject);
