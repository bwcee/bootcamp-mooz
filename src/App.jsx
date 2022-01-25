import React, { useState, useRef } from "react";
import axios from "axios";
import LogIn from "./components/login.jsx";
import ChooseKlass from "./components/chooseKlass.jsx";
import Video from "./components/video.jsx";

export default function App() {
  const [display, setDisplay] = useState();
  const [klassId, setKlassId] = useState()

  return (
    <div>
      <h1>Ladies and Gents, presenting... Mooz!</h1>
      {!display ? (
        <LogIn setDisplay={setDisplay} />
      ) : display == "logged in!" ? (
        <ChooseKlass setDisplay={setDisplay} setKlassId={setKlassId} />
      ) : display == "chose klass!" ? (
        <Video klassId={klassId}/>
      ) : (
        <LogIn setDisplay={setDisplay} />
      )}
    </div>
  );
}
