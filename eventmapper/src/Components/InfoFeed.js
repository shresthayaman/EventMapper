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

export default class InfoFeed extends React.Component {
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
      <div>
        <List>
          {this.props.apiData.map(event => (
            <ListItem key={event} dense button className={classes.listItem}>
              <Avatar alt="Remy Sharp" />
              <ListItemText primary={`${event.title}`} />
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

  //   return (
  //     <div>
  //       {this.props.apiData.map(event => {
  //         return (
  //           <ul>
  //             Name: {event.title}
  //             <li>
  //               Location: {event.venue_address}, {event.city_name},{" "}
  //               {event.region_abbr} {event.postal_code}
  //             </li>
  //             <li> Venue: {event.venue_name}</li>
  //             <li> When: {event.start_time}</li>
  //           </ul>
  //         );
  //       })}
  //     </div>
  //   );
  // }
}
