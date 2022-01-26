import React, { useState, useRef } from "react";
// import axios from "axios";
import LogIn from "./components/login.jsx";
import ChooseKlass from "./components/chooseKlass.jsx";
import Klassroom from "./components/klassroom.jsx";

export default function App() {
  const [display, setDisplay] = useState();
  const [klassId, setKlassId] = useState();

  return (
    <div id="app">
      {!display ? (
        <LogIn setDisplay={setDisplay} />
      ) : display == "logged in!" ? (
        <ChooseKlass setDisplay={setDisplay} setKlassId={setKlassId} />
      ) : display == "chose klass!" ? (
        <Klassroom klassId={klassId} />
      ) : (
        <LogIn setDisplay={setDisplay} />
      )}
    </div>
  );
}
