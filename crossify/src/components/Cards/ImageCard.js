import React from "react";

class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { spans: 0 };
    this.imageRef = React.createRef();
  }

  componentDidMount() {
    this.imageRef.current.addEventListener("load", this.setSpans);
  }

  setSpans = () => {
<<<<<<< HEAD
    var height = this.props.image.height || this.imageRef.current.clientHeight;
=======
    //done only add to the render when it is required NOt use classes to hide and show just render using && (if)
    var height = this.imageRef.current.clientHeight;
>>>>>>> 40f7a9d145ce916035060e4b183420d152ce48b8
    const spans = Math.ceil(height / 10 + 1);
    this.setState({ spans: spans });
  };
  render() {
    const { description, url, id } = this.props.image;

    return (
      <div style={{ gridRowEnd: "span " + this.state.spans }}>
        <img
          ref={this.imageRef}
          alt={description}
          src={url}
          onClick={() => this.props.showSlide(id)}
        />
      </div>
    );
  }
}

export default ImageCard;
