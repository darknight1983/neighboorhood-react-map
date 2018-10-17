import React,{ Component } from 'react';
import Container from './ContainerComp';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';



const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function TwoColGrid(props) {
  return (
    <Grid container spacing={24}>
      <Grid item xs={3}>
        {/*
          This grid item will hold any input fields and other potential
          information on the locations on the map.
         */}
        <div style={{backgroundColor: 'black', height: '100vh'}}>One</div>
      </Grid>
      <Grid item xs={9}>
        {/* This grid item will hold the map */}
        <Container />
        <div>Two</div>
      </Grid>
    </Grid>
  )
}


export default withStyles(styles)(TwoColGrid)
