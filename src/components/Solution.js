import React, { Fragment, useEffect, useState, useRef } from "react";

function Solution() {
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [pause, setPause] = useState(true);

  let interval = useRef();

  const handleStart = (e) => {
    if (minute.length === undefined || second.length === undefined) {
      setPause(false);
      var min = Number(minute);
      var sec = Number(second);

      interval.current = setInterval(() => {
        if (sec === 0 && min === 0) {
          setMinute(0);
          setSecond(0);
          clearInterval(interval);
        }
        if (min < 10) {
          min = Number("0" + min);
          setMinute(min);
        }
        if (sec < 10) {
          sec = Number("0" + sec);
          setSecond(sec);
        }
        if (min !== 0 && sec !== 0) {
          sec = sec - 1;
          setSecond(sec);
        }
        if (min === 0 && sec !== 0) {
          sec = sec - 1;
          setSecond(sec);
        }
        if (min !== 0 && sec === 0) {
          if (min === 1) {
            sec = 59;
            min = 0;
            setMinute(min);
            setSecond(sec);
          } else if (min !== 1) {
            sec = 59;
            min = min - 1;
            setSecond(sec);
            setMinute(min);
          }
        }
        console.log(minute, second, "after");
      }, 1000);
    } else {
      //   alert("Enter time!");
      clearInterval(interval.current);
      console.log(
        minute,
        second,
        pause,
        minute.length === null || second.length === null
      );
    }
  };

  const handlePause = () => {
    if (pause === false) {
      clearInterval(interval.current);
      //   interval.current = undefined;
      setPause(true);
      console.log(interval.current, interval);
    } else {
      handleStart();
      console.log(interval.current, interval);
    }
  };

  const handleReset = () => {
    setMinute(0);
    setSecond(0);
    setPause(false);
    clearInterval(interval.current);
    console.log("reset");
  };

  return (
    <Fragment>
      <div className="jumbotron text-center">
        <label>
          <input
            type="number"
            name="minute"
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
          />
          Minutes
        </label>
        <label>
          <input
            type="number"
            name="second"
            value={second}
            onChange={(e) => setSecond(e.target.value)}
          />
          Seconds
        </label>
        <span>{minute.length ? true : false}</span>

        <button
          className="btn btn-lg btn-success"
          onClick={(e) => handleStart()}>
          START
        </button>
        <button
          className="btn btn-lg btn-danger"
          onClick={(e) => handlePause()}>
          PAUSE / RESUME
        </button>
        <button
          className="btn btn-lg btn-link btn-block"
          onClick={(e) => handleReset()}>
          RESET
        </button>
        <h1 data-testid="running-clock">
          {minute < 10 ? "0" + minute : minute}:
          {second < 10 ? "0" + second : second}
        </h1>
      </div>
    </Fragment>
  );
}

export default Solution;
