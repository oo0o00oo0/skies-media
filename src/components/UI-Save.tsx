import React from "react";
import Controls from "./Controls";
import { animate } from "@lib/animate";

const limit = 5;
// const step = 1 / limit;
// const step = 0.0025;
const step = 0.0025;

const UISave = ({
  value,
  setIsAnimating,
  isAnimating,
  setValue,
  save,
  setSave,
}) => {
  const timerId = React.useRef(null);

  React.useEffect(() => {
    if (isAnimating) {
      timerId.current = animate(
        () => {
          setValue((v) => Math.round((v + step) * 1000) / 1000);
        },
        {
          limit: (limit - 1) * (1 / step),
          reset: () => setIsAnimating(false),
        }
      );
    }
  }, [isAnimating, setIsAnimating, setValue]);

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
    <Controls
      save={save}
      setSave={setSave}
      step={step}
      start={start}
      reset={reset}
      setVal={setValue}
      handleChange={handleChange}
      value={value}
    />
  );
};

export default UISave;
