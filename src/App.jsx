import React, { useState, useRef } from "react";
import axios from "axios";
import LogIn from "./components/login.jsx";
import LogOut from "./components/logout.jsx";

export default function App() {
  const [loggedIn, setLoggedIn] = useState();

  return (
    <div>
      <h1>Ladies and Gents, presenting... Mooz!</h1>
      {!loggedIn ? <LogIn setLoggedIn={setLoggedIn} /> : <LogOut />}
    </div>
  );
}
