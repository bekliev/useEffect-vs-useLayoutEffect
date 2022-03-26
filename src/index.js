import React, { useState, useEffect, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const UseEffect = () => {
  const [state, setState] = useState(0);

  useEffect(() => {
    if (state === 0) {
      setState(10 + Math.random() * 200);
    }
  }, [state]);

  return (
    <fieldset>
      <legend>useEffect</legend>

      <p>{state}</p>
      <button onClick={() => setState(0)}>update state</button>

      <p className="bad">repaint count: 2 (try to notice state flickering)</p>
      <details>
        <summary>explanation (click me)</summary>
        <ol>
          <li className="macro">macrotask / click event / setState(0)</li>
          <li className="micro">microtask / react updated state</li>
          <li className="micro">microtask / react patched DOM</li>
          <li className="bad">browser repaints</li>
          <li className="micro">microtask / useEffect / setState(random)</li>
          <li className="micro">microtask / react updated state</li>
          <li className="micro">microtask / react patched DOM</li>
          <li className="bad">browser repaints</li>
        </ol>
      </details>
    </fieldset>
  );
};

const UseLayoutEffect = () => {
  const [state, setState] = useState(0);

  useLayoutEffect(() => {
    if (state === 0) {
      setState(10 + Math.random() * 200);
    }
  }, [state]);

  return (
    <fieldset>
      <legend>useLayoutEffect</legend>

      <p>{state}</p>
      <button onClick={() => setState(0)}>update state</button>

      <p className="ok">repaint count: 1</p>
      <details>
        <summary>explanation (click me)</summary>
        <ol>
          <li className="macro">macrotask / click event / setState(0)</li>
          <li className="micro">microtask / react updated state</li>
          <li className="micro">microtask / react patched DOM</li>
          <li className="micro">
            microtask / useLayoutEffect / setState(random)
          </li>
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
