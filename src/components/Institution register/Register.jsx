import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import s from "./Register.module.css";
import axios from "axios";
import foto from "./imgIntitucion.png"

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
  }, [data]);

  const inputValidate = (input) => {
    const errors = {};
    const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (!data.name) {
      errors.name = "institution name is required!";
      setHabilitado(false);
    }
    if (regex.test(data.email) === false) {
      errors.email = "E-mail is required!";
      setHabilitado(false);
    }
    if (!data.password) {
      errors.password = "Password is required!";
      setHabilitado(false);
    }
    if (data.password !== data.repeatPass) {
      console.log(data.repeatPass);
      errors.repeatPass = "Passwords do not match!";
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
      axios("http://localhost:3001/institution/signup", {
        method: "post",
        data: data,
      }).then(history.push("/institution"));
    }
  }

  return (
    <div className={s.mainContainer}>
      <div className={s.container}>
        <div className={s.formContainer}>
          <form onSubmit={handleSubmit}>
            <h2>Sign Up Institucion</h2>
            <input
              className={s.fullname}
              type="text"
              placeholder="Institution name "
              required
              name="name"
              value={data.name}
              onChange={(e) => handleChange(e)}
            />
            {errors.name && (
              <div className={s.register__err}>
                <strong>{errors.name}</strong>
              </div>
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
              <div className={s.register__err}>
                <strong>{errors.email}</strong>
              </div>
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
              <div className={s.register__err}>
                <strong>{errors.password}</strong>
              </div>
            )}
            <input
              className={s.repeatPass}
              type="password"
              placeholder="Repeat Password"
              required
              name="repeatPass"
              value={data.repeatPass}
              onChange={(e) => handleChange(e)}
            />
            {errors.repeatPass && (
              <div className={s.register__err}>
                <strong>{errors.repeatPass}</strong>
              </div>
            )}
            <input
              className={s.country}
              type="text"
              placeholder="Country"
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
              Sign Up
            </button>
          </form>
        </div>

        <div className={s.imgContainer}>
          <img
            src={foto}
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
