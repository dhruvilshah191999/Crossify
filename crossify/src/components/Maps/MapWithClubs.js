import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import currentPosIcon from "assets/img/marker.png";
import moment from "moment";
import Keys from "config/default.json";
const GOOGLE_MAPS_API = Keys.GOOGLE_MAPS_API;

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
    if (!this.props.loaded) return <div>Loading...</div>;

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
        bounds={bounds}
      >
        <Marker
          position={this.state.currentLocation}
          icon={currentPosIcon}
        ></Marker>
        {this.props.data &&
          this.props.data.map(
            ({
              club_name,
              latitude,
              longitude,
              _id,
              date,
              profile_photo,
              status,
              max_members,
            }) => (
              <Marker
                // animation={this.props.google.maps.Animation.BOUNCE}
                name={club_name}
                profile_photo={profile_photo}
                date={moment(date).format("LLL")}
                bookedSeats={12}
                totalSeats={43}
                key={_id}
                onClick={this.onMarkerClick}
                onMouseOut={() => alert("does it work!")}
                position={{ lat: latitude, lng: longitude }}
                lat={latitude}
                lng={longitude}
                isPublic={status}
                membersLen={max_members}
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
                src={this.state.selectedPlace.profile_photo}
                className="rounded-lg"
                style={{ width: "100%", height: 130 }}
                alt="google"
              ></img>
            </div>
            <div className="flex">
              <div className="font-semibold text-alpha mt-2 text-lg px-2">
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
                  rel="noreferrer"
                >
                  <i className="fas fa-directions"></i>
                </a>
              </div>
            </div>
            <div className="flex mt-1 ml-2 text-sm">
              <span className="text-beta   font-semibold mr-1">
                {" "}
                <i className="fas fa-users"></i> :{" "}
                {this.state.selectedPlace.membersLen}
              </span>
              <span className="font-bold "> &bull; </span>
              <span className="text-gray-700 font-semibold ml-1" >
                {this.state.selectedPlace.isPublic} Club
              </span>
            </div>
          </div>
          {/* </Link> */}
        </InfoWindow>
      </Map>
    );
  }
}

// MapContainer.defaultProps = {
//   center: { lat: 23.106517, lng: 72.59482 },
//   markers: [
//     {
//       name: "Business Hub",
//       profile_photo: demopf,
//       bookedSeats: 12,
//       totalSeats: 40,
//       date: "12 FEB 2021",
//       pos: getLocation(x0, y0, radius),
//     },
//     {
//       name: "Sports Hub",
//       profile_photo: demopf,
//       bookedSeats: 1,
//       totalSeats: 60,
//       date: "31 MAR 2021",
//       pos: getLocation(x0, y0, radius),
//     },
//     {
//       name: "Cooking Battle",
//       profile_photo: demopf,
//       bookedSeats: 312,
//       totalSeats: 340,
//       date: "23 APR 2021",
//       pos: getLocation(x0, y0, radius),
//     },
//     {
//       name: "IPL Aucition Hub",
//       profile_photo: demopf,
//       bookedSeats: 50,
//       totalSeats: 50,
//       date: "1 APR 2021",
//       pos: getLocation(x0, y0, radius),
//     },
//   ],
// };

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API,
  version: "3.38",
})(MapContainer);
