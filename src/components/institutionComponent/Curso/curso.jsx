import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import s from "./curso.module.css";
import { useSelector } from 'react-redux';
import foto from "../../Images/institucion.jpeg";
import axios from "axios";
import Swal from "sweetalert2";
import CryptoJS from 'crypto-js'


function Curso() {
  // let institution = useSelector((state) => state.user.suscription)
  var obj = {
    id: JSON.parse(localStorage.getItem("user"))._id,
    name: JSON.parse(localStorage.getItem("user")).name,
    curso: "",
  };

  const [institucion, setIntitucion] = useState(obj);

  function handleChange(e) {
    const { name, value } = e.target;

    setIntitucion({
      ...institucion,
      [name]: value,
    });
  }

  async function handleClick(e) {
    e.preventDefault();
    var json = await axios(
      "https://rocketproject2021.herokuapp.com/institution/cursoNuevo",
      {
        method: "post",
        data: institucion,
      }
    );


    json.data === true
      ? Swal.fire(
        "The course was created successfully",
        "The link was copied to the clipboard!",
        "Succes!"
      )
      : Swal.fire(
        "A course with this name already exists",
        "The link was copied to the clipboard!",
        "Succes!"
      );

  }

  // if (institution) {
    return (
      <div className={s.Curso}>
        <div className={s.primerContainer}>
          <div className={s.titulo}>
            <h1> ¡Welcome {institucion.name}! </h1>
            <h3>
            Give your course a name and share the Link with your students and
              instructors.
            </h3>
          </div>
          <img src={foto} alt="institucion" />
        </div>

        <div className={s.fomrCentrado}>
          <div className={s.segundoContainer}>
            <form className={s.border}>
              <input
                type="text"
                placeholder="Course name"
                required
                name="curso"
                onChange={(e) => handleChange(e)}
              />

              <CopyToClipboard
                text={`https://rocketprojectarg.netlify.app/signin?institution=${CryptoJS.Rabbit.encrypt(institucion.name.replace(
                  /\s+/g,
                  "%20"
                ), "contraseña")}&curso=${CryptoJS.Rabbit.encrypt(institucion.curso, "contraseña")}`}
              >
                <button type="submit" onClick={(e) => handleClick(e)}>
                Copy link
                </button>
              </CopyToClipboard>
            </form>
          </div>
        </div>
      </div>
    );
  // }
  // else {
  //   return (
  //     <div></div>
  //   )
  // }
}

export default Curso;
