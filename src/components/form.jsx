import React, { useRef } from "react";
import axios from "axios";

function FormComponent({ signUpState, setDisplay, setSignUpState }) {
  const emailRef = useRef();
  const passRef = useRef();
  const nameRef = useRef();

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

  const submitNewUser = () => {
    if (
      !emailRef.current.value ||
      !passRef.current.value ||
      !nameRef.current.value
    ) {
      return alert("Eh fill in all fields leh!");
    }
    axios
      .post("/signup", {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passRef.current.value,
      })
      .then((result) => {
        if (!result.data || result.data.code == 11000 || result.data.errors) {
          emailRef.current.value = "";
          passRef.current.value = "";
          nameRef.current.value = "";
          return alert(
            "thousand apologies, something went wrong, mayhaps the email is already used, or you did not key in a proper email, pls try again"
          );
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

  if (signUpState) {
    return (
      <div className="flex-grow-1 shadow" id="form-container">
        <div className="d-flex justify-content-end">
          <p className="fw-light">
            Already have an account?
            <a href="#" className="text-decoration-none" onClick={changeLayout}>
              {" "}
              Sign in
            </a>
          </p>
        </div>
        <p className="fw-bold" id="form-title">
          Sign up
        </p>
        <div className="form-control mb-3 input-wrapper">
          <input
            className="form-control border-0 fw-light"
            type="text"
            placeholder="Name"
            ref={nameRef}
          />
        </div>
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
        <div className="form-check mb-2">
          <input className="form-check-input" type="checkbox" value="" />
          <label className="form-check-label fw-light">
            I accept Mooz app's{" "}
            <a href="#" className="text-decoration-none">
              Terms of Service
            </a>
          </label>
        </div>
        <div className="form-check mb-2">
          <input className="form-check-input" type="checkbox" value="" />
          <label className="form-check-label fw-light">
            Yes! Keep me updated with awesome and insightful product updates and
            occasional news by email.
          </label>
        </div>
        <span className="fw-light">
          We process your personal data in accordance with our{" "}
          <a href="#" className="text-decoration-none">
            Privacy Policy
          </a>
        </span>
        <div className="d-grid mt-5">
          <button
            id="form-btn"
            className="btn btn-dark"
            type="submit"
            onClick={submitNewUser}
          >
            Sign up
          </button>
        </div>
      </div>
    );
  } else {
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
}

export default FormComponent;
