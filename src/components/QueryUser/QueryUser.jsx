import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import s from "./QueryUser.module.css";
import CardQueryUser from "./CardQueryUser/CardQueryUser";
import GoBackButton from "../goBackButton/GoBackButton";

function QueryUser() {
  const { _id } = useParams();
  var [user, setUser] = useState({});


  useEffect(() => {
    axios(
      `https://rocketproject2021.herokuapp.com/searchProfileID/${_id}`
    ).then((res) => setUser(res.data));
  }, []);


  return (
    <div className={s.QueryUser}>
      <GoBackButton />
      <div className={s.mainContainer}>
        <CardQueryUser user={user} />
      </div>
    </div>
  );
}

export default QueryUser;
