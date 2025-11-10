import { useEffect, useState } from "react";
import Value from "./Value";


function Temperatures() {
  const [celsius, setCelsius] = useState(25);
  const [fahrenheit, setFahrenheit] = useState(77);
  const [kelvin, setKelvin] = useState(298.15);

  useEffect(() => {
    setCelsius(celsius);
    setFahrenheit((celsius * 9) / 5 + 32);
    setKelvin(celsius + 273.15);
  }, [celsius]);

  useEffect(() => {
    setFahrenheit(fahrenheit);
    const c = ((fahrenheit - 32) * 5) / 9;
    setCelsius(c);
    setKelvin(c + 273.15);
  }, [fahrenheit]);

  useEffect(() => {
    setKelvin(kelvin);
    const c = kelvin - 273.15;
    setCelsius(c);
    setFahrenheit((c * 9) / 5 + 32);
  }, [kelvin]);

  return (
    <div
      className="border border-dark border-3 rounded-4 p-4 mt-4 bg-light-subtle shadow-sm"
      style={{ width: "fit-content", margin: "auto" }}
    >
      <h3 className="text-center text-primary fw-bold">TEMPERATURES</h3>
      <h3 className="text-center mb-4">
        <span className="badge bg-primary fs-5 mx-1">
          {celsius.toFixed(2)} °C
        </span>
        <span className="badge bg-primary fs-5 mx-1">
          {fahrenheit.toFixed(2)} °F
        </span>
        <span className="badge bg-primary fs-5 mx-1">
          {kelvin.toFixed(2)} K
        </span>
      </h3>

      <div className="d-flex justify-content-center flex-wrap gap-4">
        <Value
          type={"real"}
          name={"CELSIUS"}
          value={celsius}
          setValue={setCelsius}
        />
        <Value
          type={"real"}
          name={"FAHRENHEIT"}
          value={fahrenheit}
          setValue={setFahrenheit}
        />
        <Value
          type={"real"}
          name={"KELVIN"}
          value={kelvin}
          setValue={setKelvin}
        />
      </div>
    </div>
  );
}

export default Temperatures;