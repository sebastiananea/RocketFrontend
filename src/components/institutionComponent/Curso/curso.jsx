import { useHistory } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import s from "./curso.module.css";
import { SetNewCourse } from "../../../Actions/index";
import foto from "../../Images/institucion.jpeg";

function Curso() {
  let history = useHistory();
  var obj = {
    id: JSON.parse(localStorage.getItem("user"))._id,
    name: JSON.parse(localStorage.getItem("user")).name,
    curso: "",
  };

  const [institucion, setIntitucion] = useState(obj);

  function handleChange(e) {
    const { name, value } = e.target;

    //Guarda en el estado
    setIntitucion({
      ...institucion,
      [name]: value, // Sintaxis ES6 para actualizar la key correspondiente
    });
  }

  const user = JSON.parse(localStorage.getItem("user"));
  const vencimiento =
    Date.parse(
      new Date(
        user.suscription.split("/")[2],
        user.suscription.split("/")[1],
        user.suscription.split("/")[0]
      )
    ) < Date.parse(new Date());

  // async function handleClick(e) {
  //   e.preventDefalut()
  //   const flag = await SetNewCourse(institucion)
  //   console.log(flag)
  //   setIntitucion(obj)

  //   flag === true
  //   ? alert("Recipe successfully created")
  //   : alert("hubo un error en la carga");

  // }

  async function handleClick(e) {
    e.preventDefault();
    var json = await axios(
      "https://rocketproject2021.herokuapp.com/institution/cursoNuevo",
      {
        method: "post",
        data: institucion,
      }
    );

    json.data === true ? alert("Curso Creado") : alert("ya existe el curso ");
  }

  if (!vencimiento) {
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

              <CopyToClipboard
                text={`https://rocketprojectarg.netlify.app/signup/${institucion.name.replace(
                  /\s+/g,
                  "%20"
                )}/${institucion.curso}`}
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
  } else {
    return (
      <div className={s.main_container}>
        <div className={s.card}>
          <div className={s.header}>
            <h2>Oops!</h2>
          </div>
          <div className={s.description}>
            <p>Your suscription is expired since {user.suscription}</p>
          </div>
          <div className={s.description}>
            <p>Click on the button below to activate your suscription again.</p>
          </div>
          <div className={s.btn}>
            <button onClick={() => history.push("/institucion/admin/payment")}>
              Pay
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Curso;
