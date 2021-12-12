import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useLocation,useHistory } from 'react-router-dom'
import s from './Payment.module.css'

const Payment = ({ data }) => {
  let success = new URLSearchParams(useLocation().search).get("success")
  const productos = [
    { title: 'Plan Mensual', quantity: 1, unit_price: 2000 },
    { title: 'Plan Trimestral', quantity: 1, unit_price: 4500 },
    { title: 'Plan Anual', quantity: 1, unit_price: 12500 },
  ]
  

  const askSlot = async (e, product) => {
    e.preventDefault()
    let user = await JSON.parse(localStorage.getItem('user'))

    var rand = function () {
      return Math.random().toString(36).substr(2)
    }

    var token = function () {
      return rand() + rand()
    }
    sessionStorage.setItem("compra",JSON.stringify(product))
    await axios('http://localhost:3001/payment/ask-pay', {
      method: 'post',
      data: {
        institution: user.institution,
        email: user.email,
        id_orden: token(),
        title: product.title,
        quantity: product.quantity,
        unit_price: product.unit_price,
      },
    })
    .then((r) => {
      return window.open(r.data.res, '_blank').focus()
    })
  }
 
  if(success === "true") return (
      <div>
        Gracias por tu compra de {JSON.parse(sessionStorage.getItem("compra")).title}
      </div>
  )
  else return (
    <div className={s.main_container}>
      <h2 style={{ marginTop: '3%' }}>Elegi tu plan</h2>
      {!productos ? null : (
        <div className={s.cards_container}>
          {productos.map((el, index) => (
            <div className={s.card}>
              <div className={s.header}>
                <h3>{el.title}</h3>
              </div>
              <div className={s.price}>
                <h3>{'$' + el.unit_price + 'ARS'}</h3>
              </div>
              <div className={s.description}>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Harum molestias sapiente nulla m
                </p>
              </div>
              <div className={s.btn}>
                <button onClick={(e) => askSlot(e, el)}>Obtener</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Payment
