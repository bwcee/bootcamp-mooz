import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import LogoutBtn from "./logoutBtn.jsx";

const ChooseKlass = ({ setDisplay, setKlassId }) => {
  const token = localStorage.getItem("sessionToken");
  const auth = { headers: { Authorization: `Bearer ${token}` } };
  const [allKlasses, setAllKlasses] = useState();
  let displayKlasses;

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
    // console.log("allKlasses", allKlasses);
    // console.log("allKlasses.klasses", allKlasses.klasses);
    displayKlasses = allKlasses.klasses.map((el, index) => {
      return (
        <div className="col-lg-6" key={index}>
          <div className="card rooms">
            <div className="row g-0">
              <div className="col-3" id="sizing">
                <img src="..." alt="..." className="img-fluid rounded-start" />
              </div>
              <div className="col-9">
                <div className="card-body">
                  <h5 className="card-title">{el.klassName}</h5>
                  <h6 className="card-subtitle text-muted">Card Subtitle</h6>
                  <a href="#" className="btn btn-primary">
                    Setup
                  </a>
                  <a
                    href="#"
                    className="btn btn-warning"
                    onClick={() => {
                      setDisplay("chose klass!");
                      setKlassId(el._id);
                    }}
                  >
                    Start session
                  </a>
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
    };
    // console.log(
    //   "This is learnerDetails stored in local storage",
    //   learnerDetails
    // );
    localStorage.setItem("learnerDetails", learnerDetails);
  }

  // console.log("displayKlasses", allKlasses);

  return (
    <div id="dashboard">
      <nav class="navbar navbar-expand-lg navbar-light" id="navbar">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <i class="far fa-hand-spock" id="app-logo"></i>
            <span className="h4" id="app-name">
              {" "}
              mooz
            </span>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-end"
            id="navbarNavDropdown"
          >
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="fw-bold btn btn-light nav-link" href="#">
                  <small>
                    <i class="fas fa-bullhorn"></i> Feeback?
                  </small>
                </a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <i class="far fa-user-circle" id="dropdown-icon"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li>
                    <a class="dropdown-item" href="#">
                      What's new
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Moov Handbook
                    </a>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Get desktop app
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Calendar Integration
                    </a>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
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
      <div className="row vh-100">
        <div className="col-2">
          <div className="d-flex flex-column" id="left-pane">
            <div
              class="btn-group-vertical btn-group-lg shadow-sm mb-4"
              id="top-btn-group"
            >
              <button type="button" class="btn btn-outline-dark">
                <p className="m-0 text-start">
                  <i class="fas fa-cube"></i> Rooms
                </p>
              </button>
              <button type="button" class="btn btn-outline-dark">
                <p className="m-0 text-start">
                  <i class="far fa-folder-open"></i> Recaps
                </p>
              </button>
              <button type="button" class="btn btn-outline-dark">
                <p className="m-0 text-start">
                  <i class="fas fa-cog"></i> Settings
                </p>
              </button>
            </div>
            <div class="btn-group-vertical btn-group-lg shadow-sm" role="group">
              <button type="button" class="btn btn-outline-dark">
                <p className="m-0 text-start">
                  <i class="far fa-heart"></i> Referrals
                </p>
              </button>
              <button type="button" class="btn btn-outline-dark">
                <p className="m-0 text-start">
                  <i class="far fa-file-alt"></i> Moov Handbook
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className="col" id="right-pane">
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
                  <i class="fas fa-external-link-alt"></i> Join a session
                </small>
              </button>
              <button className="join-btn btn btn-dark">
                <small className="">
                  <i class="fas fa-plus"></i> New room
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

// const submitClass = () => {
//   try {
//     axios.get("/class", auth).then((result) => {
//       console.log(result.data);
//       result.data ? setDisplay("chose class!") : setDisplay();
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// const AddPeople = ({person, setPerson}) => {
//   const personRef = useRef();

//   const submitPerson = () => {
//     if (!personRef.current.value) {
//       return alert("Eh dun liddat leh... key in name leh!");
//     }
//     setPerson([...person, personRef.current.value]);
//     /* only need to post the last person in the array to database */
//     axios
//       .post("/person", {
//         person: personRef.current.value,
//         billId: localStorage.getItem("billId"),
//       })
//       .then((createdPerson) => {
//         console.log("This is createdPerson", createdPerson);
//       });

//     /* reset input box to empty */
//     personRef.current.value = "";
//   };
//   console.log("This is person array", person)

//   const displayPeople = person.map((el, index) => {
//     return <li key={index}>{el}</li>;
//   });

//   return (
//     <div>
//       <label>
//         Input person name:
//         <input type="text" ref={personRef} />
//         <input type="submit" value="Submit" onClick={submitPerson} />
//       </label>
//       <ol>{displayPeople}</ol>
//     </div>
//   );
// };
