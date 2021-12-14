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
    var institution = useSelector((state)=>state.user.institution)

    var [data, setData] = useState("")
    var [selected, setSelected] = useState("general")
    useEffect(() => {
        history.push("?group="+selected)
        async function getData(){
            //VOLVER A RUTA DEPLOYADA!
            await axios("https://rocketproject2021.herokuapp.com/admin/stats?group="+selected+"&institution="+institution)
            .then(x=> setData(x.data))
        }
        getData()
    }, [selected])
    console.log(data, "esta es mi data")
    console.log(institution, "soy el redux!")
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
