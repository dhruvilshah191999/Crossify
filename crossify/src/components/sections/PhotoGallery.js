import React from "react";
import ImageCard from "components/Cards/ImageCard";

const PhotoGallery = (props) => {
  const images = props.images.map((image,index) => {
    return (
      <ImageCard key={image.id} image={image} showSlide={props.handleClick} />
    );
  });
  return <div className="image-list">{images}</div>;
};

export default PhotoGallery;
