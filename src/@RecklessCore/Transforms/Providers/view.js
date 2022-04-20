import PropTypes from 'prop-types';

import React, { memo } from 'react';

import TransformManager, { DefaultProps } from '../Managers/TransformManager';

import CalculatorTransform from './Calculator';
import TensorflowTransform from './Tensorflow';
import AMAnalyzer from './AudioMotionAnalyzer';
import NativeAnalyzer from './NativeAudioAnalyzer';

const TransformsView = ({
  connections,
  uuid,
  type,
  ...props
}) => {
  switch (type.toLowerCase()) {
    default:
      // eslint-disable-next-line no-console
      console.log(`Unknown Transform Type: ${type}`);
      return null;
    case 'calculator':
      return (
        <TransformManager
          connections={connections}
          {...DefaultProps}
          uuid={uuid}
          type={type}
          {...props}
        >
          <CalculatorTransform connections={connections} uuid={uuid} type={type} {...props} />
        </TransformManager>
      );
    case 'nativeaudioanalyzer':
      return (
        <TransformManager
          connections={connections}
          {...DefaultProps}
          uuid={uuid}
          type={type}
          {...props}
        >
          <NativeAnalyzer connections={connections} uuid={uuid} type={type} {...props} />
        </TransformManager>
      );
    case 'audiomotionanalyzer':
      return (
        <TransformManager
          connections={connections}
          {...DefaultProps}
          uuid={uuid}
          type={type}
          {...props}
        >
          <AMAnalyzer connections={connections} uuid={uuid} type={type} {...props} />
        </TransformManager>
      );
    case 'tensorflow':
      return (
        <TransformManager
          connections={connections}
          {...DefaultProps}
          uuid={uuid}
          type={type}
          {...props}
        >
          <TensorflowTransform connections={connections} uuid={uuid} type={type} {...props} />
        </TransformManager>
      );
  }
};

TransformsView.whyDidYouRender = (process.env.NODE_ENV === 'development');

TransformsView.propTypes = {
  connections: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  uuid: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default memo(TransformsView);
