import React from 'react'
import s from "./VerifySale.module.css"
import { useParams } from 'react-router-dom'

function VerifySale() {
  const { verif } = useParams()
  //RUTA DE BACK CON GET VERIFIED

  if (verif) return (
    <div>
      
    </div>
   )
  }

export default VerifySale
