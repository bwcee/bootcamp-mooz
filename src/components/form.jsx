import React, { useRef } from "react";
import axios from "axios";

function FormComponent({ signUpState, setDisplay, setSignUpState }) {
  const emailRef = useRef();
  const passRef = useRef();

  const submitLogin = () => {
    if (!emailRef.current.value || !passRef.current.value) {
      return alert("Eh fill in all fields leh!");
    }
    axios
      .post("/", {
        email: emailRef.current.value,
        password: passRef.current.value,
      })
      .then((result) => {
        if (!result.data) {
          emailRef.current.value = "";
          passRef.current.value = "";
          return alert("eh salah inputs la");
        } else {
          const token = result.data;
          localStorage.setItem("sessionToken", token);
          setDisplay("logged in!");
        }
      });
  };

  const changeLayout = () => {
    if (signUpState) {
      setSignUpState(false);
    } else {
      setSignUpState(true);
    }
    console.log(signUpState);
  };

  return (
    <div className="align-self-start flex-grow-1 shadow" id="form-container">
      <div className="d-flex justify-content-end">
        <p className="fw-light">
          Don't have an account yet?
          <a href="#" className="text-decoration-none" onClick={changeLayout}>
            {" "}
            Sign up
          </a>
        </p>
      </div>
      <p className="fw-bold" id="form-title">
        Sign in
      </p>
      <div className="form-control mb-3 input-wrapper">
        <input
          className="form-control border-0 fw-light"
          type="email"
          placeholder="Email"
          ref={emailRef}
        />
      </div>
      <div className="form-control mb-3 input-wrapper">
        <input
          className="form-control border-0 fw-light"
          type="password"
          placeholder="Password"
          ref={passRef}
        />
      </div>
      <a href="#" className="fw-light text-decoration-none">
        Forgot password?
      </a>
      <div className="d-grid mt-5">
        <button
          id="form-btn"
          className="btn btn-dark"
          type="submit"
          onClick={submitLogin}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default FormComponent;
