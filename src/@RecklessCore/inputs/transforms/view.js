/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */

import React, { memo } from 'react';

import TransformManager, { DefaultProps } from '../../managers/TransformManager';

import CalculatorTransform from './Calculator/index';

const TransformsView = ({ ...props }) => {
  switch (props.type) {
    default:
    case 'Calculator':
      return (
        <TransformManager {...DefaultProps} type={props.type} {...props}>
          <CalculatorTransform {...props} />
        </TransformManager>
      );
  }
};

TransformsView.whyDidYouRender = true;

export default memo(TransformsView);
