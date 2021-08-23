/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */

import React, { memo } from 'react';

import TransformsView from './view';

const Transforms = ({ transforms }) => transforms.map((transform) => (<TransformsView key={`rt_${transform.type}_transform_${transform.uuid}`} {...transform} />));

Transforms.whyDidYouRender = true;

export default memo(Transforms);
