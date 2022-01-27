import React from "react";

function HeadlineComponent({ signUpState }) {
  let bigMessage;
  let smallMessage;

  if (signUpState) {
    bigMessage = (
      <>
        Smooth,
        <br />
        delicious
        <br />
        virtual
        <br />
        workshops.
      </>
    );

    smallMessage = <>*Workshops may not actually be delicious</>;
  } else {
    bigMessage = (
      <>
        Welcome
        <br />
        back,
        <br />
        buttercup!
      </>
    );

    smallMessage = <>It's great to see you again!</>;
  }

  return (
    <div>
      <p className="h2" id="headline">
        {bigMessage}
      </p>
      <p className="h6">{smallMessage}</p>
    </div>
  );
}

export default HeadlineComponent;
