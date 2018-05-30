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
  constructor(props) {
    super(props);
    this.state = {
      longitude: -78.5,
      latitude: 38.03,
      zoom: 3
    };
  }
  render() {
    return (
      <Map
        style="mapbox://styles/ianmccray/cjhs3nc19077q2sk81qpjrvwk"
        containerStyle={{ width: "78vw", height: "100vh", left: "0px" }}
        center={[this.state.longitude, this.state.latitude]}
        zoom={[this.state.zoom]}
      >
        {this.props.apiData2.map(event => {
          return (
            <Marker
              coordinates={[event.longitude, event.latitude]}
              anchor="bottom"
            >
              <img src={"http://maps.google.com/mapfiles/ms/icons/red.png"} />
            </Marker>
          );
        })}
      </Map>
    );
  }
}
export default RenderMap;
