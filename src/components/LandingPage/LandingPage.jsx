
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Google from "../../Images/google-logo-9808.png";
import "./LandingPage.css";
import axios from "axios";
import { setUser, saveData} from "../../Actions";
import { googleProvider } from "../../config/authMethods";
import Swal from "sweetalert2";
import socialMediaAuth from "../../service/Auth";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function LandingPage() {
  const query = useQuery();
  const institution = query.get("institution");
  const curso = query.get("curso");
  console.log(institution, curso)

  const dispatch = useDispatch();

  if (institution && curso) {
    dispatch(saveData([institution, curso]));
  }

  let history = useHistory();
  var [log, setLog] = useState({
    email: "",
    password: "",
  });

  useEffect(()=>{
    if(institution && curso){
      setLog({
        ...log,
        institution: institution,
        curso: curso
      })
    }
  },[])



  function handleChange(e) {
    const value = e.target.value;
    setLog({
      ...log,
      [e.target.name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await axios("http://localhost:3001/signin", {
      method: "post",
      data: log,
    }).then((r) => {
      if (r.data.token) {
        localStorage.setItem("token", r.data.token);
      } else if (!r.data.token) {
        setLog({ ...log, password: "" });
        if (r.data.account === "confirm your account is required")
          return Swal.fire(
            "La cuenta debe estar confirmada",
            "Por favor, revisa tu email"
          );
        else {
          return Swal.fire("Usuario o Contraseña incorrectos");
        }
      }
    });


    await axios("http://localhost:3001/isLog", {
      method: "post",
      data: { token: localStorage.getItem("token") },
    }).then((res) => {
      localStorage.setItem("user", JSON.stringify(res.data));
      dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
    });

    await axios("http://localhost:3001/user/changes", {

      method: "post",
      data: {
        new_status: "Online",
        id: JSON.parse(localStorage.getItem("user"))._id,
      },
    }).then(() => {
      if (JSON.parse(localStorage.getItem("user")).moderator === true)
        return history.push("/admin/students");
      else return history.push("/trueHome");
    });
  }

  const handleOnClick = async (provider) => {
    const user = await socialMediaAuth(provider);
    await axios("http://localhost:3001/logMedia", {
      method: "post",
      data: {
        name: user._delegate?.displayName,
        email: user._delegate.email,
        img: user._delegate.photoURL,
        status: "Online",
      },
    }).then((x) => localStorage.setItem("token", x.data.token));
    await axios("http://localhost:3001/isLog", {
      method: "post",
      data: { token: localStorage.getItem("token") },
    })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
      })
      .then(
        async () =>
          await axios.post(
            "http://localhost:3001/user/changes",
            {
              new_status: "Online",
              id: JSON.parse(localStorage.getItem("user"))._id,
            }
          )
      )
      .then(() => history.push("/trueHome"));
  };

  return (
    <div className="container">
      <div className="create-container">
        <div className="signIn">
          <h2>Log In</h2>
        </div>
        <div className="create-container-child">
          <div className="form">
            <form className="form-child" onSubmit={handleSubmit}>
              <div>
                <div className="form-group">
                  <label>
                    <h4>Email</h4>
                  </label>
                </div>
                <input
                  className="landingPage__input"
                  type="email"
                  name="email"
                  value={log.email}
                  id="myInput"
                  onChange={(e) => handleChange(e)}
                  required
                  autoComplete="off"
                />
                <div className="form-group">
                  <label>
                    <h4>Password</h4>
                  </label>
                </div>
                <input
                  className="landingPage__input"
                  type="password"
                  name="password"
                  value={log.password}
                  onChange={(e) => handleChange(e)}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="landingPage__button">
                <button className="landingPage__button_login" type="submit">
                  <h4 className="landingPage__button_text">LOG IN</h4>
                </button>
              </div>
            </form>
          </div>
          <div className="landingPage__login_image"></div>
          <h5>or login with</h5>

          <div className="landingPage__image">
            <button onClick={() => handleOnClick(googleProvider)}>
              <img src={Google} alt="Google" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
