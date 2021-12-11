import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Silla.module.css";
import axios from "axios";
import { useSelector } from 'react-redux'

function Silla({ img, name, _id }) {
  //variables que sirven para deshabilitar botones like/report cuando se presionan
  const [likeOrReport, setlikeOrReport] = useState({ like: false, report: "" });
  const myUser = useSelector((state)=>state.user)

  const onChange = async (e) => {
    e.preventDefault();
    if (e.target.value === "like") {
      axios.put(`https://rocketproject2021.herokuapp.com/increaseLike/${_id}`);
     
      const fecha = new Date()
      const mes = fecha.getMonth()
      const año = fecha.getFullYear()

      let group=myUser.curso;
      let date=`${mes}-${año}`
      axios.post(`http://localhost:3001/admin/like`,
      {
        group:group, date:date
      });

      setlikeOrReport({ ...likeOrReport, like: true });
    }

    if (e.target.value === "reports") {
      let reportText = prompt(`¿Por qué quieres reportar a ${name}?`);
      
      const fecha = new Date()
      const mes = fecha.getMonth()
      const año = fecha.getFullYear()

      
      let group=myUser.curso;
      let date=`${mes}-${año}`
      axios.post(`http://localhost:3001/admin/report`,
      {
        group:group, date:date
      }).then( axios.post(
        `https://rocketproject2021.herokuapp.com/increaseReports/${_id}`,
        {
          reportText,
        }
        
      )).then(setlikeOrReport({ ...likeOrReport, report: reportText }));

     
      
      
    }
  };

  return (
    <div className={style.silla__container}>
      <Link to={`/query/user/${_id}`}>
        <img alt="silla" src={img} className={style.silla__img} />
      </Link>
      <h4 className={style.silla__name}>{name}</h4>

      <select className={style.silla__select} onChange={(e) => onChange(e)}>
        <option disabled selected value="">
          Like / Report
        </option>

        {likeOrReport.like === false ? (
          <option value="like" name="">
            Like{" "}👍

          </option>
        ) : (
          <option disabled value="like" name="">
            Like{" "}👍

          </option>
        )}

        {likeOrReport.report === "" ? (
          <option value="reports">
            Report{" "}🚫

          </option>
        ) : (
          <option disabled value="reports">
            Report{" "}🚫

          </option>
        )}
      </select>
    </div>
  );
}

export default Silla;
