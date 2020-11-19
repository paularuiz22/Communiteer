import React, {Component} from "react";
import { StyleSheet, Text, SafeAreaView, ScrollView, View } from 'react-native';
import { AuthContext } from "../../AuthContext";
import { db } from "../../config";
import { sortBy } from "lodash";
import { Entypo } from "@expo/vector-icons";
import { formatTime } from "../RequestorPages/NewJobPage";
import { Header } from 'react-native-elements';

const today = new Date();
var activeUser  = {
  username: '',
  trustedUsers: [],
};

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Job = ({job: {title, jobType, startDateTime, endDateTime, location, requestor, volunteer}}) => {
  let startJSONdate = new Date(startDateTime);
  let endJSONdate = new Date(endDateTime);
  let startClockTime = formatTime(startJSONdate);
  let endClockTime = formatTime(endJSONdate);

  if (startJSONdate > today & volunteer == activeUser.username) {
      return (
          <View>
          <View>
              <Text style={styles.headingOne}>{monthNames[startJSONdate.getMonth()]}</Text>
          </View>
          <View style={styles.row}>
              <View style={styles.circle}>
                  <Text style={styles.numberLabel}>{startJSONdate.getDate()}</Text>
              </View>
              <View style={{backgroundColor: "#ECECEC", borderRadius: 10, width: 200}}>
                  <View style={styles.column}>
                      <Text style={styles.jobLabelTitle}>{title}</Text>
                      <View style={styles.row}>
                          <Text style={styles.mediumText}>{startClockTime} - {endClockTime}</Text>
                          <View style={styles.typeLabel}>
                              <Text style={styles.smallText}>{jobType}</Text>
                          </View>
                      </View>
                      <View style={styles.row}>
                          <Text style={styles.mediumText}>Location: {location}</Text>
                      </View>
                      <View style={styles.row}>
                          <Text style={styles.mediumText}>Requestor: {requestor}</Text>
                          
                      </View>
                  </View>
              </View>
              <View style={styles.column}>
                <Entypo 
                  name="trash"
                  color="#264653"
                  size={35}
                  style={styles.volunteer} 
                  onPress={
                    () => db.ref('/jobs').orderByChild("title").equalTo(title)
                  .on('child_added', function(snapshot) {
                      snapshot.ref.update({
                        volunteer: "",
                      });
                  })}>
                </Entypo>
              </View>
          </View>
          </View>
      )
  }
  else {
      return null
  }
};


class AssignedJobs extends Component {
  static contextType = AuthContext;

    constructor() {
        super();
        this.ref = db.ref('/jobs');
        this.userRef = db.ref('/users');
        this.state = {
         jobs: sortBy(this.ref, 'date'),
         sortedJobArray: [],
         allUsers: sortBy(this.userRef, 'username'),
        };
        this.getActiveUser = this.getActiveUser.bind(this);
      }
      
      componentDidMount() {
        db.ref('/jobs').orderByChild("date").on('value', querySnapShot => {
            let data = querySnapShot.val() ? querySnapShot.val() : {};
            let jobItems = {...data};
            let jobArray = [];
            Object.keys(jobItems).map((key) => {
                let jobKey = key;
                let jobStartDateTime = jobItems[key].startDateTime;
                jobArray.push({ "key": jobKey, "startDateTime": jobStartDateTime });
            })

            jobArray.sort(function compare(a, b) {
                var dateA = new Date(a.startDateTime);
                var dateB = new Date(b.startDateTime);
                return dateA - dateB;
            })

            this.setState({
            jobs: jobItems,
            sortedJobArray: jobArray,
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
    <SafeAreaView style={styles.container}>
              <Header
            backgroundColor="#2A9D8F"
            centerComponent={{text: 'Assigned Jobs', style: {color: '#fff', fontSize: 25}}}
        />

        <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
              {jobsKeys.length > 0 ? (
                this.state.sortedJobArray.map(job => {
                  var key = job.key;
                  return (<Job
                    key={key}
                    id={key}
                    job={this.state.jobs[key]}
                  />);
                })
              ) : (
                    <Text>No assigned, upcoming jobs</Text>
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
    flex: 1,
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
    marginLeft: 5,
    padding: 3,
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
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 3
  },
});

export default AssignedJobs;
