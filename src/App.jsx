import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
import LogIn from "./components/login.jsx";
import ChooseKlass from "./components/chooseKlass.jsx";
import Klassroom from "./components/klassroom.jsx";
import io from "socket.io-client";

export default function App() {
  const [socket, setSocket] = useState(null);
  const [display, setDisplay] = useState();
  const [klassId, setKlassId] = useState();

  useEffect(() => {
    const newSocket = io("/");
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);
  // Question to figure out: how does "setSocket" even get modified in the first place
  // Question to figure out: why do we need a "return ()"?

  return (
    <div id="app">
      {!display ? (
        <LogIn setDisplay={setDisplay} />
      ) : display == "logged in!" ? (
        <ChooseKlass setDisplay={setDisplay} setKlassId={setKlassId} />
      ) : display == "chose klass!" ? (
        socket ? (
          <Klassroom klassId={klassId} />
        ) : (
          <div>Not Connected</div>
        )
      ) : (
        <LogIn setDisplay={setDisplay} />
      )}
    </div>
  );
}
