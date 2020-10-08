import React, { Component } from "react";
import { StyleSheet, ScrollView, Button, View, SafeAreaView, Text, Alert } from "react-native";
import {Picker} from "@react-native-community/picker";

import MonthlyHours from "./Charts/MonthlyHours.js";
import Points from "./Charts/Points.js";
import TypesJobs from "./Charts/TypesJobs.js";

class Analytics extends Component {
  constructor() {
    super();
    this.state = {
      graph: "points",
    };
    this.handleChangeGraph = this.handleChangeGraph.bind(this);
  }
  handleChangeGraph = (event) => {
    this.setState({graph: event});
    console.log(this.state.graph);
  }
  switchGraph() {
    switch(this.state.graph) {
      case null:
        return <Points/>;
      case "points":
        return <Points/>;
      case "types of jobs":
        return <TypesJobs/>
      case "hours per month":
        return <MonthlyHours/>;
    }

  }
  render() {
    return(
      <SafeAreaView style={styles.container}>
        <Picker
          selectedValue={this.state.language}
          style={{height: 50, width: 400}}
          onValueChange = {this.handleChangeGraph}>
          <Picker.Item label="Points Status" value="points"/>
          <Picker.Item label="Number of Volunteering Hours per Month" value="hours per month" />
          <Picker.Item label="Types of Jobs" value = "types of jobs"/>
        </Picker>
        {this.switchGraph()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
export default Analytics;