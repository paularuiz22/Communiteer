import React, { Component } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { db } from '../../config';
import { sortBy } from 'lodash';
import { formatTime } from "./NewJobPage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { AuthContext } from "../../AuthContext";

const today = new Date();
var activeUser  = {
  username: '',
  trustedUsers: [],
};


const Job = ({job: {title, jobType, startDateTime, endDateTime, location, requestor, volunteer}}) => {
  let startJSONdate = new Date(startDateTime);
  let endJSONdate = new Date(endDateTime);
  let startClockTime = formatTime(startJSONdate);
  let endClockTime = formatTime(endJSONdate);
  var trusted = false;
  for(var i = 0; i < activeUser.trustedUsers.length; i++) {
    if (activeUser.trustedUsers[i] == volunteer) {
      trusted = true;
    }
  }

  if (startJSONdate < today & requestor == activeUser.username) {
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
                          { trusted ?  (
                            <Text></Text>
                          ) : (
                            <Entypo 
                            name="add-user"
                            size={32}
                            color="#264653"
                            onPress={
                              () => db.ref('/users').orderByChild("username").equalTo(requestor).on("child_added", function(snapshot) {
                                var temp = snapshot.child("trustedUsers").val()
                                temp.push(volunteer)
                                snapshot.ref.child("trustedUsers").update(temp)
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



export default class PastPosts extends Component {
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

    render () {
        let jobsKeys = Object.keys(this.state.jobs);
        this.getActiveUser(Object.keys(this.state.allUsers));
        return (
            <SafeAreaView style={styles.safeContainer}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.container}>
                        {this.state.jobs.length > 0 ? (
                            this.state.jobs.map((currentJob) => {
                                if (currentJob.title != null)
                                {
                                    let startJSONdate = new Date(currentJob.startDateTime);
                                    let endJSONdate = new Date(currentJob.endDateTime);
                                    let startClockTime = formatTime(startJSONdate);
                                    let endClockTime = formatTime(endJSONdate);
                                    var trusted = false;
                                    for(var i = 0; i < activeUser.trustedUsers.length; i++) {
                                        if (activeUser.trustedUsers[i] == currentJob.volunteer) {
                                            trusted = true;
                                        }
                                    }
                                    if (startJSONdate < today & currentJob.requestor == activeUser.username) {
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
                                                            <Text style={styles.mediumText}>{currentJob.volunteer}</Text>
                                                            { trusted ?  (
                                                                <Text></Text>
                                                            ) : (
                                                                <Entypo
                                                                    name="add-user"
                                                                    size={32}
                                                                    color="#264653"
                                                                    onPress={
                                                                        () => db.ref('/users').orderByChild("username").equalTo(current.Job.requestor).on("child_added", function(snapshot) {
                                                                        var temp = snapshot.child("trustedUsers").val()
                                                                        temp.push(currentJob.volunteer)
                                                                        snapshot.ref.child("trustedUsers").update(temp)
                                                                    })}
                                                                />
                                                            )}
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    }
                                }
                                else
                                {
                                    return null
                                }
                            })
                        ) : (
                            <Text>No previous jobs</Text>
                        )}
                    </View>
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
    scrollView: {
      marginHorizontal: 20,
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
      padding: 10
    },
});
