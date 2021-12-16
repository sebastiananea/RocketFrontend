import React, { useState, useEffect } from "react";
import s from "./Cursos.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

function Cursos({ id, name, institution,curso, score, reports,  }) {
  
  let history = useHistory()
  var [users, setUsers] = useState([]);
  //elimina el curso
  async function offCurso(e) {
    var res = await axios("https://rocketproject2021.herokuapp.com/institution/eliminarCurso", {
      method: "post",
      data: {
        id,
        curso,
        name
      }
    })
    Swal.fire(
      'Course deleted',
      'Changes applied!',
      'success'
    )
    history.push("/institucion/admin/curso")
  }

//Alumnos
async function getStudents(e) {
  var res = await axios("https://rocketproject2021.herokuapp.com/institution/alumnos", {
    method: "post",
    data: {
      name: institution,
    },
  }).then((x) => x.data);

  let alumnos = res.filter( a => a.curso === curso)
  setUsers(alumnos);
}

useEffect(() => {
  getStudents()
  
  console.log("EFFECT");
}, []);

  return (
    <div className={s.container}>
      <div className={s.imgContainer}>
       
      </div>
      <div className={s.name}>
        
        <h4>Course: {curso}   </h4>
        
      </div>
      <div className={s.name}>
        <h4>Students: {users.length}   </h4>
        
      </div>
      <div className={s.stats}>
      </div>
      <div className={s.details}>
        <button onClick={() => offCurso()}>Delete course</button>
      </div>
    </div>
  );
}

export default Cursos;
