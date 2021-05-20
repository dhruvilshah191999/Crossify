import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import demopf from "assets/img/demopf.png";
import currentPosIcon from "assets/img/marker.png";
import { Link } from "react-router-dom";
import moment from "moment";

function generateRandomNumber() {
  var min = 1000,
    max = 4499,
    highlightedNumber = Math.random() * (max - min) + min;

  return highlightedNumber;
}
const x0 = 23.106517;
const y0 = 72.59482;
const radius = 10;
const n = 6;
const getLocation = (x0, y0, radius) => {
  // Convert radius from meters to degrees
  const radiusInDegrees = radius / 111000;

  const u = generateRandomNumber();
  const v = generateRandomNumber();
  const w = radiusInDegrees * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  // Adjust the x-coordinate for the shrinking of the east-west distances
  const new_x = x / Math.cos(y0 * (Math.PI / 180));

  const foundLongitude = new_x + x0;
  const foundLatitude = y + y0;
  return { lng: foundLatitude, lat: foundLongitude };
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: { lat: this.props.lat, lng: this.props.lng },
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
    };
    // navigator.geolocation.getCurrentPosition(function (position) {
    //   this.setState({
    //     currentLocation: {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude,
    //     },
    //   });
    // });
  }
  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true,
    });

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false,
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false,
      });
  };
  componentDidMount = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let self = this;
          self.setState({
            currentLocation: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        },
        undefined,
        { enableHighAccuracy: true }
      );
    }
  };

  render() {
    if (!this.props.loaded) return <div>Loading...</div>;

    return (
      <Map
        className="map"
        google={this.props.google}
        onClick={this.onMapClicked}
        style={{ height: "90vh", width: "420px" }}
        zoom={13}
        initialCenter={this.props.center}
      >
        <Marker
          position={this.state.currentLocation}
          icon={currentPosIcon}
        ></Marker>
        {this.props.data &&
          this.props.data.map(
            ({ event_name, latitude, longitude, _id, date, photo }) => (
              <Marker
                // animation={this.props.google.maps.Animation.BOUNCE}
                name={event_name}
                photo={photo}
                date={moment(date).format("LLL")}
                bookedSeats={12}
                totalSeats={43}
                key={_id}
                onClick={this.onMarkerClick}
                onMouseOut={() => alert("does it work!")}
                position={{ lat: latitude, lng: longitude }}
              />
            )
          )}

        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}
        >
          {/* <Link to={"/event/" + this.state.selectedPlace.key}> */}
          <div className="flex flex-col">
            <div>
              {" "}
              <img
                src={this.state.selectedPlace.photo}
                className="rounded-lg"
                style={{ width: "100%", height: 130 }}
              ></img>
            </div>
            <div className="font-semibold text-alpha my-2 text-base px-2">
              {this.state.selectedPlace.name}
            </div>
            <div className="flex ">
              <div className="text-gray-700 text-xs px-2 ">
                {this.state.selectedPlace.date}
              </div>
              <div className="text-beta ml-auto text-xs font-semibold">
                {" "}
                Slots : {this.state.selectedPlace.bookedSeats} /{" "}
                {this.state.selectedPlace.totalSeats}
              </div>
            </div>
          </div>
          {/* </Link> */}
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API,
  version: "3.38",
})(MapContainer);
