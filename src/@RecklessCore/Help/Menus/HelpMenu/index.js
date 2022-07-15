import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
  List, ListItem, Typography, Grid, Divider, Link,
  ListItemAvatar, Avatar,
} from '@material-ui/core';

import GitHubIcon from '@material-ui/icons/GitHub';
import BugReportIcon from '@material-ui/icons/BugReport';
import InfoIcon from '@material-ui/icons/Info';

import { version } from '../../../../../package.json';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 0,
  },
  listRoot: {
    display: 'block',
    width: '100%',
    paddingTop: 0,
  },
  listItem: {
    width: '100%',
  },
  itemText: {
    color: '#fff',
  },
}));

const HelpMenu = () => {
  // Create local classes
  const classes = useStyles();

  return (
    <ListItem
      role="tabpanel"
      id="help-inspector-tabpanel"
      aria-labelledby="help-inspector-tab"
      className={classes.root}
    >
      <List dense className={classes.listRoot}>
        <ListItem dense className={classes.listItem}>
          <Grid spacing={0} container>
            <Grid item xs={12}>
              <List dense className={classes.list}>
                <Link href="https://travisbennett.com" target="_blank">
                  <ListItem dense className={classes.listItem} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="" src="" />
                    </ListItemAvatar>
                    <Typography className={classes.itemText}>
                      Reckless Technology was created by Travis Bennett.
                    </Typography>
                  </ListItem>
                </Link>
              </List>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem dense className={classes.listItem}>
          <Grid spacing={0} container>
            <Grid item xs={12}>
              <List dense className={classes.list}>
                <Link href="https://github.com/RecklessTechnology/create-reckless-tech-app" target="_blank">
                  <ListItem dense className={classes.listItem} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="" src=""><GitHubIcon /></Avatar>
                    </ListItemAvatar>
                    <Typography className={classes.itemText}>
                      Source code available on github.
                    </Typography>
                  </ListItem>
                </Link>
              </List>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem dense className={classes.listItem}>
          <Grid spacing={0} container>
            <Grid item xs={12}>
              <List dense className={classes.list}>
                <Link href="https://github.com/RecklessTechnology/create-reckless-tech-app/wiki" target="_blank">
                  <ListItem dense className={classes.listItem} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="" src=""><InfoIcon /></Avatar>
                    </ListItemAvatar>
                    <Typography className={classes.itemText}>
                      Find more information on the Wiki.
                    </Typography>
                  </ListItem>
                </Link>
              </List>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem dense className={classes.listItem}>
          <Grid spacing={0} container>
            <Grid item xs={12}>
              <List dense className={classes.list}>
                <Link href="https://github.com/RecklessTechnology/create-reckless-tech-app/issues" target="_blank">
                  <ListItem dense className={classes.listItem} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="" src=""><BugReportIcon /></Avatar>
                    </ListItemAvatar>
                    <Typography className={classes.itemText}>
                      Feedback? Bugs? Report issues here.
                    </Typography>
                  </ListItem>
                </Link>
              </List>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem dense className={classes.listItem}>
          <Grid spacing={0} container>
            <Grid item xs={12}>
              <Typography className={classes.itemText} style={{ textAlign: 'right' }}>
                {`Version: ${version}`}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </ListItem>
  );
};

HelpMenu.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default memo(HelpMenu);
