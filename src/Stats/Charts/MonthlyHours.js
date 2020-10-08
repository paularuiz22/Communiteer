import React from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme } from "victory";

function MonthlyHours() {
  return(
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={400}
      width = {900}
    >
      <VictoryLine
        style={{
          data: { stroke: "#c43a31" },
          parent: { border: "1px solid #ccc"}
        }}
        data={[
          { x: 1, y: 2 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 4 },
          { x: 5, y: 7 }
        ]}
      />
    </VictoryChart>
  );

}
export default MonthlyHours;