import React from "react";
import Photo from "../../assets/img/team-4-470x470.png";

export default class PhotosTab extends React.Component {
  render() {
    return (
      <>
    <div className="container px-4">
  <div className="flex flex-wrap">
  <div className="lg:w-4/12 my-3 p-3">
      <img
                  className="rounded-lg"
                  alt="club_background_photo"
                  src={this.props.bgImage}
                />

                <h1 className="mt-2 text-black">{this.props.photoText}</h1>
    </div>
    <div className="lg:w-4/12 my-3 p-3">
      <img
                  className="rounded-lg"
                  alt="club_background_photo"
                  src={this.props.bgImage}
                />

<h1 className="mt-2 text-black">{this.props.photoText}</h1>
    </div>
    <div className="lg:w-4/12 my-3 p-3">
      <img
                  className="rounded-lg"
                  alt="club_background_photo"
                  src={this.props.bgImage}
                />

<h1 className="mt-2 text-black">{this.props.photoText}</h1>
    </div>
 
    <div className="lg:w-4/12 my-3 p-3">
      <img
                  className="rounded-lg"
                  alt="club_background_photo"
                  src={this.props.bgImage}
                />

<h1 className="mt-2 text-black">{this.props.photoText}</h1>
    </div>
                

  </div>
</div>



</>
    );  
  }
}


PhotosTab.defaultProps = {
  bgImage: Photo,
  photoText:"This is the photo of nikol group where we enjoyed party a lot",
};
