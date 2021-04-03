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
    //todo at first render it doesn't look proper because it cannot get the height of image properly (bydefault 0) so provide height of image
    var height = this.props.image.height || this.imageRef.current.clientHeight;
    const spans = Math.ceil(height / 10 + 1);

    console.log("Spasns : " + spans);
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
