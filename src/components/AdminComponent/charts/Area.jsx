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
const data = [
    {
      name: 'Group 17A',
      Students: 200,
    },
    {
      name: 'Group 17B',
      Students: 260,
    },
    {
      name: 'Group 18A',
      Students: 180,
    },
    {
      name: 'Group 18B',
      Students: 430,
    },
    {
      name: 'Group 19A',
      Students: 255,

    },
    {
      name: 'Group 19B',
      Students: 332,
    },
    {
      name: 'Group 20A',
      Students: 520,
    },
  ];
function BarStudentsPerGroup() {
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
