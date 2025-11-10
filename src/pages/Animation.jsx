import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Ani.css";

const Animation = () => {
  const fieldWidth = 700;
  const fieldHeight = 400;
  const diameter = 50;
  const vx = 5;
  const vy = 5;

  const maxLeft = fieldWidth - diameter - 2;
  const maxTop = fieldHeight - diameter - 2;

  const [running, setRunning] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [angle, setAngle] = useState(0);
  const [goRight, setGoRight] = useState(true);
  const [goDown, setGoDown] = useState(true);
  const [rotationDirection, setRotationDirection] = useState(1);
  const [ballImg, setBallImg] = useState("");
  const intervalRef = useRef(null);

  const toggleRun = () => setRunning((prev) => !prev);

  const calculate = () => {
    setX((prevX) => {
      let newX = prevX + (goRight ? vx : -vx);
      if (newX > maxLeft) {
        newX = maxLeft;
        setGoRight(false);
        setRotationDirection((d) => -d);
      } else if (newX < 0) {
        newX = 0;
        setGoRight(true);
        setRotationDirection((d) => -d);
      }
      return newX;
    });

    setY((prevY) => {
      let newY = prevY + (goDown ? vy : -vy);
      if (newY > maxTop) {
        newY = maxTop;
        setGoDown(false);
        setRotationDirection((d) => -d);
      } else if (newY < 0) {
        newY = 0;
        setGoDown(true);
        setRotationDirection((d) => -d);
      }
      return newY;
    });

    setAngle((prev) => prev + 9 * rotationDirection);
  };

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(calculate, 25);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, goRight, goDown, rotationDirection]);

  useEffect(() => {
    const handleKey = (e) => {
      switch (e.key) {
        case " ":
          e.preventDefault();
          toggleRun();
          break;
        case "0":
          setBallImg("");
          break;
        case "1":
          setBallImg("./public/images/basketball.jpg");
          break;
        case "2":
          setBallImg("./public/images/voleyball.jpg");
          break;
        case "3":
          setBallImg("./public/images/human.jpg");
          break;
        case "4":
          setBallImg("./public/images/Ben10.jpg");
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
   <div className="border rounded shadow mt-4 bg-secondary">
  <div className="cal-container text-center">
    
    <div
      id="field"
      className="border border-danger rounded position-relative overflow-hidden mx-auto"
      style={{
        width: "700px",
        height: "400px",
        backgroundImage: "url('./public/images/field1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        id="ball"
        className="position-absolute rounded-circle border border-success"
        style={{
          width: diameter,
          height: diameter,
          backgroundColor: "#c0f0f0",
          backgroundImage: ballImg ? `url(${ballImg})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          left: x,
          top: y,
          transform: `rotate(${angle}deg)`,
          transition: "transform 0.05s linear",
        }}
      ></div>
    </div>

    {/* ปุ่มควบคุม */}
    <div
      id="control"
      className="d-flex justify-content-center flex-wrap gap-2 mt-3"
    >
      <button
        id="run"
        className={`btn ${running ? "btn-warning" : "btn-success"}`}
        onClick={toggleRun}
      >
        {running ? (
          <>
            <i className="bi bi-pause"></i> Pause
          </>
        ) : (
          <>
            <i className="bi bi-play"></i> Run
          </>
        )}
      </button>

      <div className="btn-group gap-2 ">
        <button className="btn btn-outline-dark" onClick={() => setBallImg("")}>
          None
        </button>
        <button
          className="btn btn-outline-dark"
          onClick={() => setBallImg("./public/images/basketball.jpg")}
        >
          Basketball
        </button>
        <button
          className="btn btn-outline-dark"
          onClick={() => setBallImg("./public/images/voleyball.jpg")}
        >
          Volleyball
        </button>
        <button
          className="btn btn-outline-dark"
          onClick={() => setBallImg("./public/images/human.jpg")}
        >
          Human
        </button>
        <button
          className="btn btn-outline-dark"
          onClick={() => setBallImg("./public/images/Ben10.jpg")}
        >
          Cartoon
        </button>
      </div>
    </div>
  </div>
</div>


  );
};

export default Animation;
