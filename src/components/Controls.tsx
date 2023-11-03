import styled from "styled-components";

const NUM = 6;

const arr = Array.from({ length: NUM }, (_, i) => i);

const Controls = ({
  step,
  // files,
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
        max={NUM - 1}
        value={value}
        step={step}
        onChange={handleChange}
      />
      <ValueWrapper>{value}</ValueWrapper>
      <ValuesWrapper>
        {arr.map((_, index) => (
          <Number
            style={{
              background: value >= index ? "#ACB5BF" : "",
            }}
            key={index}
            onClick={() => setVal(index)}
          >
            {index}
          </Number>
        ))}
      </ValuesWrapper>
    </ControlsWrapper>
  );
};

export default Controls;

const ControlsWrapper = styled.div`
  border-top: #212252 solid 2px;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  * {
    font-size: 10px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const Button = styled.button`
  transition: 0.2s ease-in-out;
  box-sizing: border-box;
`;
const Number = styled.button`
  transition: 0.2s ease-in-out;
  box-sizing: border-box;
  flex: 1;
`;

const InputWrapper = styled.input`
  width: 90vw;
  background: white;
  flex-grow: 1;
`;

const ValueWrapper = styled.div`
  text-align: left;
`;

const ValuesWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
