import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import Silla from '../Silla/Silla.jsx'
import Loading from '../Loading/Loading.jsx'
import axios from 'axios'
import ChatContain from '../RocketChat/Chat/ChatContain'

const Home = () => {
  const [profiles, setProfiles] = useState([])
  const [params, setparams] = useState(null)
  useEffect(async () => {
    await axios('https://rocketproject2021.herokuapp.com/isLog', {
      method: 'post',
      data: { token: localStorage.getItem('token') },
    }).then((res) => localStorage.setItem('user', JSON.stringify(res.data)))

    let userr = JSON.parse(localStorage.getItem('user'))
    setparams(userr)

    let profiles = await axios
      .post('https://rocketproject2021.herokuapp.com/filterUserByTable', {
        table: userr.table,
        institution: userr.institution,
        curso:userr.curso        
      })
      .then((r) => r.data)
    setProfiles(profiles)
    console.log(profiles)
  }, [])

  return (
    <div className={style.home__container}>
      <div className={style.home__mesa}>
        <div>
          <h2 className={style.home_myteam}>My Team</h2>
        </div>
        <div className={style.home__mesa__child}>
          {profiles.length ? (
            profiles.map((user) => (
              <Silla name={user.name} img={user.img} _id={user._id} />
            ))
          ) : (
            <Loading />
          )}
        </div>
        <div>
          <button className={style.home__btnlink}>
            <a className={style.home__btnlink_link} href={`https://meet.jit.si/Henry${JSON.parse(localStorage.getItem("user")).table}`} target="_blank">Join Meet</a>
          </button>
        </div>
      </div>
      <div className={style.home__chat}>
        {/* <div>
          <a href={JSON.parse(localStorage.getItem('user')).meetLink}>
            Join Meet
          </a>
        </div> */}
        <h4 style={{background:"orange", borderRadius:"20px"}}>CHAT</h4>
        {params && params?.name ? (
          <div className={style.home__chat_inputs}>
            <ChatContain table={`table${params.table}`} params={params} />
          </div>
        ) : null}
      </div>
      {/* <div>
        <a href={`${JSON.parse(localStorage.getItem("user")).meetLink}`} target="_blank">Join Meet</a>
      </div> */}
    </div>
  )
}

export default Home
