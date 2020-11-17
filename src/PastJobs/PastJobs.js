import React, { Component } from "react";
import { Header } from 'react-native-elements';
import { Dimensions, SectionList, StyleSheet, Text, SafeAreaView, ScrollView, Picker, View, FlatList, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Entypo } from "@expo/vector-icons";
import { AuthContext } from "../../AuthContext";
import { db } from '../../config';
import { sortBy } from 'lodash';
import { formatTime } from "../RequestorPages/NewJobPage";



const today = new Date();
var activeUser  = {
  username: '',
  trustedUsers: [],
};

const Job = ({job}) => {
  let startJSONdate = new Date(startDateTime);
  let endJSONdate = new Date(endDateTime);
  let startClockTime = formatTime(startJSONdate);
  let endClockTime = formatTime(endJSONdate);
  var trusted = false;
  for(var i = 0; i < activeUser.trustedUsers.length; i++) {
    if (activeUser.trustedUsers[i] == requestor) {
      trusted = true;
    }
  }

  if (startJSONdate < today & volunteer == activeUser.username) {
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
                          <Text style={styles.mediumText}>{requestor}</Text>
                          { trusted ?  (
                            <Text></Text>
                          ) : (
                            <Entypo
                            name="add-user"
                            size={32}
                            color="#264653"
                            onPress={
                              () => db.ref('/users').orderByChild("username").equalTo(volunteer).on("child_added", function(snapshot) {
                                var temp = snapshot.child("trustedUsers").val();
                                temp.push(requestor);
                                snapshot.ref.child("trustedUsers").update(temp);
                            })}
                            />
                          )}
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



class PastJobs extends Component {
    static contextType = AuthContext;

    constructor() {
        super();
        this.ref = db.ref('/jobs');
        this.userRef = db.ref('/users');
        this.state = {
            jobs: sortBy(this.ref, 'date'),
            allUsers: sortBy(this.userRef, 'username'),
        };
        this.getActiveUser = this.getActiveUser.bind(this);
    }

    componentDidMount() {
        db.ref('/jobs').orderByChild("date").on('value', querySnapShot => {
            let data = querySnapShot.val() ? querySnapShot.val() : {};
            let jobItems = {...data};
            var jobArray = [];
            Object.keys(jobItems).map((key) => {
                if (jobItems[key].title != null) {
                    jobArray.push(jobItems[key]);
                }
            })
            this.setState({
                jobs: jobArray.sort(function compare(a, b) {
                    var dateA = new Date(a.startDateTime);
                    var dateB = new Date(b.startDateTime);
                    return dateA - dateB;
                }),
            });
        });
        
        db.ref('/users').orderByChild('username').on('value', querySnapShot => {
            let data = querySnapShot.val() ? querySnapShot.val() : {};
            let userItems = {...data};
            this.setState({
                allUsers: sortBy(userItems, 'username'),
            });
        });
    }

    getActiveUser(userKeys) {
        let value = this.context;
        for (var i = 0; i < userKeys.length; i++) {
            var curr = this.state.allUsers[userKeys[i]];
            if (curr.username == value["username"]) {
                activeUser.username = curr.username;
                activeUser.trustedUsers = curr.trustedUsers;
            }
        }
    } 

    render() {
        //let jobsKeys = Object.keys(this.state.jobs);
        const greeting = "welcome to react";
        this.getActiveUser(Object.keys(this.state.allUsers));
      
        return (
            <SafeAreaView style={styles.safeContainer}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.container}>
                        {this.state.jobs.length > 0 ? (
                            this.state.jobs.map((currentJob) => {
                                if (currentJob.title != null) {
                                    let startJSONdate = new Date(currentJob.startDateTime);
                                    let endJSONdate = new Date(currentJob.endDateTime);
                                    let startClockTime = formatTime(startJSONdate);
                                    let endClockTime = formatTime(endJSONdate);
                                    var trusted = false;

                                    for(var i = 0; i < activeUser.trustedUsers.length; i++) {
                                        if (activeUser.trustedUsers[i] == currentJob.requestor) {
                                            trusted = true;
                                        }
                                    }
                                    if (startJSONdate < today & currentJob.volunteer == activeUser.username) {
                                        return (
                                        <View style={styles.row} key={currentJob.description.toString()}>
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
                                                        <Text style={styles.mediumText}>{currentJob.requestor}</Text>
                                                        { trusted ?  (
                                                            <Text></Text>
                                                            ) : (
                                                                <Entypo
                                                                    name="add-user"
                                                                    size={32}
                                                                    color="#264653"
                                                                    onPress={
                                                                        () => db.ref('/users').orderByChild("username").equalTo(volunteer).on("child_added", function(snapshot) {
                                                                            var temp = snapshot.child("trustedUsers").val();
                                                                            temp.push(requestor);
                                                                            snapshot.ref.child("trustedUsers").update(temp);
                                                                    })}
                                                                    />
                                                        )}
                                                    </View>
                                                </View>
                                            </View>
                                        </View>)
                                    }
                                    else {
                                        return null
                                    }
                                }
                                else {
                                    return null
                                }
                            })
                        ) : ( <Text>No previous jobs</Text> )}
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
        padding: 5,
        justifyContent: "center",
    },
    safeContainer: {
        flex: 1,
        alignItems: "center",
    },
    view: {
        margin: 10,
    },
    loginBtn:{
        width:"80%",
        backgroundColor:"#264653",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
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
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: "center"
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
        fontSize: 12,
        color: "#fff",
        textAlign: "center",
        textAlignVertical: "center"
    },
    mediumText: {
        fontSize: 18,
    },
    smallText: {
        fontSize: 12,
    },
    topRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        alignItems:"center",
        justifyContent:"center",
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
    },
    pickerStyle: {
        height:80,
        width:"75%",
        fontSize: 32
    },
    filler: {
        height: 0,
    },
    box: {
        marginTop:20
    }
});

export default PastJobs;