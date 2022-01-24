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
    <button className="btn btn-danger btn-sm" onClick={submitLogout}>
      Log me out!
    </button>
  );
};

export default LogoutBtn;
