import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import LogoutBtn from "./logoutBtn.jsx";

const ChooseKlass = ({ setDisplay, setKlassId }) => {
  const token = localStorage.getItem("sessionToken");
  const auth = { headers: { Authorization: `Bearer ${token}` } };
  const [allKlasses, setAllKlasses] = useState();
  let displayKlasses;
  const downloadLink = useRef();
  const [attendCSV, setAttendCSV] = useState();

  /* 
  1. if condition below prevents infinite loop from taking place
  2. basically this component will keep re-running until result comes bck from axios.get
  */

  axios.get("/class", auth).then((result) => {
    if (!allKlasses) {
      setAllKlasses(result.data);
    }
  });

  /* need this if condition to prevent allKlasses.map frm failing when allKlasses is not yet populated with result.data.klasses */
  if (allKlasses) {
    displayKlasses = allKlasses.klasses.map((el, index) => {
      return (
        <div className="col-lg-6" key={index}>
          <div className="card rooms">
            <div className="row g-0">
              <div className="col-3 img-cap text-center">
                <img
                  src="../default-cover-image.png"
                  alt="cover-img"
                  className="img-fluid rounded-start class-img"
                />
              </div>
              <div className="col-9 d-flex">
                <div className="card-body d-flex flex-column ">
                  <div className="d-flex flex-column flex-fill">
                    <h5 className="card-title text-capitalize fw-bold">
                      {el.klassName}
                    </h5>
                    <h6 className="card-subtitle text-muted">
                      <small>Personal Room</small>
                    </h6>
                  </div>
                  <div className="d-flex justify-content-end">
                    <a href="#" className="btn btn-outline-dark me-2 room-btn">
                      Setup
                    </a>
                    <a
                      href="#"
                      className="btn btn-outline-dark room-btn"
                      onClick={() => {
                        setDisplay("chose klass!");
                        setKlassId(el._id);
                        /* attendance only taken for learners, not teachers */
                        if (allKlasses.learnerRole == "learner") {
                          axios.put(
                            "/class/attendance",
                            {
                              klassId: el._id,
                              learnerId: allKlasses.learnerId,
                            },
                            auth
                          );
                        }
                      }}
                    >
                      Join session
                    </a>
                    {/* show download attendance btn only if learnerRole is not learner */}
                    {allKlasses.learnerRole !== "learner" ? (
                      <a
                        href="#"
                        className="btn btn-outline-dark room-btn mx-2"
                        onClick={() => {
                          /* function to download attendance here... */
                          axios
                            .get(`/class/attendance/${el._id}`, auth)
                            .then((result) => {
                              console.log("This is attendance csv", result);

                              if (!attendCSV) {
                                setAttendCSV(result.data);
                              } else {
                                resetAttendCSV();
                              }
                            });
                        }}
                      >
                        Download attendance
                      </a>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    /* set local storage for learner details */
    const learnerDetails = {
      id: allKlasses.learnerId,
      learner: allKlasses.learnerName,
      role: allKlasses.learnerRole,
    };
    localStorage.setItem("learnerDetails", JSON.stringify(learnerDetails));
  }

  /* function to call  */
  const resetAttendCSV = () => {
    downloadLink.current.click();
    setAttendCSV();
  };
  return (
    <div id="dashboard">
      <nav className="navbar navbar-expand-lg navbar-light" id="navbar">
        <div className="container-fluid">
          <a className="navbar-brand" id="navbar-brand-custom" href="#">
            <img src="../cow-logo.jpg" alt="cow-logo" className="cow-logo" />
            <span className="h4" id="app-name">
              {" "}
              mooz
            </span>
          </a>
          {/* "invisible link to enable auto-download of csv file" */}
          <a
            ref={downloadLink}
            href={"data:text/csv;charset=utf-8," + attendCSV}
            target="blank"
            download="exported.csv"
          ></a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="fw-bold btn btn-outline-light nav-link" href="#">
                  <small>
                    <i className="fas fa-bullhorn"></i> Feedback?
                  </small>
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <i className="far fa-user-circle" id="dropdown-icon"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="#">
                      What's new
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Moov Handbook
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Get desktop app
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Calendar Integration
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <LogoutBtn />
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="d-flex vh-100" id="dash-container">
        <div className="col-2">
          <div className="d-flex flex-column" id="left-pane">
            <div
              className="btn-group-vertical btn-group-lg shadow-sm mb-4"
              id="top-btn-group"
            >
              <button type="button" className="btn btn-outline-dark">
                <p className="m-0 text-start">
                  <i className="fas fa-cube"></i> Rooms
                </p>
              </button>
              <button type="button" className="btn btn-outline-dark">
                <p className="m-0 text-start">
                  <i className="far fa-folder-open"></i> Recaps
                </p>
              </button>
              <button type="button" className="btn btn-outline-dark">
                <p className="m-0 text-start">
                  <i className="fas fa-cog"></i> Settings
                </p>
              </button>
            </div>
            <div
              className="btn-group-vertical btn-group-lg shadow-sm"
              role="group"
            >
              <button type="button" className="btn btn-outline-dark">
                <p className="m-0 text-start">
                  <i className="far fa-heart"></i> Referrals
                </p>
              </button>
              <button type="button" className="btn btn-outline-dark">
                <p className="m-0 text-start">
                  <i className="far fa-file-alt"></i> Moov Handbook
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className="col-10" id="right-pane">
          <div className="d-flex justify-content-between mb-4">
            <div className="d-flex">
              <p className="m-0 me-3" id="rooms-title">
                Rooms
              </p>
              <div className="ms-3 me-3 align-self-center">
                <a href="#" className="btn-sm btn-light text-decoration-none">
                  <small className="fw-bold">My rooms</small>
                </a>
              </div>
              <div className="align-self-center">
                <a href="#" className="btn-sm btn-light text-decoration-none">
                  <small className="fw-bold text-muted">Shared with me</small>
                </a>
              </div>
            </div>
            <div className="d-flex">
              <button className="join-btn btn btn-outline-dark me-2">
                <small className="">
                  <i className="fas fa-external-link-alt"></i> Join a session
                </small>
              </button>
              <button className="join-btn btn btn-dark">
                <small className="">
                  <i className="fas fa-plus"></i> New room
                </small>
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-between mb-4">
            <p className="m-0 h5 fw-bold align-self-end">Your rooms</p>
            <input
              className=""
              type="text"
              placeholder="Search"
              id="searchbar"
            />
          </div>
          <div className="container p-0" id="rooms-container">
            <div className="row">{displayKlasses}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseKlass;
