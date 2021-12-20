import React, { memo } from 'react';

import GeneratorsView from './view';

const Generators = ({ generators }) => generators.map((gen) => (<GeneratorsView key={`rt_${gen.type}_generator_${gen.uuid}`} {...gen} />));

Generators.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(Generators);
