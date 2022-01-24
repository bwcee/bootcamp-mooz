import React, { useState, useRef } from "react";
import axios from "axios";
import LogIn from "./components/login.jsx";
import ChooseClass from "./components/chooseClass.jsx";
import Video from "./components/video.jsx";

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
        <Video/>
      ) : (
        <LogIn setDisplay={setDisplay} />
      )}
    </div>
  );
}
