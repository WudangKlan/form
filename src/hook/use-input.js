import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.value };
  }

  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }

  if (action.type === "RESET") {
    return { isTouched: false, value: "" };
  }
  return inputStateReducer;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  // const [enteredValue, setEnteredValue] = useState("");
  // const [isTouched, setIsTouched] = useState(false);

  //const valueIsValid = enteredValue.trim() !== "";
  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    //setEnteredValue(event.target.value);
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const valueBlurHandler = (event) => {
    //setIsTouched(true);
    dispatch({ type: "BLUR" });
  };

  const resetHandler = (event) => {
    // setEnteredValue("");
    // setIsTouched(false);
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    valueIsValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    resetHandler,
  };
};

export default useInput;
