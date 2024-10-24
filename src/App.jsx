import React, { useMemo } from "react";
import jsonData from "./trade_cost_and_margin_ppm_data.json";
import { groupBy } from "lodash";
import { BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";


const App = () => {
  const groupedData = Object.values(groupBy(jsonData.tradeCost.aggregatedTrades.data, (d) => d.labels[0]));

  const formattedData = useMemo(() => {
    return groupedData.reduce((acc, curr) => {
      return [
        ...acc,
        {
          month: curr[0].labels[0],
          Total: curr.map(curr => curr.values[0]).reduce((acc, curr) => acc + curr),
          [curr[0].labels[1]]: curr[0].values[0],
          [curr[1].labels[1]]: curr[1].values[0],
          [curr[2].labels[1]]: curr[2].values[0],
          [curr[3].labels[1]]: curr[3].values[0],
        }
      ]
    }, [])
  }, [groupedData])

  const barDataKeys = Object.keys(formattedData[0]).slice(1, Object.keys(formattedData[0]).length);
  console.log("data:", jsonData);
  console.log("groupedData:", groupedData);
  console.log("formatted data:", formattedData);
  return (
    <div style={{ width: "80vw", height: "80vh" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={formattedData}
          margin={{
            top: 85,
            right: 40,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis label={<h1>NOK</h1>}  />
          <Tooltip />
          <Legend />
          {barDataKeys.map((dataKey, idx) => {
              let randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
            return(
            <Bar key={`${dataKey}_${idx}`} dataKey={dataKey} fill={randomColor} />
            )
            })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default App;
