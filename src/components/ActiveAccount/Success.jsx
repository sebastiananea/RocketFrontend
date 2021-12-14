import React from "react";
import { useHistory } from "react-router-dom";
import s from "./Verify.module.css";

function Success() {
  let history = useHistory();
  return (
    <div className={s.main_container}>
      <div className={s.card}>
        <div className={s.header}>
          <h2>Your email adress has been succesfully verified!</h2>
        </div>
        <div className={s.btn}>
          <button onClick={() => history.push("/signin")}>Log in</button>
        </div>
      </div>
    </div>
  );
}

export default Success;
