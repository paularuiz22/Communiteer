import React from "react";
import { LineChart, Path, Grid } from "react-native-svg-charts";
import { Dimensions, StyleSheet, ScrollView, Button, View, SafeAreaView, Text, Alert } from "react-native";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");


class LineChartExample extends React.PureComponent {

  render() {

    const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ];

    const Shadow = ({ line }) => (
      <Path
        key={"shadow"}
        y={2}
        d={line}
        fill={"none"}
        strokeWidth={4}
        stroke={"#E76F51"}
      />
    );

    return (
      <View>
        <LineChart
          style={ { height: screen.height/2, width: screen.width/2, padding: 30}}
          data={ data }
          svg={{ stroke: "rgb(134, 65, 244)" }}
          contentInset={ { top: 20, bottom: 20 } }
        >
          <Grid/>
          <Shadow/>
        </LineChart>
      </View>
    );
  }
}
export default LineChartExample;