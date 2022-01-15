import PropTypes, { node } from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
  Box,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  tabPanel: {
    padding: '0 20px',
  },
}));

/**
 * Basic Panel for Tabbed Content
 */
const TabPanel = ({
  children = node,
  value = 0,
  index = 0,
  ...props
}) => {
  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      title={`scrollable-prevent-tab-${index}`}
      {...props}
    >
      {value === index && (
        <Box classes={{ root: classes.tabPanel }} p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  /**
   * Current selected tab.
   */
  value: PropTypes.number.isRequired,
  /**
   * Panel index.
   */
  index: PropTypes.number.isRequired,
  /**
   * Child content.
   */
  children: PropTypes.node.isRequired,
};

export default memo(TabPanel);
