import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [calc, setCalc] = useState({ result: "" });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClick = (e) => {
    setCalc((prevCalc) => ({
      result: prevCalc.result.concat(e.target.name)
    }));
  };

  const clear = () => {
    setCalc({ result: "" });
  };

  const backspace = () => {
    setCalc((prevCalc) => ({
      result: prevCalc.result.slice(0, -1)
    }));
  };

  const calculate = () => {
    try {
      // Avoid using eval for safety and security reasons
      // Consider using a safer math expression parser instead
      const result = Function(`'use strict'; return (${calc.result})`)();
      setCalc({ result: result.toString() });
    } catch (err) {
      setCalc({ result: "Error" });
    }
  };

  // Keyboard support
  const handleKeyPress = (event) => {
    if (!isNaN(event.key) || ['+', '-', '*', '/'].includes(event.key)) {
      handleClick({ target: { name: event.key } });
    } else if (event.key === 'Backspace') {
      backspace();
    } else if (event.key === 'Enter') {
      calculate();
    } else if (event.key === 'Escape') {
      clear();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p className="App-clock">{time}</p>
        <div className="calculator">
          <form>
            <input type="text" value={calc.result} readOnly />
          </form>
          <div className="keypad">
            <button onClick={clear}>C</button>
            <button onClick={backspace}>←</button>
            <button name="/" onClick={handleClick}>/</button>
            <button name="7" onClick={handleClick}>7</button>
            <button name="8" onClick={handleClick}>8</button>
            <button name="9" onClick={handleClick}>9</button>
            <button name="-" onClick={handleClick}>-</button>
            <button name="4" onClick={handleClick}>4</button>
            <button name="5" onClick={handleClick}>5</button>
            <button name="6" onClick={handleClick}>6</button>
            <button name="+" onClick={handleClick}>+</button>
            <button name="1" onClick={handleClick}>1</button>
            <button name="2" onClick={handleClick}>2</button>
            <button name="3" onClick={handleClick}>3</button>
            <button onClick={calculate}>=</button>
            <button name="0" onClick={handleClick}>0</button>
            <button name="." onClick={handleClick}>.</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
