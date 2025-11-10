import { useEffect, useState } from "react";

const Timer = () => {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  function runClick() {
    setRunning(!running);
  }

  useEffect(() => {
    let interval = null;
    if (running) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const convertToString = (s) => {
    const MINUTE_SECONDS = 60;
    const HOUR_SECONDS = MINUTE_SECONDS * 60;
    const DAY_SECONDS = HOUR_SECONDS * 24;

    const days = Math.floor(s / DAY_SECONDS);
    const hours = Math.floor((s % DAY_SECONDS) / HOUR_SECONDS);
    const minutes = Math.floor((s % HOUR_SECONDS) / MINUTE_SECONDS);
    const secs = s % MINUTE_SECONDS;

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m ${secs}s`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  function resetClick() {
    setRunning(false);
    setSeconds(0);
  }

  return (
    <div
      className="timer-container border border-black border-3 rounded-3 m-auto p-4 bg-secondary-subtle mt-3"
      style={{ maxWidth: "400px", textAlign: "center" }}
    >
      <h1 className="timer-title text-primary mb-4">Timer</h1>

      <input
        className="timer-display form-control text-center mb-4 fw-bold fs-3"
        type="text"
        readOnly
        value={convertToString(seconds)}
      />

      <div className="timer-buttons d-flex justify-content-center gap-3">
        <button className="btn btn-danger" onClick={resetClick}>
          <i className="bi bi-arrow-counterclockwise"></i> Reset
        </button>

        <button
          className={`btn ${running ? "btn-warning" : "btn-success"}`}
          onClick={runClick}
        >
          {running ? (
            <>
              <i className="bi bi-pause-fill"></i> Pause
            </>
          ) : (
            <>
              <i className="bi bi-play-fill"></i> Run
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Timer;
