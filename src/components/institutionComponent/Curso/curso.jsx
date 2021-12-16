import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from "axios";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Swal from "sweetalert2";
import Cryptr from "cryptr";
const cryptr = new Cryptr("contraseña")
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


    if (!vencimiento && institution) { 
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

                text={`https://rocketprojectarg.netlify.app/signin?institution=${cryptr.encrypt(institucion.name.replace(
                  /\s+/g,
                  "%20"
                ), "contraseña")}&curso=${cryptr.encrypt(institucion.curso, "contraseña")}`}

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

  } else {
    return (
      <div className={s.main_container}>
        <div className={s.card}>
          <div className={s.header}>
            <h2>Oops!</h2>
          </div>
          <div className={s.description}>
            {user.suscription === "01/01/2001" ? <p>
              You are not suscribed yet
            </p> :
            <p>Your suscription is expired since {user.suscription}</p>}
            
          </div>
          <div className={s.description}>
            <p>Click on the button below to activate your suscription.</p>
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
