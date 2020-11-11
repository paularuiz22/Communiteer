import React, { Component } from "react";
import { Dimensions, StyleSheet, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { db } from '../../config';
import { sortBy } from 'lodash';
import { formatTime } from "./NewJobPage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { AuthContext } from "../../AuthContext";
// TODO: fix UI of jobs


const screen = Dimensions.get("screen");
const today = new Date();
var activeUser  = {
  username: '',
};

const Job = ({job: {title, jobType, startDateTime, endDateTime, location, requestor, volunteer}}) => {
  let startJSONdate = new Date(startDateTime);
  let endJSONdate = new Date(endDateTime);
  let startClockTime = formatTime(startJSONdate);
  let endClockTime = formatTime(endJSONdate);

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
                          <Entypo 
                          name="add-user"
                          size={32}
                          color="#264653"
                          />  
                      </View>
                  </View>
              </View>
              <TouchableOpacity onPress={() => db.ref('/users').orderByChild("username").equalTo(requestor)
                  .on("child_added", function(snapshot) {
                    // snapshot.ref.child("trustedUsers").update(["bob"])
                    var temp = snapshot.child("trustedUsers").val()
                    //temp.push("bobby2")
                    temp.push(volunteer)
                    snapshot.ref.child("trustedUsers").update(temp)
                  })} style={styles.typeLabel}>
                    <Text>add trusted user</Text>
              </TouchableOpacity>
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
        this.state = {
         jobs: sortBy(this.ref, 'date'),
        };
        this.addTrustedVolunteer = this.addTrustedVolunteer.bind(this);
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
    }
    
    getActiveUser() {
      let value = this.context;
      let jobsKeys = Object.keys(this.state.jobs);
        for (var i = 0; i < jobsKeys.length; i++) {
          var curr = this.state.jobs[jobsKeys[i]];
          if (curr.requestor == value["username"]) {
            activeUser.username = curr.requestor;
          }
        }
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
    }

    render () {
        let jobsKeys = Object.keys(this.state.jobs);
        this.getActiveUser();
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
              {/* this will add a hardcoded user to trusted user of currently signed in person,
              needs to be duplicated for each job post and pull volunteer info from post */}
              {/* <TouchableOpacity onPress={() => db.ref('/users').orderByChild("username").equalTo(value["username"])
                  .on("child_added", function(snapshot) {
                    // snapshot.ref.child("trustedUsers").update(["bob"])
                    var temp = snapshot.child("trustedUsers").val()
                    //temp.push("bobby2")
                    temp.push(volunteer)
                    snapshot.ref.child("trustedUsers").update(temp)
                  })} style={styles.typeLabel}>
                    <Text>add trusted user</Text>
              </TouchableOpacity> */}
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
