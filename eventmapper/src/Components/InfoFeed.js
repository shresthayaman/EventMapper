import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";

import RenderMap from "./RenderMap";
import "./InfoFeed.css";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 200,
    backgroundColor: theme.palette.background.paper
  }
});

class InfoFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [1],
      currentApiData: this.props.apiData,
      currentEvent: {
        longitude: -78.5,
        latitude: 38.03,
        zoom: 3
      }
    };
  }

  componentDidMount() {}
  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    // this.setState({
    //   checked: newChecked
    // });
  };

  handleClick(event) {
    this.setState({
      checked: this.state.checked,
      currentApiData: this.props.apiData,
      currentEvent: {
        longitude: event.longitude,
        latitude: event.latitude,
        zoom: 16
      }
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="container">
        <div className="Feed">
          <List>
            {this.props.apiData.map(event => {
              return (
                <ListItem
                  key={event.title}
                  dense
                  button
                  className={classes.listItem}
                  onClick={() => this.handleClick(event)}
                >
                  <Avatar alt="Remy Sharp" />
                  <ListItemText
                    dense
                    primary={event.title}
                    secondary={
                      <div>
                        <b>Location: </b>
                        {event.venue_address}, {event.city_name},{" "}
                        {event.region_abbr} {event.postal_code}
                        <br />
                        <b>Venue: </b>
                        {event.venue_name}
                        <br />
                        <b> When: </b>
                        {event.start_time}
                      </div>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Checkbox
                      onChange={this.handleToggle(event)}
                      checked={this.state.checked.indexOf(event) !== -1}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </div>
        <div className="Map">
          <RenderMap apiFeedData={this.state} />
        </div>
      </div>
    );
  }
}

InfoFeed.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InfoFeed);
