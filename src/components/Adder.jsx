import { useState } from "react";
import Value from "./Value";

const Adder = ({ name }) => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  return (
    <div
      className="border border-dark border-3 rounded-4 p-4 mt-4 bg-light-subtle shadow-sm"
      style={{ width: "fit-countent" }}
    >
      <h1 className="text-center text-primary">{name || "Adder"}</h1>
      <div className="d-flex justify-content-between align-item-center">
        <div className="badge bg-secondary ">A = {a}</div>
        <div className="badge bg-primary">A + B = {a + b}</div>
        <div className="badge bg-secondary">B = {b}</div>
      </div>
      <div className="d-flex gap-2">
        <Value name={"A"} value={a} setValue={setA} />
        <Value name={"B"} value={b} setValue={setB} />
      </div>
    </div>
  );
};

export default Adder;
