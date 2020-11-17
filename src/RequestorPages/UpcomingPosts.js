import React, { Component } from "react";
import { Dimensions, StyleSheet, ScrollView, Button, View, SafeAreaView, Text, Alert, TouchableOpacity } from "react-native";
import {Picker} from "@react-native-community/picker";
import { sortBy } from "lodash";
import { db } from "../../config.js"
import Icon from "react-native-vector-icons/MaterialIcons";
import { formatTime } from "./NewJobPage";
import {AuthContext} from "../../AuthContext.js";

const screen = Dimensions.get("screen");

let today = new Date();

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Job = ({job: {title, jobType, startDateTime, endDateTime, location, requestor, volunteer}}) => {
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
                <View style={{backgroundColor: "#ECECEC", borderRadius: 10}}>
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
                            <Text style={styles.mediumText}>{volunteer}</Text>
                        </View>         
                    </View>
                </View>
                <View style={styles.row}>
              <Text style={styles.mediumText}>{location}</Text>
            </View>
            </View>
    );
  }
  else {
    return null;
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
            var jobArray = [];
            Object.keys(jobItems).map((key) => {
                if (jobItems[key].title != null)
                {
                    jobArray.push(jobItems[key]);
                }
            })
            this.setState({
                jobs: jobArray.sort(function compare(a, b) {
                    var dateA = new Date(a.startDateTime);
                    var dateB = new Date(b.startDateTime);
                    return dateA - dateB;
                })
            });
        });
    }

    render () {
        let jobsKeys = Object.keys(this.state.jobs);
        let value = this.context;
        console.log("set username? ", value["username"]);
        return (
            <SafeAreaView style={styles.safeContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("NewJobPage")} style={styles.newJobBtn}>
                  <Icon name="add-box" size={30} style={{color:'white'}}/>
                </TouchableOpacity>
                <ScrollView style={styles.scrollView}>
                    {this.state.jobs.length > 0 ? (
                        this.state.jobs.map((currentJob) => {
                            if (currentJob.title != null)
                            {
                                let startJSONdate = new Date(currentJob.startDateTime);
                                let endJSONdate = new Date(currentJob.endDateTime);
                                let startClockTime = formatTime(startJSONdate);
                                let endClockTime = formatTime(endJSONdate);
                                if (startJSONdate >= today)
                                {
                                    return (
                                    <View style={styles.container} key={currentJob.description.toString()}>
                                        <View>
                                            <Text style={styles.headingOne}>{monthNames[startJSONdate.getMonth()]}</Text>
                                            <View style={styles.row}>
                                                <View style={styles.circle}>
                                                    <Text style={styles.numberLabel}>{startJSONdate.getDate()}</Text>
                                                </View>
                                                <View style={{backgroundColor: "#ECECEC", borderRadius: 10}}>
                                                    <View style={styles.column}>
                                                        <Text style={styles.jobLabelTitle}>{currentJob.title}</Text>
                                                        <View style={styles.row}>
                                                            <Text style={styles.mediumText}>{startClockTime} - {endClockTime}</Text>
                                                            <View style={styles.typeLabel}>
                                                                <Text style={styles.smallText}>{currentJob.jobType}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={styles.row}>
                                                            <Text style={styles.mediumText}>{currentJob.location}</Text>
                                                        </View>
                                                        <View style={styles.row}>
                                                            <Text style={styles.mediumText}>{currentJob.volunteer}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    );
                                }
                                else
                                {
                                    return null
                                }
                            }
                            else
                            {
                                return null
                            }
                        })
                    ) : (
                        <Text>No upcoming jobs</Text>
                    )}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 5,
    justifyContent: "center",
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
    fontSize: 25,
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
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 2
  },
  column: {
    flexDirection: "column",
    flexWrap: "wrap",
    padding: 5
  },
});
export default UpcomingPosts;
