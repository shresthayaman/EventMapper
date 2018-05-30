import React, { Component } from "react";
import "./App.css";
import InfoFeed from "./Components/InfoFeed";
import RenderMap from "./Components/RenderMap";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { Marker } from "react-mapbox-gl";
import { Popup } from "react-mapbox-gl";
import { Cluster } from "react-mapbox-gl";

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

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiaWFubWNjcmF5IiwiYSI6ImNqaHMyd291NTIxMHYzN3BsdzVsMmQ5Z3gifQ.H8dAYkBnMpyT5942k_1qfQ"
});

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
    } else {
      alert("Please enter something!");
    }

    let url =
      "http://api.eventful.com/json/events/search?app_key=mqZ83cvtXdwBj382&sort_order=popularity&within=50";

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
          console.log(this.state.searchedData);
        }
      );
    });
  }

  render() {
    return (
      <div className="App">
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
        <InfoFeed apiData={this.state.searchedData} />
        <Map
          style="mapbox://styles/ianmccray/cjhs3nc19077q2sk81qpjrvwk"
          containerStyle={{ width: "75vw", height: "100vh", left: "500px" }}
          center={[-78.5, 38.03]}
          zoom={[15]}
        />
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
