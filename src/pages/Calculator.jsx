import React, { useState } from "react";
import "./Cal.css"; 

const Calculator = () => {
  const [screen, setScreen] = useState("0");
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [lastOperator, setLastOperator] = useState("");
  const [lastOperand, setLastOperand] = useState("");
  const [lastOperatorRepeat, setLastOperatorRepeat] = useState("");

  const operatorDefault = () => {
    const plus = document.getElementById("plus");
    const minus = document.getElementById("minus");
    if (plus && minus) {
      plus.classList.add("btn-green");
      plus.classList.remove("btn-yellow");
      minus.classList.add("btn-green");
      minus.classList.remove("btn-yellow");
    }
  };

  const highlightOperator = (op) => {
    operatorDefault();
    if (op === "+") {
      const plus = document.getElementById("plus");
      plus.classList.remove("btn-green");
      plus.classList.add("btn-yellow");
    } else if (op === "-") {
      const minus = document.getElementById("minus");
      minus.classList.remove("btn-green");
      minus.classList.add("btn-yellow");
    }
  };

  const numberClicked = (number) => {
    const newNum = num2 === "0" ? number.toString() : num2 + number.toString();
    setNum2(newNum);
    setScreen(newNum);
    setLastOperatorRepeat("");
    setLastOperand("");
  };

  const applyOperator = (a, b, op) => {
    if (op === "+") return a + b;
    if (op === "-") return a - b;
    return b;
  };

  const operatorClicked = (operator) => {
    if (!num1) {
      setNum1(num2 || screen);
      setNum2("");
    } else if (num1 && num2 && lastOperator) {
      const result = applyOperator(parseFloat(num1), parseFloat(num2), lastOperator);
      setNum1(result.toString());
      setScreen(result.toString());
      setNum2("");
    }
    setLastOperator(operator);
    setLastOperatorRepeat("");
    setLastOperand("");
    highlightOperator(operator);
  };

  const calculate = () => {
    if (lastOperator && num1 && num2) {
      const result = applyOperator(parseFloat(num1), parseFloat(num2), lastOperator);
      setScreen(result.toString());
      setLastOperatorRepeat(lastOperator);
      setLastOperand(num2);
      setNum1("");
      setNum2(result.toString());
      setLastOperator("");
      operatorDefault();
      return;
    }

    if (lastOperator && num1 && !num2) {
      const result = applyOperator(parseFloat(num1), parseFloat(num1), lastOperator);
      setScreen(result.toString());
      setLastOperatorRepeat(lastOperator);
      setLastOperand(num1);
      setNum1("");
      setNum2(result.toString());
      setLastOperator("");
      operatorDefault();
      return;
    }

    if (!lastOperator && lastOperatorRepeat && num2) {
      const result = applyOperator(parseFloat(num2), parseFloat(lastOperand || "0"), lastOperatorRepeat);
      setScreen(result.toString());
      setNum2(result.toString());
      return;
    }
  };

  const clearCalc = () => {
    setScreen("0");
    setNum1("");
    setNum2("");
    setLastOperator("");
    setLastOperand("");
    setLastOperatorRepeat("");
    operatorDefault();
  };

  return (
    <div className=" border rounded shadow mt-4 bg-secondary">
    <div className="calculator">
      <div className="cal-container">
        <div className="cal-screen" id="screen">{screen}</div>

        <div>
          <button className="btn btncal btn-green" disabled>MC</button>
          <button className="btn btncal btn-green" disabled>MR</button>
          <button className="btn btncal btn-green" disabled>M+</button>
          <button className="btn btncal btn-green" disabled>M-</button>
          <button className="btn btncal btn-red" onClick={clearCalc}>CE</button>
        </div>

        <div>
          {[7,8,9].map(n => (
            <button key={n} className="btn btncal btn-blue btn-active-hover" onClick={() => numberClicked(n)}>{n}</button>
          ))}
          <button className="btn btncal btn-green" disabled>/</button>
          <button className="btn btncal btn-green" disabled>SQ</button>
        </div>

        <div>
          {[4,5,6].map(n => (
            <button key={n} className="btn btncal btn-blue btn-active-hover" onClick={() => numberClicked(n)}>{n}</button>
          ))}
          <button className="btn btncal btn-green" disabled>*</button>
          <button className="btn btncal btn-green" disabled>%</button>
        </div>

        <div>
          {[1,2,3].map(n => (
            <button key={n} className="btn btncal btn-blue btn-active-hover" onClick={() => numberClicked(n)}>{n}</button>
          ))}
          <button className="btn btncal btn-green" id="minus" onClick={() => operatorClicked("-")}>-</button>
          <button className="btn btncal btn-green" disabled>1/x</button>
        </div>

        <div>
          <button className="btn btncal btn-blue btn-active-hover" onClick={() => numberClicked(0)}>0</button>
          <button className="btn btncal btn-blue" disabled>.</button>
          <button className="btn btncal btn-blue" disabled>+/-</button>
          <button className="btn btncal btn-green" id="plus" onClick={() => operatorClicked("+")}>+</button>
          <button className="btn btncal btn-green" onClick={calculate}>=</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Calculator;
