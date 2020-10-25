import React, { Component } from "react";
import { Dimensions, StyleSheet, ScrollView, Button, View, SafeAreaView, Text, Alert } from "react-native";
import {Picker} from "@react-native-community/picker";
// import { Divider } from 'react-native-paper';
import { db } from '../Stats/BackendTest';


/*import MonthlyHours from "./Charts/MonthlyHours.js";
import Points from "./Charts/Progress.js";
import TypesJobs from "./Charts/TypesJobs.js";*/

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const Job = ({job: {job: title, description, jobType, date, startTime, endTime, location, numVolunteers}, id}) => {

    return (
        <View style={styles.row}>
            <View style={styles.circle}>
                <Text style={styles.numberLabel}>{date}</Text>
            </View>
            <View style={styles.jobLabel}>
                <Text>{title}</Text>
                <View style={styles.row}>
                    <Text style={styles.mediumText}>{startTime} - {endTime}</Text>
                    <View style={styles.typeLabel}>
                        <Text style={styles.smallText}>{jobType}</Text>
                    </View>
                    <Text style={styles.mediumText}>{location}</Text>
                </View>
            </View>
        </View>
    )
};

export default class PastPosts extends Component {

    constructor() {
        super();
        this.ref = db.ref('/jobs');
        this.state = {
         jobs: this.ref,
        };
      }

      componentDidMount() {
          db.ref('/jobs').on('value', querySnapShot => {
            let data = querySnapShot.val() ? querySnapShot.val() : {};
            let jobItems = {...data};
            this.setState({
              jobs: jobItems,
            });
          });
        }
    render () {
        let jobsKeys = Object.keys(this.state.jobs);
        return (
            <ScrollView style={styles.scrollView}>
            <View>
              {jobsKeys.length > 0 ? (
                jobsKeys.map(key => (
                  <Job
                    key={key}
                    id={key}
                    job={this.state.jobs[key]}
                  />
                ))
              ) : (
                    <Text>No previous jobs</Text>
              )}
            </View>
            </ScrollView>
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
    scrollView: {
      marginHorizontal: 20,
    },
  dropdown: {
    height: 50,
    width: screen.width/2,
    marginVertical: 10,
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
  },
  scrollView: {
      marginHorizontal: 20,
    },
    headingOne: {
      fontSize: 30,
      padding: 10
    },
    numberLabel: {
      fontSize: 30,
      padding: 8,
      color: '#fff',
      textAlign: 'center'
    },
    circle: {
      width: 75,
      height: 75,
      borderRadius: 75/2,
      backgroundColor: "#264653",
      padding: 10
    },
    jobLabel: {
      width: 270,
      height: 100,
      borderRadius: 10,
      backgroundColor: "#EEEEEE",
      padding: 10
    },
    jobLabelTitle: {
      fontSize: 24,
    },
    typeLabel: {
      width: 100,
      height: 25,
      borderRadius: 10,
      backgroundColor: "#FF9B21",
      marginLeft: 10,
      padding: 5
    },
    smallText: {
      fontSize: 14,
      color: "#fff",
      textAlign: "center",
      textAlignVertical: "center"
    },
    mediumText: {
      fontSize: 18,
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 10
    }
});
