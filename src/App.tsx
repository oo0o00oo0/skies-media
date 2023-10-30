// App.tsx
import "./App.css";
import React from "react";
import CanvasMain from "./components-canvas/Canvas/CanvasMain";
import Controls from "./components/Controls";
import { animate } from "@lib/animate";
import { fileNames } from "@data/fileNames";
import styled from "styled-components";

// const step = 0.05;
const step = 0.005;

function App() {
  // const urls = fileNames.map((file) => `/images/atlas/${file}.jpg`);
  const urls = fileNames.map((file) => `/images/skies/${file}.jpg`);
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
          limit: (fileNames.length - 1) * (1 / step),
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
    <Wr>
      <CanvasMain save={save} value={value} urls={urls} />
      <Controls
        save={save}
        setSave={setSave}
        step={step}
        files={fileNames}
        start={start}
        reset={reset}
        setVal={setValue}
        handleChange={handleChange}
        value={value}
      />
    </Wr>
  );
}

const Wr = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
`;

export default App;
