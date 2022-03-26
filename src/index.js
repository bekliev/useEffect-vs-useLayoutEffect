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

      <p class="bad">repaint count: 2 (try to notice value flickering)</p>
      <details>
        <summary>explanation</summary>
        <ol>
          <li>macrotask / click event / setState</li>
          <li>microtask / react updated state</li>
          <li>microtask / react updated DOM</li>
          <li class="bad">repaint</li>
          <li>microtask / useEffect / setState (again)</li>
          <li>microtask / react updated state</li>
          <li>microtask / react updated DOM</li>
          <li class="bad">repaint</li>
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

      <p class="ok">repaint count: 1</p>
      <details>
        <summary>explanation</summary>
        <ol>
          <li>macrotask / click event / setState</li>
          <li>microtask / react updated state</li>
          <li>microtask / react updated DOM</li>
          <li>microtask / useLayoutEffect / setState (again)</li>
          <li>microtask / react updated state</li>
          <li>microtask / react updated DOM</li>
          <li class="ok">repaint</li>
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
