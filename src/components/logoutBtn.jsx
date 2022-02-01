import React from "react";

const LogoutBtn = () => {
  const submitLogout = () => {
    try {
      localStorage.removeItem("sessionToken");
      localStorage.removeItem("learnerDetails");
      window.location = "/";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <a className="dropdown-item" href="#" onClick={submitLogout}>
        Sign out
      </a>
    </>
  );
};

export default LogoutBtn;
