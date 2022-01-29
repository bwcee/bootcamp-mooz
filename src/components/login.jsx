import React, { useState } from "react";
import HeadlineComponent from "./headline.jsx";
import FormComponent from "./form.jsx";

const LogIn = ({ setDisplay }) => {
  const [signUpState, setSignUpState] = useState(false);

  return (
    <div id="login">
      <div className="container p-0">
        <div className="row vh-100">
          <div className="col-lg d-flex flex-column p-0">
            <div className="p-0 col-12" id="logo-container">
              <i className="far fa-hand-spock" id="app-logo"></i>
              <span className="h4" id="app-name">
                {" "}
                mooz
              </span>
            </div>
            <HeadlineComponent signUpState={signUpState} />
          </div>
          <div className="col-lg d-flex justify-content-end align-items-center p-0">
            <div id="align-form">
              <FormComponent
                signUpState={signUpState}
                setDisplay={setDisplay}
                setSignUpState={setSignUpState}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
