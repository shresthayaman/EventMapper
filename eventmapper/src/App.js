import React, { Component } from "react";
import "./App.css";
import InfoFeed from "./Components/InfoFeed";
import mapmarker from "./mapmarker.png";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

let axios = require("axios");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedData: []
    };
  }

  handleSearch() {
    //if the search bar has some value in it after the search button has been pressed,
    //then set the location to the value in search bar
    //do the same thing for eventType
    let location = "";
    let eventType = "";
    if (!(document.getElementById("searchBox").value === "")) {
      location = this.replaceAll(
        document.getElementById("searchBox").value,
        " ",
        "%20"
      ); //replaces all the spaces with %20
      eventType = document.getElementById("eventSelected").options[
        document.getElementById("eventSelected").selectedIndex
      ].value;
      document.getElementById("searchBox").value = "";

      let url =
        "http://api.eventful.com/json/events/search?app_key=mqZ83cvtXdwBj382&sort_order=popularity&within=30";

      //if user did not enter location, does not include location in API call; category is always inluded due to it being drop down option
      if (location === "") {
        url = url + "&category=" + eventType;
      } else {
        url = url + "&category=" + eventType + "&location=" + location;
      }

      axios.get(url).then(eventsData => {
        this.setState(
          {
            searchedData: eventsData.data.events.event //
          },
          () => {
            //console.log(this.state.searchedData);
          }
        );
      });
    } else {
      alert("Please enter something!");
    }
  }

  //Shows Results the moment the page starts up
  componentDidMount() {
    let url =
      "http://api.eventful.com/json/events/search?app_key=mqZ83cvtXdwBj382&sort_order=popularity&within=30&category=all";

    axios
      .get(url)
      .then(eventsData => {
        this.setState({
          searchedData: eventsData.data.events.event //
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <div className="Logo">
          <img
            className="MarkerImg"
            src={mapmarker}
            className="mapmark"
            alt="maplogo"
            width="70"
            height="70"
          />
          <h1> EventMapper </h1>
        </div>

        <div className="Header">
          <p1> Enter a location and view the top events near you! </p1>
          <br />
          <p1>----------------------</p1>
        </div>

        <div className="Search-bar">
          <input name="searchLocationBox" id="searchBox" type="text" />

          <select id="eventSelected">
            <option value="all">All</option>
            <option value="concerts">Concerts</option>
            <option value="festivals">Festivals</option>
            <option value="comedy">Comedy</option>
            <option value="family">Family</option>
            <option value="nightLife">Night Life</option>
            <option value="performingArts">Performing Arts</option>
            <option value="sports">Sports</option>
          </select>
          <button onClick={event => this.handleSearch()}>Search</button>
        </div>

        <div className="Feed">
          <InfoFeed apiData={this.state.searchedData} />
        </div>
      </div>
    );
  }

  // funtions used thougout codes
  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  /* Define function to find and replace specified term with replacement string */
  replaceAll(str, term, replacement) {
    return str.replace(new RegExp(this.escapeRegExp(term), "g"), replacement);
  }
}

export default App;
