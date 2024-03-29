import React, { useState } from 'react'
import s from './Sidebar.module.scss'
import { Links } from '../data/data'
import Item from '../item/Item'
import { useSelector } from 'react-redux';

function SidebarInstitution() {
  var [open, setOpen] = useState(false)
  // let institution = useSelector((state) => state.user.suscription)
  // if (institution) {
    return (
      <div className={open ? s.sidebarOpen : s.sidebar}>
        <svg
          className={s.hamburger}
          onClick={() => setOpen(!open)}
          viewBox='0 0 18 12'
        >
          <path d='M0 12H18V10H0V12ZM0 7H18V5H0V7ZM0 0V2H18V0H0Z' fill='#FFF' />
        </svg>
        <div className={s.linksContainer}>
          {Links &&
            Links.map(({ to, text, svg }) => (
              <Item to={to} text={text} svg={svg} open={open} />
            ))}
        </div>
      </div>
    )
  // }
  // else {
  //   return (
  //     <div></div>
  //   )
  // }
}

export default SidebarInstitution
