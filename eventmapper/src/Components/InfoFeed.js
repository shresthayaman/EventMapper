import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class InfoFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [1]
    };
  }

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List>
          {this.props.apiData.map(event => (
            <ListItem
              key={event.title}
              dense
              button
              className={classes.listItem}
            >
              <Avatar alt="Remy Sharp" />
              <ListItemText
                primary={event.title}
                secondary={
                  "Location: " +
                  event.venue_address +
                  ", " +
                  event.city_name +
                  ", " +
                  event.region_abbr +
                  " " +
                  event.postal_code +
                  "\n" +
                  "Venue: " +
                  event.venue_name +
                  "\n" +
                  "When: " +
                  event.start_time
                }
              />
              <ListItemSecondaryAction>
                <Checkbox
                  onChange={this.handleToggle(event)}
                  checked={this.state.checked.indexOf(event) !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

InfoFeed.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InfoFeed);
