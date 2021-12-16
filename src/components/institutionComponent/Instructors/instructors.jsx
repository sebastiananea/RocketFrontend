import React from "react";
import s from "./Instructors.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

function Instructors({ img, _id, name, score, reports, curso }) {
  let history = useHistory();

  async function offInstructor(e) {

    await axios(
      "https://rocketproject2021.herokuapp.com/institution/setInstructor",
      {
        method: "post",
        data: {
          id: _id,
          moderator: false,
        },
      }

    );
    Swal.fire(
      'Instructor remove',
      'Changes applied!',
      'success'
    )


    history.push("/institucion/admin/estudiantes");
  }

  return (
    <div className={s.container}>
      <div className={s.imgContainer}>
        <img src={img} alt="" width="45px" height="45px" />
      </div>
      <div className={s.name}>
        <h4>{name}</h4>
      </div>
      <div className={s.stats}>
        <div className={s.asistencias}>
          <h5>Curso: {curso}</h5>
        </div>
      </div>
      <div className={s.details}>
        <button onClick={() => offInstructor()} className={s.btn}>Remove</button>
        
      </div>
    </div>
  );
}

export default Instructors;
