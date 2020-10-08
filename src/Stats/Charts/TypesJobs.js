import React from "react";
import { StyleSheet, ScrollView, Button, View, SafeAreaView, Text, Alert } from "react-native";
import { VictoryBar, VictoryChart, VictoryLabel, VictoryTheme } from "victory";

function MonthlyHours() {
  return(
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={400}
      width = {900}
    >
      <VictoryLabel x={100} y={100}
        text="Job Frequency"
      />
      <VictoryBar
        style={{ data: { fill: "#c43a31" } }}
        // data={sampleData}
        data={[
          {x: "house chores", y: 1},
          {x: "shopping", y: 5},
          {x: "beautification", y: 12},
          {x: "children care", y: 2},
          {x: "pet care", y: 7}
        ]}
      />
    </VictoryChart>
  );

}
// const styles = StyleSheet.create({
//   title: {
//     textAnchor: "start",
//     verticalAnchor: "end",
//     fill: "#000000",
//     fontFamily: "inherit",
//     fontSize: "24px",
//     fontWeight: "bold"
//   },
// });
export default MonthlyHours;