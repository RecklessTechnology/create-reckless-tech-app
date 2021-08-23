/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */

import React, { memo } from 'react';

import GeneratorsView from './view';

const Generators = ({ generators }) => generators.map((gen) => (<GeneratorsView key={`rt_${gen.type}_generator_${gen.uuid}`} {...gen} />));

Generators.whyDidYouRender = true;

export default memo(Generators);
