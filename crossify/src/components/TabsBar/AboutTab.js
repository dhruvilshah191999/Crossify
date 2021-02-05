import React from "react";

export default class AboutTab extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="mx-4">
        <div className="text-xl font-semibold mt-1">About</div>
        <div className="mt-1">{this.props.description}</div>
        <div className="text-xl font-semibold mt-1">Rules</div>
        <div className="mt-1">{this.props.description}</div>
        <div className="text-xl font-semibold mt-1">Criteria</div>
        <div className="mt-1">{this.props.description}</div>
      </div>
    );
  }
}

AboutTab.defaultProps = {
  description:
    "sdlkfj;lasdjfl;ksjdaf;lkjsdalf;kjsdal;kfjsd;lkjf;sdalkjf;lksdjf;lk",
  rules: "this should be this and that and that",
  joining_criteria:
    "18+ with solid knowledge and interest regarding hacking , Serious Talker",
};
