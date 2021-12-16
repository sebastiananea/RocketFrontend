import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import s from "./Payment.module.css";
import { useSelector } from "react-redux";

const Payment = ({ data }) => {
  let institution = useSelector((state) => state.user.suscription);
  let success = new URLSearchParams(useLocation().search).get("success");
  const productos = [
    { title: "Plan Mensual", quantity: 1, unit_price: 2000 },
    { title: "Plan Trimestral", quantity: 1, unit_price: 4500 },
    { title: "Plan Anual", quantity: 1, unit_price: 12500 },
  ];

  async function refresh() {
    await axios
      .post("http://localhost:3001/institution/isLog", {
        token: localStorage.getItem("token"),
      })
      .then((x) => localStorage.setItem("user", JSON.stringify(x.data)));
  }

  let fecha = new Date();
  var user = JSON.parse(localStorage.getItem("user"));
  const askSlot = async (e, product) => {
    e.preventDefault();

    var rand = function () {
      return Math.random().toString(36).substr(2);
    };

    var token = function () {
      return rand() + rand();
    };
    sessionStorage.setItem("compra", JSON.stringify(product));

    let compraVencimiento = JSON.parse(sessionStorage.getItem("compra"));
    if (compraVencimiento.title === "Plan Mensual") {
      fecha = new Date(new Date().setMonth(new Date().getMonth() + 1));
    }
    if (compraVencimiento.title === "Plan Trimestral") {
      fecha = new Date(new Date().setMonth(new Date().getMonth() + 3));
    }
    if (compraVencimiento.title === "Plan Anual") {
      fecha = new Date(new Date().setYear(new Date().getFullYear() + 1));
    }
    await axios("http://localhost:3001/payment/ask-pay", {
      method: "post",
      data: {
        institution: user.institution,
        email: user.email,
        id_orden: token(),
        title: product.title,
        quantity: product.quantity,
        unit_price: product.unit_price,
        suscriptionTo: fecha.toLocaleDateString(),
      },
    }).then((r) => {
      return window.open(r.data.res, "_blank").focus();
    });
  };
  async function verifyPayment() {
    await axios.post("http://localhost:3001/payment/verifyTruePayment", {
      institution: user.institution,
    });
  }
  useEffect(() => {
    verifyPayment();
    if (success === "true") refresh();
  }, []);
  if (success === "true") {
    let compra = JSON.parse(sessionStorage.getItem("compra"));

    return (
      <div className={s.main_container}>
        <h2 style={{ marginTop: "3%" }}>Genial! Compraste:</h2>
        <div className={s.cards_container}>
          <div className={s.card}>
            <div className={s.header}>
              <h3>{compra.title}</h3>
            </div>
            <div className={s.price}>
              <h3>{"$" + compra.unit_price + "ARS"}</h3>
            </div>
            <div className={s.description}>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum
                molestias sapiente nulla m
              </p>
            </div>
          </div>
        </div>
        <p>Estará activo hasta el {fecha.toLocaleDateString()}</p>
      </div>
    );
  } else
    return (
      <div className={s.main_container}>
        <h2 style={{ marginTop: "3%" }}>Elegi tu plan</h2>
        {!productos ? null : (
          <div className={s.cards_container}>
            {productos.map((el, index) => (
              <div className={s.card}>
                <div className={s.header}>
                  <h3>{el.title}</h3>
                </div>
                <div className={s.price}>
                  <h3>{"$" + el.unit_price + "ARS"}</h3>
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
        {user.suscription === "01/01/2001" ? <p>
            </p> :
            <p>Your suscription will expire on {user.suscription}</p>}
      </div>
    );
};

export default Payment;
