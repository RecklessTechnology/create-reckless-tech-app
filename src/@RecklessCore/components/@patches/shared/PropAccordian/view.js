/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { memo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Accordion, AccordionDetails, AccordionSummary,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  propAccord: {
    width: '100%',
    marginBottom: '0px !important',
    background: 'none',
    boxShadow: 'none',
    borderRadius: 0,
    // border: '1px solid green',
  },
  propSummary: {
    padding: '5px 0px',
    width: '100%',
    minHeight: '0px !important',
  },
  propSummaryContent: {
    margin: '0 !important',
  },
  propSummaryExapand: {
    margin: 0,
    padding: 0,
  },
  propDetails: {
    margin: 0,
    padding: 0,
    paddingBottom: 10,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
}));

// eslint-disable-next-line no-unused-vars
const PropAccordianView = ({
  children, header, expandIcon, defaultOpen,
}) => {
  const [showDetails, setShowDetails] = useState(defaultOpen);

  const classes = useStyles();
  return (
    <Accordion
      className={classes.propAccord}
      expanded={showDetails}
      onChange={(event, val) => {
        setShowDetails(val);
      }}
    >
      <AccordionSummary
        classes={{
          root: classes.propSummary,
          content: classes.propSummaryContent,
          expandIcon: classes.propSummaryExapand,
        }}
        expandIcon={expandIcon}
        aria-controls="panel-content"
        id="panel-header"
      >
        {header}
      </AccordionSummary>
      <AccordionDetails className={classes.propDetails}>
        { (showDetails) ? children : null }
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(PropAccordianView);
