import PropTypes from 'prop-types';

import React, { memo } from 'react';

import OrbitGenerator from './Orbit/index';
import SinewaveGenerator from './Sinewave/index';
import GeneratorManager, { DefaultProps } from '../Managers/GeneratorManager';

const GeneratorsView = ({ type, ...props }) => {
  switch (type.toLowerCase()) {
    default:
    case 'orbit':
      return (
        <GeneratorManager {...DefaultProps} type={type} {...props}>
          <OrbitGenerator />
        </GeneratorManager>
      );
    case 'sinewave':
      return (
        <GeneratorManager {...DefaultProps} type={type} {...props}>
          <SinewaveGenerator toProp="value" />
        </GeneratorManager>
      );
  }
};

GeneratorsView.whyDidYouRender = (process.env.NODE_ENV === 'development');

GeneratorsView.propTypes = {
  type: PropTypes.string.isRequired,
};

export default memo(GeneratorsView);
