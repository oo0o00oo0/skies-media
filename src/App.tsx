import React from "react";
import CanvasMain from "./components-canvas/Canvas/CanvasMain";
import styled from "styled-components";
import UISave from "./components/UI-Save";

function App() {
  const [value, setValue] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [save, setSave] = React.useState(false);

  return (
    <AppWrap>
      <CanvasMain save={save} value={value} />
      <UISave
        save={save}
        setSave={setSave}
        value={value}
        setValue={setValue}
        isAnimating={isAnimating}
        setIsAnimating={setIsAnimating}
      />
    </AppWrap>
  );
}
const AppWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export default App;
