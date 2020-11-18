import React, { Component } from "react";
import { Header } from 'react-native-elements';
import { StyleSheet, Text, SafeAreaView, ScrollView, Picker, View } from 'react-native';
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


const Job = ({job: {title, jobType, startDateTime, endDateTime, location, requestor, volunteer}}) => {
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

      render() {
        let jobsKeys = Object.keys(this.state.jobs);
        this.getActiveUser(Object.keys(this.state.allUsers));
      
        return (
          <SafeAreaView style={styles.safeContainer}>
            <Header
                backgroundColor="#2A9D8F"
                centerComponent={{text: 'Past Jobs', style: {color: '#fff', fontSize: 35}}}
                />
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
  scrollView: {
    marginHorizontal: 20,
  },
  whiteHeadingOne: {
    fontSize: 30,
    color: "#fff",
    padding: 5,
    paddingLeft: 10
  },
  blackHeadingOne: {
    fontSize: 30,
  },
  numberLabel: {
    fontSize: 42,
    padding: 10,
    color: '#fff',
    textAlign: 'center'
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100/2,
    backgroundColor: "#264653",
    padding: 10
  },
  jobLabel: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    backgroundColor: "#EEEEEE",
    padding: 10,
    marginTop: 10
  },
  jobLabelTitle: {
    fontSize: 24,
  },
  typeLabel: {
    width: 100,
    height: 25,
    borderRadius: 10,
    backgroundColor: "#FF9B21",
    padding: 10
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10
  },
  scrollBar: {
    width: '100%',
    height: 50,
    backgroundColor: "#6e6e6e",
    marginTop: 10,
  }
});

export default PastJobs;