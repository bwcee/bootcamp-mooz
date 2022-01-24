import React, { useState, useRef } from "react";
import axios from "axios";
import LogIn from "./components/login.jsx";
import ChooseKlass from "./components/chooseKlass.jsx";
import Video from "./components/video.jsx";

export default function App() {
  const [display, setDisplay] = useState();

  return (
    <div>
      <h1>Ladies and Gents, presenting... Mooz!</h1>
      {!display ? (
        <LogIn setDisplay={setDisplay} />
      ) : display == "logged in!" ? (
        <ChooseKlass setDisplay={setDisplay} />
      ) : display == "chose klass!" ? (
        <Video />
      ) : (
        <LogIn setDisplay={setDisplay} />
      )}
    </div>
  );
}
