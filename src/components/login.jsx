import React, { useState } from "react";
import HeadlineComponent from "./headline.jsx";
import FormComponent from "./form.jsx";

const LogIn = ({ setDisplay }) => {
  const [signUpState, setSignUpState] = useState(false);

  return (
    <div id="login">
      <div className="container p-0">
        <div className="p-0" id="logo-container" />
        <div className="row vh-100">
          <div className="col-lg d-flex p-0">
            <HeadlineComponent signUpState={signUpState} />
          </div>
          <div className="col-lg d-flex justify-content-end p-0">
            <FormComponent
              signUpState={signUpState}
              setDisplay={setDisplay}
              setSignUpState={setSignUpState}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
