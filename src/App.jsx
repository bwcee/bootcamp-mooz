import React, { useState, useRef } from "react";
// import axios from "axios";
import LogIn from "./components/login.jsx";
import ChooseKlass from "./components/chooseKlass.jsx";
import Klassroom from "./components/klassroom.jsx";

export default function App() {
  const [display, setDisplay] = useState();
<<<<<<< HEAD
  const [klassId, setKlassId] = useState()
=======
  const [klassId, setKlassId] = useState();
>>>>>>> changed localhost to 127.0.0.1 to enable mongoose connection. Added sockets and peer (to be continued)

  return (
    <div>
      <h1>Ladies and Gents, presenting... Mooz!</h1>
      {!display ? (
        <LogIn setDisplay={setDisplay} />
      ) : display == "logged in!" ? (
        <ChooseKlass setDisplay={setDisplay} setKlassId={setKlassId} />
      ) : display == "chose klass!" ? (
<<<<<<< HEAD
        <Video klassId={klassId}/>
=======
        <Klassroom klassId={klassId} />
>>>>>>> changed localhost to 127.0.0.1 to enable mongoose connection. Added sockets and peer (to be continued)
      ) : (
        <LogIn setDisplay={setDisplay} />
      )}
    </div>
  );
}
