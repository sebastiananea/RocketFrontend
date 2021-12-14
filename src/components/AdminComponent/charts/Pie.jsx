import React from "react";
import { PieChart, Pie, Cell } from "recharts";


const COLORS = ["#ED5A43", "#008AFE"];
function PieReportsLikes({ data }) {
  return (
    <PieChart width={220} height={250}>
      <Pie
        data={data}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}

export default PieReportsLikes;
