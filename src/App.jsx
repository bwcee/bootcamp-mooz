import React, { useState, useRef, useEffect } from "react";
import LogIn from "./components/login.jsx";
import ChooseKlass from "./components/chooseKlass.jsx";
import Klassroom from "./components/klassroom.jsx";
import io from "socket.io-client";

export default function App() {
  const [display, setDisplay] = useState();
  const [klassId, setKlassId] = useState();
  const socket = useRef();
  useEffect(() => {
    socket.current = io.connect("/");
  });

  /* 
  1. brackets below encapsulate react elements/ components to be returned 
  2. w/o brackets, given return is on a line by itself, e react elements/ components will not be returned
  3. return statement will essentially return undefined
  */
  return (
    <div id="app">
      {!display ? (
        <LogIn setDisplay={setDisplay} />
      ) : display == "logged in!" ? (
        <ChooseKlass
          setDisplay={setDisplay}
          setKlassId={setKlassId}
          socket={socket}
        />
      ) : display == "chose klass!" ? (
        <Klassroom setDisplay={setDisplay} klassId={klassId} socket={socket} />
      ) : (
        <LogIn setDisplay={setDisplay} />
      )}
    </div>
  );
}
