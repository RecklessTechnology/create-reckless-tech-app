import PropTypes from 'prop-types';

import React, { memo } from 'react';

import OrbitGenerator from './Orbit/index';
import SinewaveGenerator from './Sinewave/index';
import GeneratorManager, { DefaultProps } from '../Managers/GeneratorManager';

const GeneratorsView = ({ connections, type, ...props }) => {
  switch (type.toLowerCase()) {
    default:
      // eslint-disable-next-line no-console
      console.log(`Unknown Generator: ${type}`);
      return null;
    case 'orbit':
      return (
        <GeneratorManager connections={connections} {...DefaultProps} type={type} {...props}>
          <OrbitGenerator />
        </GeneratorManager>
      );
    case 'sinewave':
      return (
        <GeneratorManager connections={connections} {...DefaultProps} type={type} {...props}>
          <SinewaveGenerator toProp="value" />
        </GeneratorManager>
      );
  }
};

GeneratorsView.whyDidYouRender = (process.env.NODE_ENV === 'development');

GeneratorsView.propTypes = {
  connections: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  type: PropTypes.string.isRequired,
};

export default memo(GeneratorsView);
