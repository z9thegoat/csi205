import React from "react";
import { Image } from "react-bootstrap"; 

const Home = () => {
  return (
   <div className="text-center mt-5 shadow-lg p-4 mx-auto bg-light rounded-4" style={{ maxWidth: "600px" }}>
  <img
    src="./images/me.jpg"
    alt="me"
    className="shadow-sm"
    style={{
      width: "220px",
      borderRadius: "20%",
      marginBottom: "20px",
    }}
  />

  <h2 className="fw-bold text-primary mb-2" style={{ fontFamily: "Sarabun, sans-serif" }}>
    ณภัทร นวหัสดินกุล 67116507
  </h2>

  <p className="text-secondary mb-1">
    ชั้นปี 3 | สาขา Developer | คณะเทคโนโลยีสารสนเทศ <br />
    <span className="fw-semibold text-dark">SRIPATUM UNIVERSITY</span>
  </p>

  <p className="text-muted fst-italic mt-3">
    “ok พี่ซี๊ด เบรกเกต วันนี้ก็กลับมาแล้วอ่ะนะกับรายการ opz tv”
  </p>
</div>

  );
}

export default Home;
