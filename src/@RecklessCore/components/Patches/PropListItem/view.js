import PropTypes from 'prop-types';

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
  Grid, Typography, ListItem,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import InputHandle from '../InputHandle';
import OutputHandle from '../OutputHandle';

import PropAccordianView from '../PropAccordian/view';

const useStyles = makeStyles(() => ({
  propItem: {
    margin: 0,
    padding: 0,
    oveflow: 'hidden',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  propGrid: {
    width: '100%',
    height: '100%',
  },
  propText: {
    fontSize: '12px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  handleGridLeft: {
    padding: 0,
    paddingLeft: 9,
    paddingTop: 15,
  },
  handleGridRight: {
    padding: 0,
    paddingRight: 9,
    paddingTop: 15,
  },
}));

const PropListItemView = ({
  children, uuid, propName, disableInput, disableOutput,
}) => {
  const classes = useStyles();
  return (
    <ListItem dense className={classes.propItem}>
      <Grid spacing={0} container className={classes.propGrid}>
        <Grid item xs={1} className={classes.handleGridLeft}>
          {disableInput === false ? <InputHandle {...{ uuid, propName }} /> : null}
        </Grid>
        <Grid item xs={10}>
          <PropAccordianView
            defaultOpen={false}
            header={<Typography className={classes.propText}>{propName}</Typography>}
            expandIcon={(
              <ExpandMoreIcon fontSize="small" />
            )}
          >
            { children }
          </PropAccordianView>
        </Grid>
        <Grid item xs={1} className={classes.handleGridRight}>
          {disableOutput === false ? <OutputHandle {...{ uuid, propName }} /> : null}
        </Grid>
      </Grid>
    </ListItem>
  );
};

PropListItemView.whyDidYouRender = (process.env.NODE_ENV === 'development');

PropListItemView.propTypes = {
  children: PropTypes.node.isRequired,
  uuid: PropTypes.string.isRequired,
  propName: PropTypes.string.isRequired,
  disableInput: PropTypes.bool.isRequired,
  disableOutput: PropTypes.bool.isRequired,
};

export default memo(PropListItemView);
