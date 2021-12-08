import React, {useState} from 'react'
import s from "./Actions.module.css"
function Actions({_id}) {
    
    var [selected, setSelected] = useState("change")

    return (
        <div className={s.container}>
            <div className={s.optionsContainer}>
                <button className={selected === "change" ? s.optionSelected : s.option} onClick={()=>setSelected("change")}>
                        CHANGE GROUP
                </button>
                <button className={selected === "delete" ? s.optionSelected : s.option} onClick={()=>setSelected("delete")}>
                        DELETE USER
                </button>
                <button className={selected === "baja" ? s.optionSelected : s.option} onClick={()=>setSelected("baja")}>
                        REMOVE USER
                </button>
            </div>
            <div className={s.confirmationContainer}>
                {selected === "change" && (
                    <div>

                    </div>
                )}
                {selected === "delete" && (
                    <div>

                    </div>
                )}
                {selected === "baja" && (
                    <div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default Actions
