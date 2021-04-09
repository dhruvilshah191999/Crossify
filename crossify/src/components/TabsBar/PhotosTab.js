// import React, { Component } from "react";
// import Lightbox from "lightbox-react";
// import "lightbox-react/style.css"; // This only needs to be imported once in your app

// import VideoIframe from "components/video";

// const images = [
//   VideoIframe,
//   "//placekitten.com/1500/500",
//   "//placekitten.com/4000/3000",
//   "//placekitten.com/800/1200",
//   "//placekitten.com/1500/1500",
// ];

// export default class LightboxExample extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       photoIndex: 0,
//       isOpen: false,
//     };
//   }

//   render() {
//     const { photoIndex, isOpen } = this.state;

//     return (
//       <div>
//         <button type="button" onClick={() => this.setState({ isOpen: true })}>
//           Open Lightbox
//         </button>

//         {isOpen && (
//           <Lightbox
//             mainSrc={images[photoIndex]}
//             nextSrc={images[(photoIndex + 1) % images.length]}
//             prevSrc={images[(photoIndex + images.length - 1) % images.length]}
//             onCloseRequest={() => this.setState({ isOpen: false })}
//             onMovePrevRequest={() =>
//               this.setState({
//                 photoIndex: (photoIndex + images.length - 1) % images.length,
//               })
//             }
//             onMoveNextRequest={() =>
//               this.setState({
//                 photoIndex: (photoIndex + 1) % images.length,
//               })
//             }
//           />
//         )}
//       </div>
//     );
//   }
// }

// export default LightboxExample;

// import React, { useState } from "react";
// import FsLightbox from "fslightbox-react";

// function App() {
//   // if toggler is updated when lightbox is closed it will open it
//   // if toggler is updated when lightbox is opened it will close it
//   const [toggler, setToggler] = useState(false);

//   return (
//     <>
//       <button onClick={() => setToggler(!toggler)}>Toggle Lightbox</button>
//       <FsLightbox
//         toggler={toggler}
//         sources={[
//           "https://i.imgur.com/fsyrScY.jpg",
//           "https://www.youtube.com/watch?v=xshEZzpS4CQ",
//           "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
//         ]}
//       />
//     </>
//   );
// }

// export default App;

import React, { Component } from "react";
import Lightbox from "fslightbox-react";
import MyGallery from "components/sections/PhotoGallery";

const images = [
  {
    id: 1,
    url: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    description: "nice photo bro",
  },
  {
    id: 2,
    url: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
    description: "nice photo bro",
  },
  {
    id: 3,
    url: "https://source.unsplash.com/qDkso9nvCg0/600x799",

    description: "nice photo bro",
  },
  {
    id: 4,
    url: "https://source.unsplash.com/iecJiKe_RNg/600x799",

    description: "nice photo bro",
  },
  {
    id: 5,
    url: "https://source.unsplash.com/epcsn8Ed8kY/600x799",

    description: "nice photo bro",
  },
  {
    id: 6,
    url: "https://source.unsplash.com/NQSWvyVRIJk/800x599",

    description: "nice photo bro",
  },
  {
    id: 7,
    url: "https://source.unsplash.com/zh7GEuORbUw/600x799",

    description: "nice photo bro",
  },
  {
    id: 8,
    url: "https://source.unsplash.com/PpOHJezOalU/800x599",

    description: "nice photo bro",
  },
  {
    id: 9,
    url: "https://source.unsplash.com/I1ASdgphUH4/800x599",

    description: "nice photo bro",
  },
];
export default class GridGallery extends Component {
  state = {
    isVisible: false,
    slide: 0,
<<<<<<< HEAD
    photos: images,
  };
=======
    photos: [],
    loading: false,
    refresh: this.props.refresh,
  };
  componentDidMount() {
    console.log(this.state.refresh);
    this.setState({ photos: images });
    this.setState({ loading: true });
  }

  componentDidUpdate() {
    console.log("UPDATEDD");
  }
  // componentWillReceiveProps(props) {
  //   console.log(props);
  //   this.setState(this.state);
  // }

>>>>>>> 40f7a9d145ce916035060e4b183420d152ce48b8
  showSlide = (slide) => {
    this.setState({
      isVisible: !this.state.isVisible,
      slide: slide,
    });
  };

  getSources = (images) => {
    return images.map((el) => el.url);
  };

  render() {
<<<<<<< HEAD
      return (
        <div>
          <Lightbox
            toggler={this.state.isVisible}
            slide={this.state.slide}
            sources={this.state.photos.map((el) => el.url)}
          />
            <MyGallery
              images={this.state.photos}
              handleClick={this.showSlide}
            ></MyGallery>
        </div>
      );
=======
    return (
      <div>
        <Lightbox
          toggler={this.state.isVisible}
          slide={this.state.slide}
          sources={this.state.photos.map((el) => el.url)}
        />
        {this.state.loading && (
          <MyGallery
            images={this.state.photos}
            handleClick={this.showSlide}
          ></MyGallery>
        )}
      </div>
    );
>>>>>>> 40f7a9d145ce916035060e4b183420d152ce48b8
  }
}
