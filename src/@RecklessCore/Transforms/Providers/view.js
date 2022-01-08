import PropTypes from 'prop-types';

import React, { memo } from 'react';

import TransformManager, { DefaultProps } from '../Managers/TransformManager';

import CalculatorTransform from './Calculator/index';
import TensorflowTransform from './Tensorflow/index';

const TransformsView = ({ uuid, type, ...props }) => {
  switch (type.toLowerCase()) {
    default:
    case 'tensorflow':
      return (
        <TransformManager {...DefaultProps} uuid={uuid} type={type} {...props}>
          <TensorflowTransform uuid={uuid} type={type} {...props} />
        </TransformManager>
      );
    case 'calculator':
      return (
        <TransformManager {...DefaultProps} uuid={uuid} type={type} {...props}>
          <CalculatorTransform uuid={uuid} type={type} {...props} />
        </TransformManager>
      );
  }
};

TransformsView.whyDidYouRender = (process.env.NODE_ENV === 'development');

TransformsView.propTypes = {
  uuid: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default memo(TransformsView);
