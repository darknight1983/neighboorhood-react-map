import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function LocationList(props) {
  const { classes, spots, handleItemClick } = props;

  return (
    <div className={classes.root}>
    <List component="nav">
      <ListItem button onClick={(e) => handleItemClick(e.target)}>
        <ListItemText primary={spots[0].name}/>
      </ListItem>
      <ListItem button onClick={(e) => handleItemClick(e.target)}>
        <ListItemText primary={spots[1].name} />
      </ListItem>
    </List>
    </div>
  )
}

export default withStyles(styles)(LocationList)
