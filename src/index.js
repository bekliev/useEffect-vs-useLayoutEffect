import React, { useState, useEffect, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const UseEffect = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (value === 0) {
      setValue(10 + Math.random() * 200);
    }
  }, [value]);

  return (
    <fieldset>
      <legend>useEffect</legend>

      <p>{value}</p>
      <button onClick={() => setValue(0)}>update state</button>

      <p className="bad">repaint count: 2 (try to notice value flickering)</p>
      <details>
        <summary>explanation (click me)</summary>
        <ol>
          <li className="macro">macrotask / click event / setState</li>
          <li className="micro">microtask / react updated state</li>
          <li className="micro">microtask / react patched DOM</li>
          <li className="bad">browser repaints</li>
          <li className="micro">microtask / useEffect / setState (again)</li>
          <li className="micro">microtask / react updated state</li>
          <li className="micro">microtask / react patched DOM</li>
          <li className="bad">browser repaints</li>
        </ol>
      </details>
    </fieldset>
  );
};

const UseLayoutEffect = () => {
  const [value, setValue] = useState(0);

  useLayoutEffect(() => {
    if (value === 0) {
      setValue(10 + Math.random() * 200);
    }
  }, [value]);

  return (
    <fieldset>
      <legend>useLayoutEffect</legend>

      <p>{value}</p>
      <button onClick={() => setValue(0)}>update state</button>

      <p className="ok">repaint count: 1</p>
      <details>
        <summary>explanation (click me)</summary>
        <ol>
          <li className="macro">macrotask / click event / setState</li>
          <li className="micro">microtask / react updated state</li>
          <li className="micro">microtask / react patched DOM</li>
          <li className="micro">microtask / useLayoutEffect / setState (again)</li>
          <li className="micro">microtask / react updated state</li>
          <li className="micro">microtask / react patched DOM</li>
          <li className="ok">browser repaints</li>
        </ol>
      </details>
    </fieldset>
  );
};

function App() {
  return (
    <>
      <h5>Click to compare browser's paint behavior</h5>
      <UseEffect />
      <UseLayoutEffect />
    </>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
