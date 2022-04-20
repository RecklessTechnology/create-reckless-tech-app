import React, { memo } from 'react';

import TransformsView from './view';

const Transforms = ({ connections, transforms }) => transforms.map((transform) => (
  <TransformsView
    key={`rt_${transform.type}_transform_${transform.uuid}`}
    connections={connections}
    {...transform}
  />
));

Transforms.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(Transforms);
