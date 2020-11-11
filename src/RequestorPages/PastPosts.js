import React, { Component } from "react";
import { Dimensions, StyleSheet, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { db } from '../../config';
import { sortBy } from 'lodash';
import { formatTime } from "./NewJobPage";
import { AuthContext } from "../../AuthContext";
// TODO: fix UI of jobs


const screen = Dimensions.get("screen");
const today = new Date();

const Job = ({job: {title, jobType, startDateTime, endDateTime, location, requestor, volunteer}}) => {
  let startJSONdate = new Date(startDateTime);
  let endJSONdate = new Date(endDateTime);
  let startClockTime = formatTime(startJSONdate);
  let endClockTime = formatTime(endJSONdate);
  if (startJSONdate < today) {
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
        let value = this.context;
        this.ref = db.ref('/jobs');
        this.state = {
         jobs: sortBy(this.ref, 'date'),
        };
      }

    componentDidMount() {
        db.ref('/jobs').orderByChild("date").on('value', querySnapShot => {
            let data = querySnapShot.val() ? querySnapShot.val() : {};
            let jobItems = {...data};
            this.setState({
            jobs: sortBy(jobItems, 'date'),
            });
        });
    }

    render () {
        let value = this.context;
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
      padding: 5
    },
});
