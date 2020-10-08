import React from "react";
import { StyleSheet, ScrollView, Button, View, SafeAreaView, Text, Alert } from "react-native";
import { VictoryLabel, VictoryPie, VictoryChart, VictoryTheme } from "victory-native";

function Points() {
  return(
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={400}
      width = {900}
    >
      <VictoryLabel x={100} y={100}
        text="Total Points"
      />
      <VictoryPie
        data={[
          { x: "Completed", y: 35 },
          { x: "Not Completed", y: 40 },
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
export default Points;