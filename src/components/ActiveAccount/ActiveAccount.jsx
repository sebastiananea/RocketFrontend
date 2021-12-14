import React, {useState} from 'react'
import {useHistory, useParams} from "react-router-dom"
import axios from 'axios'

function ActiveAccount() {  
    const { token } = useParams();
    const [validate, setvalidate] = useState(null)
    
    try{
        axios(`http://localhost:3001/searchProfileActivate/${token}`).then(res => setvalidate(res.data))
    }
    catch(error){
        console.log(error)
    }

    // let check= await axios(`http://localhost:3001/searchProfileID/${token}`).then((r)=>console.log(r))
    // //if return... else return y redirect a log in
    if(validate) return(
        <div>
            ve a jugar -happy emochi-
        </div>
    )
    else return (
        <div>
            Busca tu mail de confirmación -sad emoguy-
        </div>
    )
}

export default ActiveAccount