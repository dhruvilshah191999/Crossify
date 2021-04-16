import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import currentPosIcon from "assets/img/marker.png";
import Keys, { GOOGLE_MAPS_API } from "config/default.json";
import moment from "moment";
const GOOGLE_MAPS_API2 = Keys.GOOGLE_MAPS_API;

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: { lat: this.props.lat, lng: this.props.lng },
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
    };
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
    // try to this in componentDidMount /Update
    var bounds = new this.props.google.maps.LatLngBounds();
    this.props.data.forEach((el) => {
      bounds.extend({ lat: el.latitude, lng: el.longitude });
    });
    return (
      <Map
        className="map"
        google={this.props.google}
        onClick={this.onMapClicked}
        style={{ height: "88vh", width: "27%" }}
        zoom={13}
        initialCenter={this.props.center}
        bounds={bounds}
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
                lat={latitude}
                lng={longitude}
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
            <div className="flex">
              <div className="font-semibold text-alpha my-2 text-base px-2">
                {this.state.selectedPlace.name}
              </div>
              <div className="ml-auto">
                <a
                  className="px-2 py-1 mr-2 bg-blue-500 rounded-full text-white text-sm "
                  style={{ marginTop: "0.35rem" }}
                  href={
                    "https://www.google.com/maps/search/?api=1&query=" +
                    this.state.selectedPlace.lat +
                    "," +
                    this.state.selectedPlace.lng
                  }
                  target="_blank"
                  type="button"
                >
                  <i class="fas fa-directions"></i>
                </a>
              </div>
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
