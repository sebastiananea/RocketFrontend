import React from 'react'
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    AreaChart,
    Area,
    ResponsiveContainer,
  } from 'recharts';

function BarStudentsPerGroup({data}) {
  
  return (
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart
            width={500}
            height={200}
            data={data}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="Students" stroke="#7c40ca" fill="#efc050" />
          </AreaChart>
        </ResponsiveContainer>
    )
}

export default BarStudentsPerGroup
