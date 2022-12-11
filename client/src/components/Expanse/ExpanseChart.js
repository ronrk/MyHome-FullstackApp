import React from "react";
import useExpanseContext from "../../context/expanse-context";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

const ExpanseChart = ({ lastMonthsExpanses }) => {
  return (
    <ResponsiveContainer width="90%" height={300}>
      <BarChart width={730} height={250} data={lastMonthsExpanses}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalCost" fill="#8884d8" name="total cost" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ExpanseChart;
