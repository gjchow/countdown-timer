import React, { useEffect, useState } from "react";
import "./App.css";
// import "./AppExtension.css";
import Form from "./form"

function App() {
  const calculateTimeLeft = (date) => {
    const difference = +new Date(date) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  function getDateTime(defaultValue) {
    const saved = localStorage.getItem("dateTime");
    const initial = JSON.parse(saved);
    return initial || defaultValue;
  }

  const [dateTime, setDateTime] = useState(getDateTime(new Date()));
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(dateTime));

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft(dateTime));
    }, 1000);
  });

  const state = {
    value: dateTime,
  }

  function handleChangeValue(newValue){
    setDateTime(newValue);
  };

  const Timer = () => {
    let timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
      // if (!timeLeft[interval] && interval !== "seconds") {
      //   return;
      // }
      if (interval === "days"){
        timerComponents.push(
          <span className="timer-box-days">
            <div className="timer-number">{timeLeft[interval]}</div>
            <div className="timer-label">{interval.toUpperCase()}</div>
          </span>
        );
      } else {
        timerComponents.push(
          <span className="timer-box">
            <div className="timer-number">{timeLeft[interval]}</div>
            <div className="timer-label">{interval.toUpperCase()}</div>
          </span>
        );
      }
    });

    return timerComponents;
  }
  
  
  return (
    <div className="App">
      <div className="header">Countdown Timer</div>
      {/* <div className="Timer">{Timer().length ? Timer() : <div className="timer-timeup">Time's up!</div>}</div> */}
      <div className="timer">{Timer()}</div>
      <div className="other-text">UNTIL</div>
      <Form
        value={state}
        onChangeValue={handleChangeValue}/>
    </div>
  );
}

export default App;