import React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function BarGroup({data,type}) {
    console.log(data, "desde bar")
    return (
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={"100%"}
          height={"100%"}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="cantidad" fill={type === "like" ? "#008AFE" : "#ED5A43"} />
        </BarChart>
      </ResponsiveContainer>
    )
}

export default BarGroup
