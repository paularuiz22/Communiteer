import React, { Component } from "react";
import { Dimensions, StyleSheet, ScrollView, View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { db } from "../../config.js"
import { sortBy } from 'lodash';
import Icon from "react-native-vector-icons/MaterialIcons";
import { formatTime } from "./NewJobPage";
import {AuthContext} from "../../AuthContext.js";
// TODO: fix UI of jobs

const screen = Dimensions.get("screen");

let today = new Date();

const Job = ({job: {title, jobType, startDateTime, endDateTime, location, requestor}}) => {
    let startJSONdate = new Date(startDateTime);
    let endJSONdate = new Date(endDateTime);
    let startClockTime = formatTime(startJSONdate);
    let endClockTime = formatTime(endJSONdate);
    if (startJSONdate >= today) {
        return (
            <View style={styles.row}>
                <View style={styles.circle}>
                    <Text style={styles.numberLabel}>{startJSONdate.getDate()}</Text>
                </View>
                <View style={styles.jobLabel}>
                    <View style={styles.column}>
                        <Text style={styles.jobLabelTitle}>{title}</Text>
                        <View style={styles.row}>
                            <Text style={styles.mediumText}>{startClockTime} - {endClockTime}</Text>
                            <View style={styles.typeLabel}>
                                <Text style={styles.smallText}>{jobType}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.mediumText}>{location}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.mediumText}>{requestor}</Text>
                        </View>         
                    </View>
                </View>
            </View>
        )
    }
    else {
        return null
    }
};

class UpcomingPosts extends Component {
    constructor() {
        super();
        this.ref = db.ref('/jobs');
        this.state = {
            jobs: sortBy(this.ref, 'title'),
        };
    }

    static contextType = AuthContext;

    componentDidMount() {
      db.ref('/jobs').orderByChild("title").on('value', querySnapShot => {
          let data = querySnapShot.val() ? querySnapShot.val() : {};
          let jobItems = {...data};
          this.setState({
            jobs: sortBy(jobItems, 'title'),
          });
      });
    }

    render () {
        let jobsKeys = Object.keys(this.state.jobs);
        let value = this.context;
        console.log("set username? ", value["username"]);
        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("NewJobPage")} style={styles.newJobBtn}>
                  <Icon name="add-box" size={30} style={{color:'white'}}/>
                </TouchableOpacity>
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
                        <Text>No upcoming jobs</Text>
                  )}
                </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  dropdown_container: {
    flex: 1,
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
  newJobBtn:{
    width:"25%",
    backgroundColor:"#E76F51",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    marginBottom:10
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
    textAlign: 'center',
    alignItems: "center",
    alignContent: "center",
    textAlignVertical: "center"
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#264653",
    padding: 10,
    alignContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    textAlign: "center",
    alignSelf: "center"
  },
  jobLabel: {
    width: 270,
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#EEEEEE",
    padding: 10
  },
  jobLabelTitle: {
    fontSize: 20,
  },
  typeLabel: {
    width: 100,
    height: 25,
    borderRadius: 10,
    backgroundColor: "#FF9B21",
    marginLeft: 10,
    padding: 5,
  },
  smallText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    textAlignVertical: "center"
  },
  mediumText: {
    fontSize: 17,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2
  },
  column: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: 5
  },
});
export default UpcomingPosts;
