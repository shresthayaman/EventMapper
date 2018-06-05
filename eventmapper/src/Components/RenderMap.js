import React from "react";
import ReactMapboxGl from "react-mapbox-gl";
import { Marker } from "react-mapbox-gl";
import { ZoomControl } from "react-mapbox-gl";
import { Popup } from "react-mapbox-gl";

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
      zoom: this.props.apiFeedData.currentEvent.zoom,
      title: this.props.apiFeedData.currentEvent.title,
      popupcoord: [135.0, 82.8628],
      popupevent: {}
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

    return (
      <Map
        style="mapbox://styles/ianmccray/cjhs3nc19077q2sk81qpjrvwk"
        containerStyle={{ width: "68vw", height: "100vh", left: "0px" }}
        center={[this.state.longitude, this.state.latitude]}
        zoom={[this.state.zoom]}
      >
        <Popup
          coordinates={this.state.popupcoord}
          offset={{
            "bottom-left": [12, -38],
            bottom: [0, -38],
            "bottom-right": [-12, -38]
          }}
        >
          <p1>
            <u>
              <b>{this.state.popupevent.title}</b>
            </u>
            <br />
            <b>Location: </b>
            {this.state.popupevent.venue_address},{" "}
            {this.state.popupevent.city_name},{" "}
            {this.state.popupevent.region_abbr}{" "}
            {this.state.popupevent.postal_code}
            <br />
            <b>Venue: </b>
            {this.state.popupevent.venue_name}
            <br />
            <b> When: </b>
            {this.state.popupevent.start_time}
          </p1>
        </Popup>
        {this.props.apiFeedData.currentApiData.map(event => {
          return (
            <div>
              <Marker
                coordinates={[event.longitude, event.latitude]}
                anchor="bottom"
                onClick={e => {
                  this.setState({
                    popupcoord: [event.longitude, event.latitude],
                    popupevent: event
                  });
                }}
              >
                <img src={"http://maps.google.com/mapfiles/ms/icons/red.png"} />
              </Marker>
            </div>
          );
        })}
        <ZoomControl />
      </Map>
    );
  }
}
export default RenderMap;
