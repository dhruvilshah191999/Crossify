import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
  };

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

  render() {
    if (!this.props.loaded) return <div>Loading...</div>;

    return (
      <Map
        className="map"
        google={this.props.google}
        onClick={this.onMapClicked}
        style={{ height: "100%", position: "relative", width: "100%" }}
        zoom={13}
      >
        <Marker
          name="Marker 1"
          onClick={this.onMarkerClick}
          position={{ lat: 37.778519, lng: -122.40564 }}
        />

        <Marker
          name="Marker 2"
          onClick={this.onMarkerClick}
          position={{ lat: 37.759703, lng: -122.428093 }}
        />

        <Marker name="Marker 3" onClick={this.onMarkerClick} />

        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyDTdEjltqANAZ2gIVPpu1_-KESWjPSxdrc",
  version: "3.38",
})(MapContainer);
