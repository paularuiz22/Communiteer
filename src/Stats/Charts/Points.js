import React from "react";
import { VictoryPie, VictoryChart, VictoryTheme } from "victory";

function Points() {
  return(
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={400}
      width = {900}
    >
      <VictoryPie
        data={[
          { x: "Completed", y: 35 },
          { x: "Not Completed", y: 40 },
        ]}
      />

    </VictoryChart>
  );

}
export default Points;