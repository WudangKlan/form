import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  //const valueIsValid = enteredValue.trim() !== "";
  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const valueBlurHandler = (event) => {
    setIsTouched(true);
  };

  const resetHandler = (event) =>{
    setEnteredValue('');
    setIsTouched(false);
  }

  return {
    value: enteredValue,
    valueIsValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    resetHandler
  };
};

export default useInput;
