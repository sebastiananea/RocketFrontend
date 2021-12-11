import React, {useState, useEffect} from 'react'
import Payment  from './Payment'

function Sales() {
    
    const producto={
        title:"Slot Students",
        unit_price:"100",
        quantity:"1"
    }

    return (
        <div>
            
            <Payment productos={producto}/>
            
        </div>
    )
}

export default Sales
