import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import LogoutBtn from "./logoutBtn.jsx";

const ChooseKlass = () => {
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
      setAllKlasses(result.data.klasses);
    }
  });

  /* need this if condition to prevent allKlasses.map frm failing when allKlasses is not yet populated with result.data.klasses */
  if (allKlasses) {
    displayKlasses = allKlasses.map((el, index) => {
      return (
        <li key={index}>
          <button className="btn btn-primary btn-sm">{el.klassName}</button>
        </li>
      );
    });
  }

  console.log("displayKlasses", allKlasses);

  return (
    <div>
      <p>Sucessfully logged in</p>
      <ul>{displayKlasses}</ul>
      <LogoutBtn />
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
