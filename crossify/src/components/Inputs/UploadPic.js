const React = require("react");

class UploadPic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: this.props.file || null,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    });
    this.props.parentCallback(event.target.files[0]);
  }
  render() {
    return (
      <div>
        <input
          type="file"
          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
          onChange={this.handleChange}
        />
        <div className="flex flex-col mt-4">
          <div className="mr-4">
            <label
              className="block uppercase text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Preview
            </label>{" "}
          </div>
          <br />
          <div className=" ">
            <img
              className=""
              onChange={this.handleChange2}
              src={this.state.file}
              style={{
                height: 400,
                width: 902,
                backgroundColor: "white",
                border: "1px dotted black",
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UploadPic;
