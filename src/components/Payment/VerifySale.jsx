import React from 'react'
import { useParams } from 'react-router-dom'

function VerifySale() {
  const { verif } = useParams()
  //RUTA DE BACK CON GET VERIFIED

  if (verif) return <div>EXITO, COMPRASTE TIMPO</div>
  else {
    return <div>EL TIMPO SE AGOTA</div>
  }
}

export default VerifySale
