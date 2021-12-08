import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import GoBackButton from '../goBackButton/GoBackButton'
import { country_list } from '../index'
import avatars from '../../avatars/avatarsarr'
import ss from './Profile.css'
import avatarPorDefaultAlien from '../../avatars/avatar21-alien.png'
import {setUser} from "../../Actions"
import { set } from '@firebase/database'


const Profile = () => {
  const dispatch = useDispatch()
  const [obj, setObj] = useState({})
  const [boolean, setBoolean] = useState(false)

  const [field, setField] = useState({
    about: null,
    img: null,
    country: null,
    status: null,
  })

  let id = JSON.parse(localStorage.getItem('user'))._id

  useEffect(() => {
    let profile = axios(
      `https://rocketproject2021.herokuapp.com/searchProfileID/${id}`
    ).then((r) => setObj(r.data))
    setBoolean(false)
  }, [boolean])
  
  // const [checket, setChecket] = useState(obj?.enhableContact);

  async function showContact() {
    if (obj.enhableContact === true) {
      // setChecket(false);
      obj.setObj({ ...obj, enhableContact: false })
      await axios.post('https://rocketproject2021.herokuapp.com/user/changes', {
        new_enhableContact: false,
        id: obj._id,
      })
    } else if (obj.enhableContact === false) {
      // setChecket(true);
      obj.setObj({ ...obj, enhableContact: true })
      await axios.post('https://rocketproject2021.herokuapp.com/user/changes', {
        new_enhableContact: true,
        id: obj._id,
      })
    }
  }

  function handleChange(e) {
    setField({
      ...field,
      [e.target.name]: e.target.value,
    })
    setObj({
      ...obj,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const newChanges = {
      new_img: field.img,
      new_about: field.about,
      new_country: field.country,
      new_status: field.status,
      id: obj._id,
    }

    await axios.post(
      'https://rocketproject2021.herokuapp.com/user/changes',
      newChanges
    ).then(()=>setBoolean(true))
    let myUser = JSON.parse(localStorage.getItem('user'))
    myUser.img = field.img
    localStorage.setItem("user", JSON.stringify(myUser))
    setField({
      about: null,
      img: null,
      country: null,
      status: null,
    })
    dispatch(setUser(JSON.parse(localStorage.getItem("user"))))
    alert("Cambios exitosos")
  }

  function setButtonStatus(status) {
    switch (status) {
      case  "Online"  : return "🟢";
      case   "Busy"   : return "🟡";
      case "Sleeping" : return "🔵";
      case "Offline"  : return "⚫";
      default: return "⚪ Status is not defined";
    };
  };
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
            <span className={ss.profile_changes_label}><strong>Country</strong> </span>
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
            <span className={ss.profile_changes_label}><strong>Avatar</strong> </span>
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
            <span className={ss.profile_changes_label}><strong>Status</strong> </span>
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
                {obj.enhableContact ? (
                  <input
                    className={ss.form_check_input}
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                    onChange={() => showContact()}
                    checked="true"
                  />
                ) : (
                  <input
                    className={ss.form_check_input}
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                    onChange={() => showContact()}
                    checked="false"
                  />
                )}
            </div>
<hr />        
            <div>
              <span className={ss.profile_changes_label}><strong>About</strong></span>
            </div>
            <div>
              <textarea
                placeholder="..."
                className={ss.profile_textarea}
                name="about"
                value={field.about}
                style={{ width: "92%" }}
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

      <div className={ss.profile_stats}>
        <h4>MY STATS</h4>
          <div>
            <small>🚀 Rockets</small>
            <input 
            type="range" 
            className={ss.profile_stats_progress} 
            value={obj.score ? obj.score : 0}/>
            {obj.score ? obj.score : 0}
          </div>
           <div>
            <small>❌ Abscences</small>
            <input 
            type="range" 
            className={ss.profile_stats_progress} 
            value={obj.absence ? obj.absence : 0} />
            {obj.absence ? obj.absence : 0}
          </div>
         <div>
            <small>🚫 Reports</small>
            <input 
            type="range" 
            className={ss.profile_stats_progress} 
            value={obj.reports ? obj.reports : 0}/>
            {obj.reports ? obj.reports : 0}
          </div>
      </div>
    </>
  );
};

export default Profile
