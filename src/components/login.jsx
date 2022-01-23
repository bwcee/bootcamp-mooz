import React, { useState, useRef } from "react";
import axios from "axios";

const LogIn = ({ setLoggedIn }) => {
  const emailRef = useRef();
  const passRef = useRef();

  const submitLogin = () => {
    if (!emailRef.current.value || !passRef.current.value) {
      return alert("Eh fill in all fields leh!");
    }
    /* 
    1. create new bill entry in bills table + store bill_id in local storage 
    2. trigger rendering of nxt part of app
    */
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
          setLoggedIn("logged in!");
        }
      });
  };

  return (
    <div>
      <label>
        Input email:
        <input type="email" ref={emailRef} />
      </label>
      <label>
        Input password:
        <input type="password" ref={passRef} />
        <input type="submit" value="Submit" onClick={submitLogin} />
      </label>
    </div>
  );
};

export default LogIn;
