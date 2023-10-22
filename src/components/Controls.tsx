import styled from "styled-components";

const Controls = ({
  step,
  files,
  handleChange,
  setVal,
  value,
  reset,
  start,
  setSave,
  save,
}) => {
  return (
    <ControlsWrapper>
      <ButtonWrapper>
        <Button onClick={start}>&gt;&gt;&gt;</Button>
        <Button onClick={reset}>Reset</Button>
        <Button
          style={{
            background: save ? "green" : "",
          }}
          onClick={() => setSave((s) => !s)}
        >
          Save
        </Button>
      </ButtonWrapper>
      <InputWrapper
        type="range"
        min="0"
        max={files.length - 1}
        value={value}
        step={step}
        onChange={handleChange}
      />
      <ValueWrapper>{value}</ValueWrapper>
      <ValuesWrapper>
        {files.map((_, index) => (
          <Button key={index} onClick={() => setVal(index)}>
            {index}
          </Button>
        ))}
      </ValuesWrapper>
    </ControlsWrapper>
  );
};

export default Controls;

const ControlsWrapper = styled.div`
  box-sizing: border-box;
  height: 15vh;
  width: 90vw;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const Button = styled.button`
  flex: 1;
  max-width: 100px; // or any size you prefer
  max-height: 50px; // or any size you prefer
`;

const InputWrapper = styled.input`
  width: 90vw;
  background: white;
  flex-grow: 1;
`;

const ValueWrapper = styled.div``;

const ValuesWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
`;
