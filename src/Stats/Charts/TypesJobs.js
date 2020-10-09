import React from "react";
import { BarChart, XAxis } from "react-native-svg-charts";
import * as scale from "d3-scale";
import { Dimensions, StyleSheet, ScrollView, Button, View, SafeAreaView, Text, Alert } from "react-native";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
class XAxisExample extends React.PureComponent {

  render() {

    const data = [ 14, 80, 100, 55 ];

    return (
      <View style={{ height: screen.height/2, width: screen.width/2}}>
        <BarChart
          style={{ flex: 1 }}
          data={data}
          gridMin={0}
          svg={{ fill: "rgb(134, 65, 244)" }}
        />
        <XAxis
          style={{ marginTop: 10 }}
          data={ data }
          scale={scale.scaleBand}
          formatLabel={ (value, index) => index }
          labelStyle={ { color: "black" } }
        />
      </View>
    );
  }

}

export default XAxisExample;