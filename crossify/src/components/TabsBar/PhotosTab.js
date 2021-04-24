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
import axios from "axios";
import EmptyContainer from "components/sections/EmptyContainer";

export default class GridGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      slide: 0,
      club_id: this.props.club_id,
      photos: [],
    };
  }

  async componentDidMount() {
    const config = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
    };
    var object = {
      club_id: this.state.club_id,
    };
    const finaldata = await axios.post(
      "/api/admin/GetPhotosClub",
      object,
      config
    );
    if (finaldata.data.is_error) {
      console.log(finaldata.data.message);
    } else {
      console.log(finaldata.data.data);
      this.setState({
        photos: finaldata.data.data,
      });
    }
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
