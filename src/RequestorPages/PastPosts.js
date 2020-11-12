import React, { Component } from "react";
import { Dimensions, StyleSheet, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { db } from '../../config';
import { sortBy } from 'lodash';
import { formatTime } from "./NewJobPage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { AuthContext } from "../../AuthContext";
// TODO: fix UI of jobs


const today = new Date();
var activeUser  = {
  username: '',
  trustedUsers: [],
};

function contained(needle, haystack) {
  var length = haystack.length;
  for(var i = 0; i < length; i++) {
      if(haystack[i] == needle)
          return true;
  }
  return false;
}

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

  // TOOD: check if volunteer is already trusted before displaying the "add" button
  if (startJSONdate < today & requestor == activeUser.username) {
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
        this.addTrustedVolunteer = this.addTrustedVolunteer.bind(this);
        this.getTrustedVoluntneers = this.getTrustedVoluntneers.bind(this);
        this.getActiveUser = this.getActiveUser.bind(this);
      }

    static contextType = AuthContext;

    componentDidMount() {
        db.ref('/jobs').orderByChild("date").on('value', querySnapShot => {
            let data = querySnapShot.val() ? querySnapShot.val() : {};
            let jobItems = {...data};
            this.setState({
            jobs: sortBy(jobItems, 'date'),
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

    getTrustedVoluntneers() {
      db.ref('/users').orderByChild('username').on('value', querySnapShot => {
        let data = querySnapShot.val()["trustedUsers"];
        let userItems = {...data};
        activeUser.trustedUsers = userItems;
      });
    }
     

    addTrustedVolunteer(username) {
      var activeUserRef = db.ref('/users').orderByChild('username').equalTo(this.context["username"]).ref;
      var trustedVolunteers = [];
      activeUserRef.on("value", function(snap) {
        trustedVolunteers = snap.val()["trustedUsers"];
      });
      trustedVolunteers.push(username);
      activeUserRef.update({
        trustedUsers: trustedVolunteers,
      });
      activeUser.trustedUsers = trustedVolunteers;
    }

    render () {
        let jobsKeys = Object.keys(this.state.jobs);
        this.getActiveUser(Object.keys(this.state.allUsers));
        return (
          <SafeAreaView style={styles.safeContainer}>
            <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
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
      height: 200,
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
      padding: 3
    },
    column: {
      flexDirection: 'column',
      flexWrap: 'wrap',
      padding: 10
    },
});
