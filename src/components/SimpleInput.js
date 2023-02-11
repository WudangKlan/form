import { useEffect } from "react";
import useInput from "../hook/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    hasError: nameInputHasError,
    valueIsValid: enteredNameIsValid,
    valueChangeHandler: nameInputChangeHandler,
    valueBlurHandler: nameInputBlurHandler,
    resetHandler: nameResetHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    valueIsValid: enteredEmailIsValid,
    valueChangeHandler: emailInputChangeHandler,
    valueBlurHandler: emailInputBlurHandler,
    resetHandler: emailResetHandler,
  } = useInput((value) => value.includes("@"));

  useEffect(() => {
    if (enteredNameIsValid) {
      console.log("enter name is valid");
    }
  }, [enteredNameIsValid]);

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    //------------------------------ validasi

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }
    console.log(enteredName);

    //-------------------
    nameResetHandler();
    emailResetHandler();
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && <p>Name must not be empty!</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="name">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && <p>Please Input Correct Email</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
