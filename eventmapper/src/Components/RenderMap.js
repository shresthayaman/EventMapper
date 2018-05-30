import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { Marker } from "react-mapbox-gl";
import { Popup } from "react-mapbox-gl";
import { Cluster } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiaWFubWNjcmF5IiwiYSI6ImNqaHMyd291NTIxMHYzN3BsdzVsMmQ5Z3gifQ.H8dAYkBnMpyT5942k_1qfQ"
});

class RenderMap extends React.Component {
  contructor(props) {
    this.state = {};
  }
  render() {
    return (
      <Map
        style="mapbox://styles/ianmccray/cjhs3nc19077q2sk81qpjrvwk"
        containerStyle={{ width: "75vw", height: "100vh", left: "500px" }}
        center={[-78.5, 38.03]}
        zoom={[15]}
      />
    );
  }
}
export default RenderMap;
