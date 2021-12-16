import axios from 'axios';
import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import s from "./Tables.module.css"
import firebase from "firebase/compat";
import { myDatabaseChat } from "../../../config/utilsChatDatabase";
import { ref, child, remove } from "firebase/database";


function Tables() {
    const user = JSON.parse(localStorage.getItem("user"));
    let chatRef = ref(myDatabaseChat);
    var groups = useSelector((state)=>state.groups)
    let prueba= useSelector((state)=>state.user.moderator)
    let institution=useSelector((state)=>state.user.suscription)
    var [group, setGroup] = useState(groups[0])
    async function assignTableRandom(){
        await axios("https://rocketproject2021.herokuapp.com/asignTableRandom",{
            method:"post",
            data:{
                institution:JSON.parse(localStorage.getItem("user")).institution,
                curso:group.toUpperCase()
            }
        })
        Swal.fire("Se mezclaron aleatoriamente las mesas del grupo "+group.toUpperCase()+" con exito!")
        await axios("https://rocketproject2021.herokuapp.com/addClass", {
            method: "post",
            data: {
              curso: group,
              institution: JSON.parse(localStorage.getItem("user")).institution,
            },
          });

        chatRef = child(chatRef, `${user.institution}/Grupos/${group}`);
        remove(chatRef);
    }
    async function assignTableSmart(){
        await axios("https://rocketproject2021.herokuapp.com/asignTable",{
            method:"post",
            data:{
                institution:JSON.parse(localStorage.getItem("user")).institution,
                curso:group.toUpperCase()
            }
        })
        Swal.fire("Se mezclaron inteligentemente las mesas del grupo "+group.toUpperCase()+" con exito!")
        await axios("https://rocketproject2021.herokuapp.com/addClass", {
            method: "post",
            data: {
              curso: group,
              institution: JSON.parse(localStorage.getItem("user")).institution,
            },
          });

          chatRef = child(chatRef, `${user.institution}/Grupos/${group}`);
          remove(chatRef);
    }
    if (!prueba && !institution){
        return <div></div>
      }
    else return (
        <div className={s.container}>
            <div className={s.selectGroup}>
                <h4>Select Group</h4>
                <select value={group} onChange={(e)=>setGroup(e.target.value)}>
                    {groups.map(x=>(
                        <option value={x.toLowerCase()}>{x}</option>
                    ))}
                </select>
            </div>
            <div className={s.botonesContainer}>
                <button className={s.random} onClick={assignTableRandom}>RANDOM SHUFFLE</button>
                <button className={s.smart} onClick={assignTableSmart}>SMART SHUFFLE</button>
            </div>
        </div>
    )
}

export default Tables
