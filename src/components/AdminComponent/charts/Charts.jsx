import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import s from "./Charts.module.css"
import BarStudentsPerGroup from './Area'
import PieReportsLikes from './Pie'
import axios from 'axios'
import BarGroup from './Bar'
import Loading from '../../Loading/Loading'

function Charts() {

    let history = useHistory()
    var groups = useSelector((state)=>state.groups)
    var [data, setData] = useState("")
    var [data1, setData1] = useState("")
    var [selected, setSelected] = useState("general")
    useEffect(() => {
        history.push("?group="+selected)
        async function getData(){
            await axios("http://localhost:3001/admin/stats?group="+selected)
            .then(x=> setData(x.data))
        }
        getData()
        async function getData1(){
            await axios("https://rocketproject2021.herokuapp.com/asistencias/"+JSON.parse(localStorage.getItem("user")).institution)
            .then(x=> setData1(x.data))
        }
        getData1()
    }, [selected])
   
    console.log(data1, typeof data1)
   if(data) return (
        <div className={s.container}>
            <h2>ESTADISTICAS</h2>
                <select value={selected} onChange={(e)=> setSelected(e.target.value)}>
                <option value="general">GENERAL</option>
                {groups.map((x)=>(
                    <option value={x.toLowerCase()}>{x}</option>
                ))}
            </select>   
            {selected !== "general" && (
                <div className={s.groupContainer}>
                    <div className={s.groupSubcontainer}>
                        <h3>Likes</h3>
                        <BarGroup data={data.likes} type="like"/>
                    </div>
                    <div className={s.groupSubcontainer}>
                        <h3>Reports</h3>
                        <BarGroup data={data.reports}type="report"/>
                    </div>
                    
                </div>
            )}         

            {selected === "general" && data.likesreports !== undefined && (
                <div className={s.stats}>
                    <div className={s.pie}>
                        Likes - Reports
                        <PieReportsLikes data={data.likesreports}/>
                    </div>
                    <div className={s.pie}>
                        Asistencias
                        <PieReportsLikes data={[{name:"Inasistencias", value:100-data1},{name:"Asistencias", value:data1}]}/>
                    </div>
                </div>
            )}
                {selected === "general" && data.students !== undefined && (
                    <div className={s.bar}>
                        Estudiantes activos en Rocket por grupo
                        <BarStudentsPerGroup data={data.students}/>
                    </div>
                )}
        </div>
        
    )
    else return(
        <div className={s.loading}>
            <Loading />
        </div>
    )
}

export default Charts
