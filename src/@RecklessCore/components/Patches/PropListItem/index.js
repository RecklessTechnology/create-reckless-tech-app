import PropTypes from 'prop-types';

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

PropListItem.whyDidYouRender = (process.env.NODE_ENV === 'development');

PropListItem.propTypes = {
  children: PropTypes.node.isRequired,
  uuid: PropTypes.string.isRequired,
  propName: PropTypes.string.isRequired,
  disableInput: PropTypes.bool.isRequired,
  disableOutput: PropTypes.bool.isRequired,
};

export default PropListItem;
