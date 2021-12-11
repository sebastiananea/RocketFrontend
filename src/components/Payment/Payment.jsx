import axios from 'axios';
import React, {useState} from 'react';


const Payment = ({ productos, data }) => {
   


    const [pay, setpay] = useState(null)


    const askSlot = async (e) => {
        e.preventDefault()
        let user = await (JSON.parse(localStorage.getItem("user")))

        var rand = function () {
            return Math.random().toString(36).substr(2);
        };

        var token = function () {
            return rand() + rand();
        };

         await axios('http://localhost:3001/payment/ask-pay', {

            method: "post",
            data: { institution: user.institution, email: user.email, id_orden: token()}
          })
        .then((r)=>{
                     setpay(r.data.res)}
            )


    }

    return (
        <div>


            <form id='form'>
                <h3>PAGOS</h3>

                {!productos ?
                    null :
                    <div>
                        <h3>{productos.title}</h3>
                        <h3>{productos.quantity}</h3>
                        <h3>{'$' + productos.unit_price}</h3>
                    </div>

                }

            </form>

            <button name="slot" onClick={(e) => askSlot(e)}>COMPRAR SLOT STUDENTS</button>
            {!pay ?
            null:
            <a href={pay} target="_blank">ADQUIRIR SLOT DE ESTUDIANTES</a>}


        </div>
    );
};

export default Payment
