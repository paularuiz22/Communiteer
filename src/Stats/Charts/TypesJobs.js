import React from "react";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory";

function MonthlyHours() {
  return(
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={400}
      width = {900}
    >
      <VictoryBar
        style={{ data: { fill: "#c43a31" } }}
        // data={sampleData}
        data={[
          {x: "house chores", y: 1},
          {x: "shopping", y: 2},
          {x: "beautification", y: 3},
          {x: "children care", y: 2},
          {x: "pet care", y: 1}
        ]}
      />
    </VictoryChart>
  );

}
export default MonthlyHours;