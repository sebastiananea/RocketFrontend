import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import s from "./Register.module.css";
import axios from "axios";

let edadMax = 100;
let edades = [];
for (let i = 16; i < edadMax; i++) { edades.push(i) };

function Register() {

  let history = useHistory();
  var [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPass: "",
    country: "",
    gender: "",
    age: ""
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
      errors.name = "Full Name is required!";
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
  async function handleSubmit (e) {
    e.preventDefault();
    if (data.password === data.repeatPass) {

      let name = data.name.split(" "); 
      let nameArr = [];

      for (let n of name) {
        let word = n.charAt(0).toUpperCase() + n.slice(1).toLowerCase();
        nameArr.push(word)
      }

      let DefinitiveName = nameArr.join(' ');
      
      console.log(DefinitiveName)
      console.log(data)

      await axios("https://rocketproject2021.herokuapp.com/signup/:institution/:curso", {

        method: "post",
        data: {...data, name: DefinitiveName}
      }).then(history.push("/active-account/false"));
    }
  }

  return (
    <div className={s.mainContainer}>
      <div className={s.container}>
        <div className={s.formContainer}>
          <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <input
              className={s.fullname}
              type="text"
              placeholder="Full Name"
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
              placeholder="Repeat your Password"
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
              placeholder="Country"
              required
              name="country"
              value={data.country}
              onChange={(e) => handleChange(e)}
            />
            <div className={s.register_div_sexage}>

              <label className={s.register_sex}>Male</label>
              <input type="radio" name="gender" onChange={e => handleChange(e)} value="male"/>

              <label className={s.register_sex}>Female</label>
              <input type="radio" name="gender" onChange={e => handleChange(e)} value="female"/>

              <label className={s.register_sex}>Other</label>
              <input type="radio" name="gender" onChange={e => handleChange(e)} value="other"/>
              
              <label className={s.register_sex}>Age</label>
              <select className={s.register_select} name="age" onChange={e => handleChange(e)}>
              <option disabled>Select</option>
                {
                  edades && edades.map(edad => (
                    <option value={data.edad}>{edad}</option>
                  ))
                }
              </select>
            </div>
            <button
              type="submit"
              disabled={!habilitado}
              onClick={(e) => handleSubmit(e)}
              className={s.creator_btn}
            >
              SIGN UP
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

export default Register;
