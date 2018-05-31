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
      longitude: this.props.apiFeedData.currentEvent.longitude,
      latitude: this.props.apiFeedData.currentEvent.latitude,
      zoom: this.props.apiFeedData.currentEvent.zoom
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.apiFeedData !== nextProps.apiFeedData) {
      this.setState({
        longitude: nextProps.apiFeedData.currentEvent.longitude,
        latitude: nextProps.apiFeedData.currentEvent.latitude,
        zoom: nextProps.apiFeedData.currentEvent.zoom
      });
    }
  }
  render() {
    // const mapValues = !this.props.event ? this.state : ({
    //   long = this
    // })

    console.log(this.state);

    return (
      <Map
        style="mapbox://styles/ianmccray/cjhs3nc19077q2sk81qpjrvwk"
        containerStyle={{ width: "65vw", height: "100vh", left: "0px" }}
        center={[this.state.longitude, this.state.latitude]}
        zoom={[this.state.zoom]}
      >
        {this.props.apiFeedData.currentApiData.map(event => {
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
