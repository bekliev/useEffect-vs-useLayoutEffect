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
          In case of logic which triggers reflow (Layout) or repaint (Paint) -
          use <code>useLayoutEffect</code> instead
        </p>
        <img
          src="https://developers.google.com/web/fundamentals/performance/rendering/images/intro/frame-full.jpg"
          style={{ maxWidth: "100%" }}
          alt="Javascript > Style > Layout > Paint > Composite"
        />
        <p>
          Use cases when to use <code>useLayoutEffect</code>
        </p>
        <ul>
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
