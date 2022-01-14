import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    const ONE_SECOND_IN_MS = 1000;
    const { onTimesUp } = this.props;

    this.idInterval = setInterval(() => {
      const { seconds } = this.state;

      if (seconds > 0) {
        this.setState((prevState) => ({
          seconds: prevState.seconds - 1,
        }));
      } else {
        onTimesUp();
      }
    }, ONE_SECOND_IN_MS);
  }

  componentWillUnmount() {
    clearInterval(this.idInterval);
  }

  render() {
    const { seconds } = this.state;

    return (
      <div>
        { seconds }
      </div>
    );
  }
}

Timer.propTypes = {
  onTimesUp: PropTypes.func.isRequired,
};

export default Timer;
