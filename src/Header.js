import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import Purple from '@material-ui/core/colors/purple';






const styles = {
  root: {
    flexGrow: 1,
  },

  primary: Purple[500]
};

const theme = createMuiTheme({
  palette: {
    primary: { main: Purple[500]},
    secondary: { main: '#11cb5f'}
  }
})

function SimpleAppBar(props) {
  const { classes } = props;

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Restaurants-Map-App
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    </MuiThemeProvider>

  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);
