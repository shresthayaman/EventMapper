import React, { Component } from "react";
import "./App.css";
import InfoFeed from "./Components/InfoFeed";
import mapmarker from "./mapmarker.png";
import CircularProgress from "@material-ui/core/CircularProgress";
import { TextField, Button } from "@material-ui/core";

let axios = require("axios");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedData: [],
      isLoading: true
    };
  }

  handleSearch() {
    //if the search bar has some value in it after the search button has been pressed,
    //then set the location to the value in search bar
    //do the same thing for eventType
    this.setState({
      isLoading: true
    });
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
        "http://api.eventful.com/json/events/search?app_key=CgTTmL6NkQGG3sKn&sort_order=popularity&within=30";

      //if user did not enter location, does not include location in API call; category is always inluded due to it being drop down option
      if (location === "") {
        url = url + "&category=" + eventType;
      } else {
        url = url + "&category=" + eventType + "&location=" + location;
      }

      axios
        .get(url)
        .then(eventsData => {
          this.setState(
            {
              searchedData: eventsData.data.events.event || [],
              isLoading: false
            },
            () => {
              //console.log(this.state.searchedData);
            }
          );
        })
        .catch(error => {
          alert("There was an error loading your request");
          console.log(error);
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
        console.log("It has loaded");
        this.setState({
          searchedData: eventsData.data.events.event,
          isLoading: false
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
            alt="maplogo"
            width="62"
            height="62"
          />
          <div className="Header1">
            <h1> Event Mapper </h1>
          </div>
        </div>

        <div className="Search-bar">
          <TextField
            name="searchLocationBox"
            id="searchBox"
            placeholder="Enter a location"
            type="text"
          />

          <select id="eventSelected" style={{ width: "200px" }}>
            <option value="all">All</option>
            <option value="concerts">Concerts</option>
            <option value="festivals">Festivals</option>
            <option value="comedy">Comedy</option>
            <option value="family">Family</option>
            <option value="nightLife">Night Life</option>
            <option value="performingArts">Performing Arts</option>
            <option value="sports">Sports</option>
          </select>

          <Button id="searchButton" onClick={event => this.handleSearch()}>
            Search
          </Button>
        </div>
        {/* Code for loading bar when making API call */}

        {this.state.isLoading ? (
          <div className="loadingCircle">
            <CircularProgress size={50} />
          </div>
        ) : (
          <div className="MapFeed">
            <InfoFeed apiData={this.state.searchedData} />
          </div>
        )}
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
