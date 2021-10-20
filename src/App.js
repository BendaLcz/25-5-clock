import './App.scss';
import './fonts.css';
import beep from './sounds/beep.mp3';

import React from "react";

const defaultSession = 25;
const defaultBreak = 5;
const defaultTime = 1500;
const defaultLabel = "Session";

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      sessionLength: defaultSession,
      breakLength: defaultBreak,
      time: defaultTime,
      intervalID: "",
      countdown: false,
      break: false,
      label: defaultLabel
    }
    
    this.decrementTime = this.decrementTime.bind(this);
    this.startCountdown = this.startCountdown.bind(this);
    this.stopCountdown = this.stopCountdown.bind(this);
    this.resetCountdown = this.resetCountdown.bind(this);
    this.toggleCountdown = this.toggleCountdown.bind(this);
    this.clockify = this.clockify.bind(this);
    this.controlLength = this.controlLength.bind(this);
    this.sessionIncrease = this.sessionIncrease.bind(this);
    this.sessionDecrease = this.sessionDecrease.bind(this);
    this.breakIncrease = this.breakIncrease.bind(this);
    this.breakDecrease = this.breakDecrease.bind(this);
    
  }
  
  decrementTime () {
    this.setState ({
      time: this.state.time - 1
    });
    if (this.state.time === -1 && this.state.break === false) {
      this.setState ({
        time: this.state.breakLength * 60,
        break: true,
        label: "Break"
      })
      let beep = document.getElementById("beep");
      beep.play();
    }
    if (this.state.time === -1 && this.state.break === true) {
      this.setState ({
        time: this.state.sessionLength * 60,
        break: false,
        label: "Session"
      })
      let beep = document.getElementById("beep");
      beep.play();
    }
  }
  
  startCountdown () {
    this.setState ({
      intervalID: setInterval(() => {
        this.decrementTime();
      }, 1000),
      countdown: true
    });
  }
  
  stopCountdown () {
    this.setState ({
      intervalID: clearInterval(this.state.intervalID),
      countdown: false
    });
  }
  
  resetCountdown () {
    this.setState ({
      sessionLength: defaultSession,
      breakLength: defaultBreak,
      time: defaultTime,
      intervalID: clearInterval(this.state.intervalID),
      countdown: false,
      break: false,
      label: defaultLabel
    })
    let beep = document.getElementById("beep");
    beep.load();
  }
  
  toggleCountdown () {
    if (this.state.countdown === false) {
      this.startCountdown();
    }
    else this.stopCountdown();
  }
  
  clockify () {
    let minutes = Math.floor(this.state.time / 60);
    let seconds = this.state.time - (minutes * 60);
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
  }
  
  controlLength (type, direction) {
    if (this.state.countdown === true) {
      return;
    }
    else if (type === "session" && direction === "increase") {
      this.setState ({
        sessionLength: this.state.sessionLength + 1,
        time: (this.state.sessionLength + 1) * 60
      });
    }
    else if (type === "session" && direction === "decrease") {
      this.setState ({
        sessionLength: this.state.sessionLength - 1,
        time: (this.state.sessionLength - 1) * 60
      });
    }
    else if (type === "break" && direction === "increase") {
      this.setState ({
        breakLength: this.state.breakLength + 1
      });
    }
    else if (type === "break" && direction === "decrease") {
      this.setState ({
        breakLength: this.state.breakLength - 1
      });
    }
  }
  
  sessionIncrease () {
    if (this.state.sessionLength <= 59) {
      this.controlLength("session", "increase");
    }
  }
  
  sessionDecrease () {
    if (this.state.sessionLength >= 2) {
      this.controlLength("session", "decrease");
    }
  }
  
  breakIncrease () {
    if (this.state.breakLength <= 59) {
      this.controlLength("break", "increase");
    }
  }
  
  breakDecrease () {
    if (this.state.breakLength >= 2) {
      this.controlLength("break", "decrease");
    }
  }
  
  render () {
    return (
      <div id="wrapper">
        <div id="title">
          25 + 5 clock
        </div>
        <div id="clock">
          <div id="length-controls">
            <div className="length-label" id="session-label">
              Session length
            </div>
            <div id="session-controls" className="settings">
              <button id="session-decrement" onClick={this.sessionDecrease}><i class="fas fa-minus"></i></button>
              <div id="session-length">
                {this.state.sessionLength}
              </div>
              <button id="session-increment" onClick={this.sessionIncrease}><i class="fas fa-plus"></i></button>
            </div>
            <div className="length-label" id="break-label">
              Break length
            </div>
            <div id="break-controls" className="settings">
              <button id="break-decrement" onClick={this.breakDecrease}><i class="fas fa-minus"></i></button>
              <div id="break-length">
                {this.state.breakLength}
              </div>
              <button id="break-increment" onClick={this.breakIncrease}><i class="fas fa-plus"></i></button>
            </div>
          </div>
          <div id="timer">
            <div id="timer-label">
              {this.state.label}
            </div>
            <div id="time-left">
              {this.clockify()}
              <audio id="beep" src={beep} type="audio/mpeg" preload="auto" />
            </div>
            <div>
              <button className="timer-buttons" id="start_stop" onClick={this.toggleCountdown}>{this.state.countdown ? <i class="fas fa-pause"></i> : <i class="fas fa-play"></i>}</button>
              <button className="timer-buttons" id="reset" onClick={this.resetCountdown}><i class="fas fa-redo"></i></button>
            </div>
          </div>
        </div>
        <div id="copy">
          &copy; 2021 Libor Benda
        </div>
      </div>
    )
  }
}

export default App;
