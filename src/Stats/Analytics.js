import React, { Component } from "react";
import { Dimensions, StyleSheet, ScrollView, Button, View, SafeAreaView, Text, Alert } from "react-native";
import {Picker} from "@react-native-community/picker";

import MonthlyHours from "./Charts/MonthlyHours.js";
import Points from "./Charts/Progress.js";
import TypesJobs from "./Charts/TypesJobs.js";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

class Analytics extends Component {
  constructor() {
    super();
    this.state = {
      graph: "points",
      dimensions: {
        window,
        screen
      }
    };
    this.handleChangeGraph = this.handleChangeGraph.bind(this);
  }
  onChange = ({ window, screen }) => {
    this.setState({ dimensions: { window, screen } });
  };

  handleChangeGraph = (event) => {
    this.setState({graph: event});
  }
  switchTitle() {
    switch(this.state.graph) {
      case null:
      case "points":
        return "Points Progress";
      case "types of jobs":
        return "Types of Jobs"
      case "hours per month":
        return "Hours Per Month";
    }
  }
  switchGraph() {
    switch(this.state.graph) {
      case null:
      case "points":
        return <Points/>;
      case "types of jobs":
        return <TypesJobs/>
      case "hours per month":
        return <MonthlyHours/>;
    }
  }

  componentDidMount() {
    Dimensions.addEventListener("change", this.onChange);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.onChange);
  }
  
  render() {
    const { dimensions } = this.state;
    return(
      <SafeAreaView style={styles.dropdown_container}>
        <View style = {styles.container}>
        <Picker
          selectedValue={this.state.language}
          style={styles.dropdown}
          onValueChange = {this.handleChangeGraph}>
          <Picker.Item label="Points Status" value="points"/>
          <Picker.Item label="Number of Volunteering Hours per Month" value="hours per month" />
          <Picker.Item label="Types of Jobs" value = "types of jobs"/>
        </Picker>
        </View>
        <View style = {styles.container}>
          <Text style = {styles.title}>{this.switchTitle()} </Text>
        </View>
        <View style = {styles.graph}>
         {this.switchGraph()}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dropdown_container: {
    flex: 1,
  },
  dropdown: {
    height: 50,
    width: screen.width/2,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 0,
    width: screen.width/2,
  },
  graph: {
    flex: 3, 
    backgroundColor: "purple",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
export default Analytics;
