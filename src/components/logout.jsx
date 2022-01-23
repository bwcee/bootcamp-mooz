import React, { useState, useRef } from "react";
import axios from "axios";

const LogOut = ({ setLoggedIn }) => {
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

  return (
    <div>
      <p>Sucessfully logged in</p>
      <button className="btn btn-danger btn-sm" onClick={submitLogout}>
        Log me out!
      </button>
    </div>
  );
};

export default LogOut;
