import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import axios from "axios"
import s from "./Actions.module.css"
import Swal from 'sweetalert2';

function Actions({id, name, group}) {
    var groups = useSelector((state)=>state.groups)
    var [selected, setSelected] = useState("change")
//estados de acciones
    var [toGroup, setToGroup] = useState(groups[0])
    
    async function submitChangeGroup(e){
        e.preventDefault()
        await axios.post("https://rocketproject2021.herokuapp.com/admin/changegroup",{id:id, togroup:toGroup})
        Swal.fire("grupo cambiado")
        window.location.reload()
    }
    async function submitDeleteUser(e){
        e.preventDefault()
        await axios.post("https://rocketproject2021.herokuapp.com/admin/removeuser",{id:id})
        Swal.fire("usuario eliminado")
        window.location.reload()
    }
    async function submitDeleteGroup(e){
        e.preventDefault()
        await axios.post("https://rocketproject2021.herokuapp.com/admin/removegroup",{id:id})
        Swal.fire("grupo eliminado de usuario")
        window.location.reload()
    }
    return (
        <div className={s.container}>
            <div className={s.optionsContainer}>
                <button className={selected === "change" ? s.optionSelected : s.option} onClick={()=>setSelected("change")}>
                        CHANGE GROUP
                </button>
                <button className={selected === "baja" ? s.optionSelected : s.option} onClick={()=>setSelected("baja")}>
                        REMOVE GROUP
                </button>
                <button className={selected === "delete" ? s.optionSelected : s.option} onClick={()=>setSelected("delete")}>
                        DELETE USER
                </button>
                
            </div>
            <div className={s.confirmationContainer}>
                {selected === "change" && (
                    <div className={s.confirmationSubcontainer}>
                          <div className={s.changeContainer}>
                            <div>FROM <strong>{group}</strong> TO
                            </div>
                            <select value={groups[0]} onChange={(e)=>setToGroup(e.target.value)}>
                            {groups.map((x)=>(
                                <option value={x.toLowerCase()}>{x}</option>
                            ))}
                            </select>
                          </div>
                          <button className={s.changeButton} onClick={submitChangeGroup}>
                              CONFIRM CHANGE
                          </button>
                    </div>
                )}
                {selected === "delete" && (
                    <div className={s.confirmationSubcontainer}>
                        <h5>¿Estas seguro que quieres eliminar a {name}?</h5>
                        
                        <button className={s.deleteButton} onClick={submitDeleteUser}>BORRAR USUARIO</button>
                        
                    </div>
                )}
                {selected === "baja" && (
                    <div className={s.confirmationSubcontainer}>
                             <h5>¿Estas seguro que quieres remover de su grupo a {name}?</h5>
                            <button className={s.deleteButton} onClick={submitDeleteGroup}>REMOVER GRUPO</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Actions
