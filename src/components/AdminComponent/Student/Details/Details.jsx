import React, {useState} from 'react'
import Actions from './Actions'
import Reports from './Reports'
import s from "./Details.module.css"
function Details({user, setDetailsOpen}) {
    var [selected, setSelected] = useState("reports")
 
    return (
        <div className={s.container}>
            <div className={s.subcontainer}>
                 <h3>{user.name}</h3>
                <svg onClick={()=>setDetailsOpen(false)} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22 6.44365V15.5563L15.5563 22H6.44365L0 15.5563V6.44365L6.44365 0H15.5563L22 6.44365ZM14.7279 2H7.27208L2 7.27208V14.7279L7.27208 20H14.7279L20 14.7279V7.27208L14.7279 2ZM11 12.4142L7.70711 15.7071L6.29289 14.2929L9.58579 11L6.29289 7.70711L7.70711 6.29289L11 9.58579L14.2929 6.29289L15.7071 7.70711L12.4142 11L15.7071 14.2929L14.2929 15.7071L11 12.4142Z" fill="#FF0707"/>
                </svg>
                 <div className={s.options}>
                    <h4 className={selected === "reports" ? s.selected : s.option} onClick={()=>setSelected("reports")}>Reports</h4>
                    <h4 className={selected === "actions" ? s.selected : s.option} onClick={()=>setSelected("actions")}>Actions</h4>
                 </div>
                 {selected === "reports" && <Reports reports={user.reports}/>}
                {selected === "actions" && <Actions id={user._id} name={user.name} group={user.group}/> }
            </div>     
        </div>
    )
}

export default Details
