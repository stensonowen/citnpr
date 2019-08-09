import React from 'react';

/*
function left_pad(n, width) {
  const padded = new Array(width).join('0') + n;
  return padded.slice(-width);
}
*/

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      last_update : Date.now(),
      elapsed     : 0, // ms
    };
  }

  start() {
    console.log(" S T A R T ");
    this.reset();
  }

  reset() {
    this.set_elapsed(0);
  }

  set_elapsed(x) {
    this.setState({
      last_update : Date.now(),
      elapsed     : x || 0, // ms
    });
  }
  
  update() {
    const since_last_update = Date.now() - this.state.last_update;
    this.set_elapsed(this.state.elapsed + since_last_update);
  }
  render() {
    return (
      <div>
        <Counter id="timer" elapsed={ this.state.elapsed } />
      </div>
    );
  }
}

class Counter extends React.Component {
  get_elapsed() {
    //const seconds = this.props.elapsed / 1000;
    //const millis = 
    const total_millis = this.props.elapsed;
    const seconds = Math.floor(total_millis / 1000);
    const millis = total_millis - seconds * 1000;
    return {
      seconds : (seconds > 9 ? '' : '0') + seconds,
      millis  : (millis + '000').substr(0, 3),
    };
  }

  render() {
    const { seconds, millis } = this.get_elapsed();
    return (
      <div id={ this.props.id }>
        <span>{ seconds }</span>
        <span> : </span>
        <span>{ millis  }</span>
      </div>
    );
  }
}

class Stopwatch_ extends React.Component {
  constructor(props) {
    super(props);
    
    ["update"].forEach((method) => {
    	this[method] = this[method].bind(this);
    });

    this.state = this.initialState = {
      isRunning: false,
      lapTimes: [],
      timeElapsed: 0,
    };
  }
  toggle() {
    this.setState({isRunning: !this.state.isRunning}, () => {
      this.state.isRunning ? this.startTimer() : clearInterval(this.timer)
    });
  }
  lap() {
    const {lapTimes, timeElapsed} = this.state;
    this.setState({lapTimes: lapTimes.concat(timeElapsed)});
  }
  reset() {
    clearInterval(this.timer);
    this.setState(this.initialState);
  }
  startTimer() {
    this.startTime = Date.now();
    this.timer = setInterval(this.update, 10);
  }
  update() {
    const delta = Date.now() - this.startTime;
    this.setState({timeElapsed: this.state.timeElapsed + delta});
    this.startTime = Date.now();
  }
  render() {
    const {isRunning, lapTimes, timeElapsed} = this.state;
    return (
      <div className="stopwatch">
        <TimeElapsed id="timer" timeElapsed={timeElapsed} />
        <button onClick={this.toggle}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button
          onClick={isRunning ? this.lap : this.reset}
          disabled={!isRunning && !timeElapsed}
         >
        </button>
      </div>
    );
  }
}

class TimeElapsed extends React.Component {
  getUnits() {
    const seconds = this.props.timeElapsed / 1000;
    return {
      min: Math.floor(seconds / 60).toString(),
      sec: Math.floor(seconds % 60).toString(),
      msec: (seconds % 1).toFixed(3).substring(2)
    };
  }
  render() {
    const units = this.getUnits();
    return (
      <div className="timer" id={this.props.id}>
        <span>{''+units.min}:</span>
        <span>{''+units.sec}.</span>
        <span>{units.msec}</span>
      </div>
    );
  }
}

class LapTimes extends React.Component {
  render() {
    const rows = this.props.lapTimes.map((lapTime, index) =>
      <tr key={++index}>
        <td>{index}</td>
        <td><TimeElapsed timeElapsed={lapTime} /></td>
      </tr>
    );
    return (
      <table id="lap-times">
        <thead>
          <th>Lap</th>
          <th>Time</th>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default { Stopwatch };
