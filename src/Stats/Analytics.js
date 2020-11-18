import React, { Component } from "react";
import { Dimensions, StyleSheet, ScrollView, Picker, Button, View, SafeAreaView, Text, Alert } from "react-native";
import { Header } from 'react-native-elements';

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
      <SafeAreaView style={styles.container}>
            <Header
        backgroundColor="#2A9D8F"
        centerComponent={{text: 'Stats', style: {color: '#fff', fontSize: 25}}}
        />
        <View style = {styles.dropdown_container}>
            <View style={styles.row}>
                <Text style={styles.headingOne}>Graph Type</Text>
                {/* <Picker
                  selectedValue={this.state.graph}
                  style={styles.dropdown}
                  onValueChange = {this.handleChangeGraph}>
                  <Picker.Item label="Points Status" value="points"/>
                  <Picker.Item label="Number of Volunteering Hours per Month" value="hours per month" />
                  <Picker.Item label="Types of Jobs" value = "types of jobs"/>
                </Picker> */}
                    <Picker
                        selectedValue={this.state.graph}
                        style={styles.dropdown}
                        itemStyle={{height: 45}}
                        onValueChange = {this.handleChangeGraph}>
                        <Picker.Item label="All Jobs" value="All Jobs"/>
                        <Picker.Item label="Beautification" value="Beautification"/>
                        <Picker.Item label="Children" value="Children"/>
                        <Picker.Item label="House Chores" value="House Chores"/>
                        <Picker.Item label="Pet Care" value="Pet Care"/>
                        <Picker.Item label="Shopping" value="Shopping"/>
                        <Picker.Item label="Tutoring" value="Tutoring"/>
                    </Picker>
            </View>
        </View>
        <View style = {styles.title_container}>
          <Text style = {styles.title}>{this.switchTitle()} </Text>
        </View>
        <View style = {styles.graph_container}>
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
    headingOne: {
      fontSize: 24,
      padding: 10
    },
    row: {
        width: 500,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        alignItems:"center",
        justifyContent:"center",
    },
  dropdown: {
    height: 50,
    width: screen.width/2,
    marginVertical: 10,
    alignItems:"center",
    justifyContent:"center"
  },
  title_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    marginVertical: 20,
    width: screen.width/2,
  },
  graph_container: {
    flex: 6, 
    width: screen.width/2,
    padding: 10,
  },
});
export default Analytics;
