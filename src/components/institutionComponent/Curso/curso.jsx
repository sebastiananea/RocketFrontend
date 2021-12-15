import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import s from "./curso.module.css";
import { SetNewCourse } from "../../../Actions/index";
import foto from "../../Images/institucion.jpeg";
import axios from "axios";
import Swal from "sweetalert2";

function Curso() {
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
          "El curso fue creado con exito",
          "El link fue copiado en el portapales!",
          "Succes!"
        )
      : Swal.fire(
          "Ya existe un curso con este nombre",
          "El link fue copiado en el portapales!",
          "Succes!"
        );

  }

  return (
    <div className={s.Curso}>
      <div className={s.primerContainer}>
        <div className={s.titulo}>
          <h1> ¡Hola {institucion.name}! </h1>
          <h3>
            Dale nombre a tu curso y comparte el Link con tus estudiantes e
            instructores.
          </h3>
        </div>
        <img src={foto} alt="institucion" />
      </div>

      <div className={s.fomrCentrado}>
        <div className={s.segundoContainer}>
          <form className={s.border}>
            <input
              type="text"
              placeholder="Nombre del curso"
              required
              name="curso"
              onChange={(e) => handleChange(e)}
            />

            {/* <CopyToClipboard
              text={`https://rocketprojectarg.netlify.app/login/${institucion.name.replace(
                /\s+/g,
                "%20"
              )}/${institucion.curso}`}
            > */}
            <CopyToClipboard
              text={`https://rocketprojectarg.netlify.app/signin?institution=${institucion.name.replace(
                /\s+/g,
                "%20"
              )}&curso=${institucion.curso}`}
            >
              <button type="submit" onClick={(e) => handleClick(e)}>
                Copiar Link
              </button>
            </CopyToClipboard>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Curso;
