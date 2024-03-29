import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import GoBackButton from "../goBackButton/GoBackButton";
import { country_list } from "../index";
import avatars from "../../avatars/avatarsarr";
import ss from "./Profile.module.css";
import Swal from "sweetalert2";
import avatarPorDefaultAlien from "../../avatars/avatar21-alien.png";
import { setUser } from "../../Actions";

const Profile = () => {
  const dispatch = useDispatch();
  const [obj, setObj] = useState({});
  const [boolean, setBoolean] = useState(false);

  const [field, setField] = useState({
    about: null,
    img: null,
    country: null,
    status: null,
  });

  let id = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {

    axios(`https://rocketproject2021.herokuapp.com/searchProfileID/${id}`).then(
      (r) => setObj(r.data)
    );
    setBoolean(false);
  }, [boolean]);

  // const [checket, setChecket] = useState(obj?.enhableContact);

  async function showContactFalse() {
    setObj({ ...obj, enhableContact: false })
    await axios.post('https://rocketproject2021.herokuapp.com/user/changes', {
      new_enhableContact: false,
      id: obj._id,
    })
    console.log("true", obj.enhableContact)
  }
  async function showContactTrue() {
    await setObj({ ...obj, enhableContact: true })
    await axios.post('https://rocketproject2021.herokuapp.com/user/changes', {
      new_enhableContact: true,
      id: obj._id,
    })
    console.log("false", obj.enhableContact)
  }

  function handleChange(e) {
    setField({
      ...field,
      [e.target.name]: e.target.value,
    });
    setObj({
      ...obj,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    Swal.fire("Cambios aplicados", "satisfactoriamente!", "success");
    const newChanges = {
      new_img: field.img,
      new_about: field.about,
      new_country: field.country,
      new_status: field.status,
      id: obj._id,
    };


    await axios
      .post("https://rocketproject2021.herokuapp.com/user/changes", newChanges)
      .then(() => setBoolean(true));
    let myUser = JSON.parse(localStorage.getItem("user"));
    myUser.img = field.img;
    localStorage.setItem("user", JSON.stringify(myUser));
    setField({
      about: null,
      img: null,
      country: null,
      status: null,
    });
    dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
  }

  function setButtonStatus(status) {
    switch (status) {
      case "Online":
        return "🟢";
      case "Busy":
        return "🟡";
      case "Sleeping":
        return "🔵";
      case "Offline":
        return "⚫";
      default:
        return "⚪ Status is not defined";
    }
  }
  let buttonStatus = setButtonStatus(obj.status);

  return (
    <>
      <GoBackButton />
      <div className={ss.profile_container}>
        <div className={ss.profile_card}>
          <img
            src={obj.img ? obj.img : avatarPorDefaultAlien}
            alt="avatar"
            className={ss.profile_img}
            width="150"
          />
          <div>
            <h4>{obj.name ? obj.name : "User Name"}</h4>
            <p className={ss.profile_status}>
              {buttonStatus} {obj.status}
            </p>

            <p className={ss.profile_country}>
              {obj.country ? obj.country : "Unspecified country"}
            </p>
            <p className={ss.profile_inst}>
              {obj.institution ? obj.institution : "Unspecified institution"}
            </p>
            <hr />

            <h6>About</h6>
            <p className={ss.profile_about}>
              {obj.about
                ? obj.about
                : "Introduce yourself... c'mon! tell everybody who you're, don't be shy!"}
            </p>
          </div>
        </div>

        <div className={ss.profile_changes}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <span className={ss.profile_changes_label}>
                <strong>Country</strong>{" "}
              </span>
              <select
                className={ss.profile_select}
                type="text"
                name="country"
                value={field.country}
                onChange={(e) => handleChange(e)}
              >
                <option disabled selected>
                  Select...
                </option>
                {country_list.map((country) => {
                  return <option key={country}>{country}</option>;
                })}
              </select>
            </div>
            <hr />
            <div>
              <span className={ss.profile_changes_label}>
                <strong>Avatar</strong>{" "}
              </span>
              <select
                className={ss.profile_select}
                name="img"
                onChange={(e) => handleChange(e)}
              >
                <option disabled selected>
                  Select...
                </option>
                {avatars.map((avatar, index) => (
                  <option key={index} value={avatar}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
            <hr />
            <div>
              <span className={ss.profile_changes_label}>
                <strong>Status</strong>{" "}
              </span>
              <select
                className={ss.profile_select}
                type="text"
                name="status"
                value={field.status}
                onChange={(e) => handleChange(e)}
              >
                <option disabled selected>
                  Select...
                </option>
                <option key={1}>Online</option>
                <option key={2}>Busy</option>
                <option key={3}>Sleeping</option>
                <option key={4}>Offline</option>
              </select>
            </div>
            <hr />
            <div>
              <span className={ss.profile_changes_label}><strong>Share Contacts</strong> </span>
                {obj.enhableContact === false ? (
                  <input
                    className={ss.form_check_input}
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                    onChange={()=> showContactTrue()}
                    checked="false"
                  />
                ) : (
                  <input
                    className={ss.form_check_input}
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                    onChange={()=> showContactFalse()}
                    checked="true"
                  />
                )}
            </div>
            <hr />
            <div>
              <span className={ss.profile_changes_label}>
                <strong>About</strong>
              </span>
            </div>
            <div>
              <textarea
                placeholder="maximum 130 characters..."
                spellcheck="false"
                className={ss.profile_textarea}
                name="about"
                value={field.about}
                maxlength="130"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <button type="submit" className={ss.profile__button_submit}>
              {" "}
              Apply Changes
            </button>
          </form>
        </div>
      </div>
      
      <div>
        <div className={ss.profile_stats}>
        <h4 style={{borderLeft:"2px solid #fff", paddingLeft:"5px"}}>MY STATS</h4>
          <div>
            <small>🚀 Rockets: </small>
            {obj.score ? ` ${obj.score}. ` : ' 0. '}
          </div>
           <div>
            <small>❌ Abscences: </small>
            {obj.absence  ? ` ${obj.absence}. ` : ' 0. '}
          </div>
         <div>
            <small>🚫 Reports: </small>
            {obj.reports  ? ` ${obj.reports.length}. ` : ' 0. '}
          </div>

        </div>
      </div>
    </>
  );
};

export default Profile;
