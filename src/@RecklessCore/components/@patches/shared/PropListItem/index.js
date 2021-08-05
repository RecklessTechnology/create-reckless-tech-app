/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import PropListItemView from './view';

const PropListItem = ({
  children, uuid, propName, disableInput, disableOutput,
}) => (
  <PropListItemView {...{
    uuid, propName, disableInput, disableOutput,
  }}
  >
    {children}
  </PropListItemView>
);

PropListItem.whyDidYouRender = false;

export default PropListItem;
