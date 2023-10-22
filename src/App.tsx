// App.tsx
import "./App.css";
import React from "react";
import CanvasMain from "./components-canvas/Canvas/CanvasMain";
import Controls from "./components/Controls";
import { animate } from "@lib/animate";

const files = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "1",
  "2",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "1",
  "2",
];

const step = 0.01;

function App() {
  const urls = files.map((file) => `/images/atlas/${file}.jpg`);
  const [value, setValue] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [save, setSave] = React.useState(false);

  const timerId = React.useRef(null);

  React.useEffect(() => {
    if (isAnimating) {
      timerId.current = animate(
        () => {
          setValue((v) => Math.round((v + step) * 1000) / 1000);
        },
        {
          limit: (files.length - 1) * (1 / step),
          reset: () => setIsAnimating(false),
        }
      );
    }
  }, [isAnimating]);

  const reset = () => {
    setValue(0);
    setIsAnimating(false);
    if (timerId.current) {
      clearInterval(timerId.current);
    }
  };

  const start = () => {
    setValue(0);
    setIsAnimating(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseFloat(e.target.value));
  };

  return (
    <>
      <CanvasMain save={save} value={value} urls={urls} />
      <Controls
        save={save}
        setSave={setSave}
        step={step}
        files={files}
        start={start}
        reset={reset}
        setVal={setValue}
        handleChange={handleChange}
        value={value}
      />
    </>
  );
}

export default App;
