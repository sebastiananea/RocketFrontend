import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import s from "./Register.module.css";
import axios from "axios";


function RegisterInstitution() { 
  let history = useHistory();
  var [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPass: "",
    country: "",
  });

  const [errors, setErrors] = React.useState({});
  const [habilitado, setHabilitado] = React.useState(false);

  useEffect(() => {
    setErrors(inputValidate(data));
  },[data]);

  const inputValidate = (input) => {
    const errors = {};
    const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (!data.name) {
      errors.name = "El nombre de la institucion es obligatorio!";
      setHabilitado(false);
    }
    if (regex.test(data.email) === false) {
      errors.email = "E-mail es obligatorio!";
      setHabilitado(false);
    }
    if (!data.password) {
      errors.password = "Password es obligatorio!";
      setHabilitado(false);
    }
    if (data.password !== data.repeatPass) {
      console.log(data.repeatPass);
      errors.repeatPass = "Passwords no es igual!";
      setHabilitado(false);
    } else setHabilitado(true);

    return errors;
  };

  function handleChange(e) {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (data.password === data.repeatPass) {
      axios("https://rocketproject2021.herokuapp.com/institution/signup", {
        method: "post",
        data: data,
      }).
      then(history.push("/"));
    }
  }

  return (
    <div className={s.mainContainer}>
      <div className={s.container}>
        <div className={s.formContainer}>
          <form onSubmit={handleSubmit}>
            <h2>Crear Institucion</h2>
            <input
              className={s.fullname}
              type="text"
              placeholder="Nombre Institucion"
              required
              name="name"
              value={data.name}
              onChange={(e) => handleChange(e)}
            />
            {errors.name && (
              <div className={s.register__err}><strong>{errors.name}</strong></div>
            )}
            <input
              className={s.email}
              type="email"
              placeholder="E-mail"
              required
              name="email"
              value={data.email}
              onChange={(e) => handleChange(e)}
            />
            {errors.email && (
              <div className={s.register__err}><strong>{errors.email}</strong></div>
            )}
            <input
              className={s.password}
              type="password"
              placeholder="Password"
              required
              name="password"
              value={data.password}
              onChange={(e) => handleChange(e)}
            />
            {errors.password && (
              <div className={s.register__err}><strong>{errors.password}</strong></div>
            )}
            <input
              className={s.repeatPass}
              type="password"
              placeholder="Repetir Password"
              required
              name="repeatPass"
              value={data.repeatPass}
              onChange={(e) => handleChange(e)}
            />
            {errors.repeatPass && (
              <div className={s.register__err}><strong>{errors.repeatPass}</strong></div>
            )}
            <input
              className={s.country}
              type="text"
              placeholder="Pais"
              required
              name="country"
              value={data.country}
              onChange={(e) => handleChange(e)}
            />
            <button
              type="submit"
              disabled={!habilitado}
              onClick={(e) => handleSubmit(e)}
              className={s.creator_btn}
            >
              Crear
            </button>
          </form>
        </div>

        <div className={s.imgContainer}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Creative-Tail-rocket.svg/768px-Creative-Tail-rocket.svg.png"
            alt="rocket"
            width="90%"
          />
          <p className={s.parrafo}>
            <p>
              The sky is not the limit <br />
              is just the beginning...
            </p>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterInstitution;