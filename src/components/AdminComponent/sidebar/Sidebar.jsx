import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import * as actionsCreators from "../../../Actions/index";
import { bindActionCreators } from 'redux';
import { useSelector } from 'react-redux';
import s from "./Sidebar.module.scss"
import {Links} from "../data/data"
import Item from "../item/Item"
import axios from 'axios'


function Sidebar({setGroups}){  
    let groups = useSelector((state)=>state.groups)
    useEffect(()=>{
      async function getGroups(){
        await axios("https://rocketproject2021.herokuapp.com/admin/getCohortes")
        .then(x => {
          setGroups(x.data)
        })
      }
      if(!groups.length)getGroups()
    },[setGroups, groups])

    var [open, setOpen] = useState(false)
    return (
        <div className={open ? s.sidebarOpen : s.sidebar}>
          <svg
            className={s.hamburger}
            onClick={() => setOpen (!open)}
            viewBox="0 0 18 12"
          >
            <path
              d="M0 12H18V10H0V12ZM0 7H18V5H0V7ZM0 0V2H18V0H0Z"
              fill="#5f5f5f"
            />
          </svg>
          <div className={s.linksContainer}>
            {Links &&
              Links.map (({to, text, svg}) => (
                <Item to={to} text={text} svg={svg} open={open} />
              ))}
          </div>
        </div>
      );
}


function mapDispatchToProps(dispatch){
  return bindActionCreators(actionsCreators, dispatch)
}

export default connect(null, mapDispatchToProps) (Sidebar)
