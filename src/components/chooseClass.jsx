import React, { useState, useRef } from "react";
import axios from "axios";
import LogoutBtn from "./logoutBtn.jsx";

const ChooseClass = ({ setDisplay }) => {
  const token = localStorage.getItem("sessionToken");
  const auth = { headers: { Authorization: `Bearer ${token}` } };

  // try {
  //   axios.get("/class", auth).then((result) => {
  //     console.log(result.data);
  //     result.data ? setDisplay("chose class!") : setDisplay();
  //   });
  // } catch (err) {
  //   console.log(err);
  // }

  const displayClasses = () => {};

  const submitClass = () => {
    try {
      axios.get("/class", auth).then((result) => {
        console.log(result.data);
        result.data ? setDisplay("chose class!") : setDisplay();
      });
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
      <LogoutBtn/>
    </div>
  );
};

export default ChooseClass;
