/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */

import React, { memo } from 'react';

import OrbitGenerator from './Orbit/index';
import SinewaveGenerator from './Sinewave/index';
import GeneratorManager, { DefaultProps } from '../../managers/GeneratorManager';

const GeneratorsView = ({ ...props }) => {
  switch (props.type.toLowerCase()) {
    default:
    case 'orbit':
      return (
        <GeneratorManager {...DefaultProps} type={props.type} {...props}>
          <OrbitGenerator />
        </GeneratorManager>
      );
    case 'sinewave':
      return (
        <GeneratorManager {...DefaultProps} type={props.type} {...props}>
          <SinewaveGenerator toProp="value" />
        </GeneratorManager>
      );
  }
};

GeneratorsView.whyDidYouRender = true;

export default memo(GeneratorsView);
