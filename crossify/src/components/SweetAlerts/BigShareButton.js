import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { motion } from "framer-motion";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
  FacebookMessengerShareButton,
} from "react-share";
import exampleImage from "../../assets/img/pp1.jpg";
import { notifyCopied } from "../../notify";
import CopyToClipboard from "react-copy-to-clipboard";

export default class SweetAlertModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null,
    };
  }

  hideAlert = () => {
    this.setState({
      alert: null,
    });
  };
  confirmArrival() {
    const getAlert = () => {
      const { shareUrl, title, description, tags } = this.props;

      return (
        <SweetAlert
          customClass="text-black"
          success
          confirmBtnText="Done"
          confirmBtnBsStyle="success"
          confirmBtnCssClass="text-base rounded bg-green-500 p-2"
          confirmBtnStyle={{ color: "white" }}
          title="Share with your friends "
          onConfirm={this.hideAlert}
          closeAnim={{ name: "hideSweetAlert", duration: 300 }}
        >
          <div>
            <div className="Demo__container ">
              <div className="Demo__some-network">
                <FacebookShareButton
                  // todo here change to production link
                  url="www.google.com"
                  quote={title + " " + description}
                  hashtag={tags && "#" + tags[0]}
                  className="Demo__some-network__share-button"
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </div>

              <div className="Demo__some-network">
                <FacebookMessengerShareButton
                  url={shareUrl}
                  appId="521270401588372"
                  className="Demo__some-network__share-button"
                >
                  <FacebookMessengerIcon size={32} round />
                </FacebookMessengerShareButton>
              </div>

              <div className="Demo__some-network">
                <TwitterShareButton
                  url={shareUrl}
                  title={title + " " + description}
                  via="CrossifyWeb - Gather Your Interest"
                  hashtags={tags}
                  className="Demo__some-network__share-button"
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </div>

              <div className="Demo__some-network">
                <TelegramShareButton
                  url={shareUrl}
                  title={title}
                  className="Demo__some-network__share-button"
                >
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
              </div>

              <div className="Demo__some-network">
                <WhatsappShareButton
                  url={shareUrl}
                  title={title}
                  separator=":: "
                  className="Demo__some-network__share-button"
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </div>
            </div>
            <div className="Demo__container mt-2 ">
              <div className="Demo__some-network">
                <LinkedinShareButton
                  //todo need a working url here too
                  url={shareUrl}
                  summary={description}
                  source="ggg"
                  className="Demo__some-network__share-button"
                >
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </div>

              <div className="Demo__some-network">
                <PinterestShareButton
                  url={String(window.location)}
                  media={`${String(window.location)}/${exampleImage}`}
                  description={title + " " + description}
                  className="Demo__some-network__share-button"
                >
                  <PinterestIcon size={32} round />
                </PinterestShareButton>
              </div>

              <div className="Demo__some-network">
                <RedditShareButton
                  url={shareUrl}
                  title={title}
                  windowWidth={660}
                  windowHeight={460}
                  className="Demo__some-network__share-button"
                >
                  <RedditIcon size={32} round />
                </RedditShareButton>
              </div>

              <div className="Demo__some-network">
                <EmailShareButton
                  url={shareUrl}
                  subject={"Invitation for " + title}
                  body={description}
                  className="Demo__some-network__share-button"
                >
                  <EmailIcon size={32} round />
                </EmailShareButton>
              </div>
              <div className="Demo__some-network">
                <CopyToClipboard text={shareUrl}>
                  <button
                    className="Demo__some-network__share-button bg-white  border rounded-full"
                    title="Copy to clipboard"
                    onClick={notifyCopied}
                  >
                    {" "}
                    <i
                      className="Demo__some-network__custom-icon far fa-clipboard text-gray-700 text-lg"
                      style={{ paddingTop: "0.35rem" }}
                    ></i>
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          </div>
        </SweetAlert>
      );
    };
    this.setState({
      alert: getAlert(),
    });
  }

  render() {
    return (
      <>
        <motion.button
          className="w-full text-blue-500 bg-white shadow border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => this.confirmArrival()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.9 }}
        >
          <i class="fas fa-share-alt"></i> Share
        </motion.button>

        {this.state.alert}
      </>
    );
  }
}
