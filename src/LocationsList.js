import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import escapeRegExp from 'escape-string-regexp';



const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class LocationList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: ""
    };

    this.onSpotClick = this.onSpotClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  onSpotClick(e) {
    const name = e.nativeEvent.srcElement.innerText;
    this.props.handleItemClick(name);
  }
  handleChange(query) {
    console.log(query)
    this.setState({
      value: query.trim()
    })
  }
  render() {
    const { classes, spots, handleItemClick } = this.props;

    let showSpots;
    if (this.state.value) {
      const match = new RegExp(escapeRegExp(this.state.value), 'i')
      showSpots = spots.filter((location) => match.test(location.name))
    } else {
      showSpots = spots;
    }

    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off">
            <TextField
            id="outlined-search"
            label="Search field"
            type="search"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            value={this.state.value}
            onChange={(e) => this.handleChange(e.target.value)}/>
        </form>
        <div className={classes.root}>
          <List component="nav">
            {showSpots.map((spot, i) => (
              <ListItem key={i} button onClick={this.onSpotClick}>
                <ListItemText primary={spot.name} />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    )
  }

}

export default withStyles(styles)(LocationList)
