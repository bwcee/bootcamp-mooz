import React from "react";

const LogoutBtn = () => {
  const submitLogout = () => {
    try {
      localStorage.removeItem("sessionToken");
      window.location = "/";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <a class="dropdown-item" href="#" onClick={submitLogout}>
        Sign out
      </a>
    </>
  );
};

export default LogoutBtn;
