import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { Marker } from "react-mapbox-gl";
import { Popup } from "react-mapbox-gl";
import { Cluster } from "react-mapbox-gl";

const map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiaWFubWNjcmF5IiwiYSI6ImNqaHMyd291NTIxMHYzN3BsdzVsMmQ5Z3gifQ.H8dAYkBnMpyT5942k_1qfQ"
});

export default class Map extends React.Component {
  render() {
    return (
      <Map
        style="mapbox://styles/ianmccray/cjhs3nc19077q2sk81qpjrvwk"
        containerStyle={{ width: "100vw", height: "100vh" }}
        center={[-78.5, 38.03]}
        zoom={[15]}
      />
    );
  }
}
