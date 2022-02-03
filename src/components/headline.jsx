import React from "react";

function HeadlineComponent({ signUpState }) {
  let bigMessage;
  let smallMessage;

  if (signUpState) {
    bigMessage = (
      <>
        Easy,
        <br />
        fun-filled
        <br />
        virtual
        <br />
        classes.
      </>
    );

    // smallMessage = <>*Workshops may not actually be delicious</>;
  } else {
    bigMessage = (
      <>
        Welcome
        <br />
        back,
        <br />
        steaks!
      </>
    );

    smallMessage = <>It's great to see you again!</>;
  }

  return (
    <div id="headline-container">
      <p className="h2" id="headline">
        {bigMessage}
      </p>
      <p className="h6">{smallMessage}</p>
    </div>
  );
}

export default HeadlineComponent;
