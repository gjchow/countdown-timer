import React, { useEffect, useState } from "react";
import "./countdown.css";

export default function Countdown(props){
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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(props.value.value));

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft(props.value.value));
    }, 1000);
  });

  const Timer = () => {
    let timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
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
    <div className="countdown">{Timer()}</div>
  );
};