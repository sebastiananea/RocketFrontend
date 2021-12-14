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
    var res = await axios("http://localhost:3001/institution/eliminarCurso", {
      method: "post",
      data: {
        id,
        curso,
        name
      }
    })
    Swal.fire(
      'El curso fue eliminado',
      'Cambios aplicados!',
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
        
        <h4>Curso: {curso}   </h4>
        
      </div>
      <div className={s.name}>
        <h4>Alumnos: {users.length}   </h4>
        
      </div>
      <div className={s.stats}>
        <div className={s.rockets}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.48005 28.6886C7.93997 29.4803 7.03069 30 6 30H3C1.34315 30 0 28.6569 0 27.0001V13.5007C0 11.844 1.34315 10.5009 3 10.5009H6C6.29726 10.5009 6.58442 10.5441 6.85553 10.6246C8.46672 8.27808 13.8832 2.36297 15.3304 0.560802L15.7807 2.06991e-07H16.5C17.4222 -0.000138147 18.2134 0.0690389 19.1224 0.333714C21.1378 0.920536 22.5 2.29189 22.5 4.4998C22.5 5.27993 22.3619 6.11168 22.1073 7.03488C21.9389 7.6457 21.7308 8.26246 21.4456 9.02795C21.3587 9.26114 21.0108 10.1734 20.9322 10.3859C20.9178 10.4249 20.9039 10.4627 20.8905 10.4995H25.5C28.3044 10.4995 30 12.4757 30 14.9993C30 23.9143 28.1327 29.9987 24 29.9987L13.5516 29.9978C12.5113 30.0168 11.2582 29.878 9.99469 29.426C9.44283 29.2285 8.93511 28.9829 8.48005 28.6886ZM9 23.9989C9 25.3522 9.67795 26.1265 11.0053 26.6014C11.8659 26.9093 12.7881 27.0115 13.4446 26.9997C13.4555 26.9995 13.4555 26.9995 13.5 26.9988H24C25.5227 26.9988 27 22.1851 27 14.9993C27 14.0392 26.5368 13.4994 25.5 13.4994H19.5C17.7082 13.4994 17.3333 12.114 17.707 10.614C17.7949 10.2611 17.9234 9.87281 18.1184 9.3454C18.2037 9.11485 18.5534 8.19803 18.6344 7.98064C18.8916 7.29023 19.0742 6.74906 19.2152 6.23763C19.4039 5.55322 19.5 4.97465 19.5 4.4998C19.5 3.82337 19.1433 3.46424 18.2837 3.21396C17.9226 3.1088 17.5671 3.05085 17.1899 3.02256C14.8714 5.79402 9.60996 11.5516 9.21257 12.4794C9.06665 12.8201 9 13.1391 9 13.4994V23.9989ZM3 13.5007V27.0001H6V13.5007H3Z"
              fill="#0094FF"
            />
          </svg>
          <h4 style={{ color: "rgb(32, 95, 230)" }}>{score}</h4>
        </div>
        <div className={s.reports}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M30 8.7868V21.2132L21.2132 30H8.7868L0 21.2132V8.7868L8.7868 0H21.2132L30 8.7868ZM20.0835 2.72727H9.91647L2.72727 9.91647V20.0835L9.91647 27.2727H20.0835L27.2727 20.0835V9.91647L20.0835 2.72727ZM15.0004 23.1796C14.2471 23.1796 13.6364 22.569 13.6364 21.8159C13.6364 21.0628 14.2471 20.4523 15.0004 20.4523C15.7538 20.4523 16.3645 21.0628 16.3645 21.8159C16.3645 22.569 15.7538 23.1796 15.0004 23.1796ZM13.6404 6.81593H16.3686V17.725H13.6404V6.81593Z"
              fill="#DD0B0B"
            />
          </svg>
          <h4 style={{ color: "rgb(200, 0, 0)" }}>{}</h4>
        </div>
        <div className={s.asistencias}>
          <h5></h5>
        </div>
      </div>
      <div className={s.details}>
        <button onClick={() => offCurso()}>Eliminar curso</button>
      
      </div>
    </div>
  );
}

export default Cursos;
