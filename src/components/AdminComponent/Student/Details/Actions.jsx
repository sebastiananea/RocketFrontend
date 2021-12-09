import React, {useState} from 'react'
import s from "./Actions.module.css"
function Actions({_id, name}) {
    
    var [selected, setSelected] = useState("change")

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
                            <div>FROM <strong>FT-17B</strong> TO
                            </div>
                            <select>
                                <option value="ft18a">FT-18A</option>
                                <option value="ft19a">FT-19A</option>
                            </select>
                          </div>
                          <button className={s.changeButton}>
                              CONFIRM CHANGE
                          </button>
                    </div>
                )}
                {selected === "delete" && (
                    <div className={s.confirmationSubcontainer}>
                        <h5>¿Estas seguro que quieres eliminar a {name}?</h5>
                        
                        <button className={s.deleteButton}>BORRAR USUARIO</button>
                        
                    </div>
                )}
                {selected === "baja" && (
                    <div className={s.confirmationSubcontainer}>
                             <h5>¿Estas seguro que quieres remover de su grupo a {name}?</h5>
                        
                            <button className={s.deleteButton}>REMOVER GRUPO</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Actions
