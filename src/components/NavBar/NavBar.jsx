import React, { useState, useEffect } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import style from './NavBar.module.css'
import logo from '../../logo.png'
import User from './user/User'

const NavBar = () => {
  let history = useHistory()
  let location = useLocation()

  const myUser = useSelector((state)=>state.user)

  if (location.pathname !== '/')
    return (
      <nav className={style.navbar__nav}>
        <NavLink to='/trueHome'>
          <img
            alt='logo'
            src={logo}
            width='60%'
            className={style.navbar__logo}
          />
        </NavLink>
        <div className={style.navbar__div_buttons}>

          {myUser !== null &&  <User/>}

          {!myUser && (
            <div>
              <NavLink to='/signin'>
                <button className={style.navbar__link}>LOG IN</button>
              </NavLink>
              <NavLink to='/signup'>
                <button className={style.navbar__boton_violeta}>SIGN UP</button>
              </NavLink>
              <NavLink to='/'></NavLink>
            </div>
          )}
        </div>
      </nav>
    )
  else return <div></div>
}

export default NavBar
