import React, { Component, PropTypes } from 'react';

export class TimeRemaining extends Component {
  constructor(props) {
    super(props);
    let minutes = Math.floor(((new Date(this.props.preciseDueBy).getTime() - Date.now()) / 1000) / 60);
    this.state = {
      interval: 1000,
      minutesRemaining: minutes,
      preciseDueBy: this.props.preciseDueBy,
    };
  }

  componentDidMount() {
    let preciseDueBy = this.state.preciseDueBy;
    // let that = this;
    if (new Date(preciseDueBy) > Date.now()) {
      setInterval(() => {
        let minutesRemaining = Math.floor(((new Date(preciseDueBy).getTime() - Date.now()) / 1000) / 60);
        this.setState({
          minutesRemaining,
        });
      }, 30000);
    }
  }

  render() {
    let minutesRemaining = this.state.minutesRemaining;
    return (
    <div className="timeRemaining">
      <span>{minutesRemaining + ` minutes remaining!`}</span>
    </div>
    );
  }
}

TimeRemaining.propTypes = {
  interval: React.PropTypes.number,
};
