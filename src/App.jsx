import React, { useState, useRef } from "react";
import axios from "axios";
import LogIn from "./components/login.jsx";
import ChooseClass from "./components/chooseClass.jsx";

export default function App() {
  const [display, setDisplay] = useState();

  return (
    <div>
      <h1>Ladies and Gents, presenting... Mooz!</h1>
      {!display ? (
        <LogIn setDisplay={setDisplay} />
      ) : display == "logged in!" ? (
        <ChooseClass setDisplay={setDisplay} />
      ) : display == "chose class!" ? (
        <p>This should show video for chosen class</p>
      ) : (
        <LogIn setDisplay={setDisplay} />
      )}
    </div>
  );
}
