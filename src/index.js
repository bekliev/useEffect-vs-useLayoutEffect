import React, { useState, useEffect, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

import renderPipeline from "./renderPipeline.jpg";

const UseEffect = () => {
  const [state, setState] = useState(0);

  useEffect(() => {
    if (state === 0) {
      setState(10 + Math.random() * 200);
    }
  }, [state]);

  return (
    <fieldset>
      <legend>
        <code>useEffect</code>
      </legend>

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
          <li className="ok">browser repaints</li>
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
      <legend>
        <code>useLayoutEffect</code>
      </legend>

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
      <h3>Click to compare browser's paint behavior</h3>
      <UseEffect />
      <UseLayoutEffect />

      <fieldset>
        <legend>Conclusion</legend>
        <p>
          Try to use <code>useLayoutEffect</code> hook in cases where triggers
          reflow/repaint
        </p>
        <table border="1" cellPadding="10px">
          <tr>
            <th></th>
            <th>Style</th>
            <th>Layout</th>
            <th>Paint</th>
            <th>Composite</th>
          </tr>
          <tr>
            <th>reflow</th>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
          </tr>
          <tr>
            <th>repaint</th>
            <td>✅</td>
            <td></td>
            <td>✅</td>
            <td>✅</td>
          </tr>
        </table>
        <img
          border="1px"
          src={renderPipeline}
          style={{ maxWidth: "100%" }}
          alt="Javascript > Style > Layout > Paint > Composite"
        />
        <h3>
          Use cases when to use <code>useLayoutEffect</code>:
        </h3>
        <ul>
          <li>
            if your effect changes state which triggers reflow/repaint (example
            above changes number which triggers reflow)
          </li>
          <li>
            if your effect changes <code>className</code>
          </li>
          <li>if you need to update DOM in your effect</li>
          <li>if you need to smooth your animation</li>
          <li>etc.</li>
        </ul>
        <p>
          You can learn more about rendering process here:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://developers.google.com/web/fundamentals/performance/rendering"
          >
            developers.google.com/web/fundamentals/performance/rendering
          </a>
        </p>
      </fieldset>
    </>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
