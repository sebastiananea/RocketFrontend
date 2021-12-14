import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import Silla from "../Silla/Silla.jsx";
import Loading from "../Loading/Loading.jsx";
import axios from "axios";
import ChatContain from "../RocketChat/Chat/ChatContain";

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [params, setparams] = useState(null);
  useEffect(async () => {
    await axios("https://rocketproject2021.herokuapp.com/isLog", {
      method: "post",
      data: { token: localStorage.getItem("token") },
    }).then((res) => localStorage.setItem("user", JSON.stringify(res.data)));

    let userr = JSON.parse(localStorage.getItem("user"));
    setparams(userr);

    let profiles = await axios
      .post("https://rocketproject2021.herokuapp.com/filterUserByTable", {
        table: userr.table,
        institution: userr.institution,
        curso: userr.curso,
      })
      .then((r) => r.data);
    setProfiles(profiles);
    console.log(profiles);
  }, []);

  const onClick = async () => {
    await axios("https://rocketproject2021.herokuapp.com/addPrecense", {
      method: "post",
      data: {
        ID: JSON.parse(localStorage.getItem("user"))._id,
      },
    });
  };

  return (
    <div className={style.home__container}>
      <div className={style.home__mesa}>
        <div>
          <h2>My Team</h2>
        </div>
        <div className={style.home__mesa__child}>
          {profiles.length ? (
            profiles.map((user) => (
              <Silla name={user.name} img={user.img} _id={user._id} />
            ))
          ) : (
            <Loading />
          )}
        </div>
        <div>
          <button className={style.home__btnlink}>
            <a
              className={style.home__btnlink_link}
              href={JSON.parse(localStorage.getItem("user")).meetLink}
              onClick={onClick}
              target="_blank"
            >
              Join Meet
            </a>
          </button>
        </div>
      </div>
      <div className={style.home__chat}>
        <h4>CHAT</h4>
        {params && params?.name ? (
          <div>
            <ChatContain table={`${params.institution}/Grupos/${params.curso}table${params.table}`} params={params} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
