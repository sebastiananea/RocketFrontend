import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from "axios";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Swal from "sweetalert2";
import CryptoJS from 'crypto-js'
import s from "./curso.module.css";

import foto from "../../Images/institucion.jpeg";


function Curso() {
  let history = useHistory();
  let institution = useSelector((state) => state.user.suscription)

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

    if (!vencimiento && institution) { 
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
                text={`https://rocketprojectarg.netlify.app/signin?institution=${CryptoJS.Rabbit.encrypt(institucion.name.replace(
                  /\s+/g,
                  "%20"
                ), "contraseña")}&curso=${CryptoJS.Rabbit.encrypt(institucion.curso, "contraseña")}`}
              >
                <button type="submit" onClick={handleClick}>
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
