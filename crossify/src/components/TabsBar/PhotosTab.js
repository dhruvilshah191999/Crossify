import React, { Component } from "react";
import Lightbox from "fslightbox-react";
import MyGallery from "components/sections/PhotoGallery";
import EmptyContainer from "components/sections/EmptyContainer";

export default class GridGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      slide: 0,
      club_id: this.props.club_id,
      photos: this.props.photo || [],
    };
  }

  componentDidMount() {
    const photosList =
      this.state.photos.map((el, index) => {
        return {
          id: index + 1,
          photo: el.link,
          description: el.description,
        };
      }) || [];

    this.setState({ photos: photosList });
  }

  showSlide = (slide) => {
    this.setState({
      isVisible: !this.state.isVisible,
      slide: slide,
    });
  };

  getSources = (images) => {
    return images.map((el) => el.photo);
  };

  render() {
    return (
      <>
        {this.state.photos.length !== 0 ? (
          <div>
            <Lightbox
              toggler={this.state.isVisible}
              slide={this.state.slide}
              sources={this.state.photos.map((el) => el.photo)}
              types={[...new Array(this.state.photos.length).fill("image")]}
            />
            <MyGallery
              images={this.state.photos}
              handleClick={this.showSlide}
            ></MyGallery>
          </div>
        ) : (
          <EmptyContainer />
        )}
      </>
    );
  }
}
