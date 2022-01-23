import React, { useState, useRef } from "react";
import axios from "axios";

const ChooseClass = ({ setDisplay }) => {
  const emailRef = useRef();
  const passRef = useRef();

  const submitLogout = () => {
    try {
      localStorage.removeItem("sessionToken");
      window.location = "/";
    } catch (err) {
      console.log(err);
    }
  };

  const submitClass = () => {
    const token = localStorage.getItem("sessionToken");
    const auth = { headers: { Authorization: `Bearer ${token}` } };

    try {
      axios.get("/class", auth).then((result) => console.log(result.data));
      setDisplay("chose class!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <p>Sucessfully logged in</p>
      <button className="btn btn-primary btn-sm" onClick={submitClass}>
        Chose a class
      </button>
      <button className="btn btn-danger btn-sm" onClick={submitLogout}>
        Log me out!
      </button>
    </div>
  );
};

export default ChooseClass;
