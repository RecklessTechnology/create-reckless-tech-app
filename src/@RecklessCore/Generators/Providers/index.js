import React, { memo } from 'react';

import GeneratorsView from './view';

const Generators = ({ connections, generators }) => generators.map((gen) => (
  <GeneratorsView
    key={`rt_${gen.type}_generator_${gen.uuid}`}
    connections={connections}
    {...gen}
  />
));

Generators.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(Generators);
