import React, { Component } from "react";
import { Dimensions, StyleSheet, ScrollView, View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { db } from "../../config.js"
import { sortBy } from 'lodash';
import Icon from "react-native-vector-icons/MaterialIcons";
import { formatTime } from "./NewJobPage";
import {AuthContext} from "../../AuthContext.js";
import { Entypo } from "@expo/vector-icons";
import { Header } from 'react-native-elements';

const screen = Dimensions.get("screen");

let today = new Date();
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
    if (startJSONdate >= today && requestor == activeUser.username) {
        return (
            <View>
            <View>
                <Text style={styles.headingOne}>{monthNames[startJSONdate.getMonth()]}</Text>
            </View>
            <View style={styles.row}>
                <View style={styles.circle}>
                    <Text style={styles.numberLabel}>{startJSONdate.getDate()}</Text>
                </View>
                <View style={{backgroundColor: "#ECECEC", borderRadius: 10, width: 230}}>
                    <View style={styles.column}>
                        <Text style={styles.jobLabelTitle}>{title}</Text>
                        <View style={styles.row}>
                            <Text style={styles.mediumText}>{startClockTime} - {endClockTime}</Text>

                        </View>
                        <View style={styles.row}>
                            <Text style={styles.mediumText}>{location}</Text>
                        </View>
                        <View style={styles.typeLabel}>
                                <Text style={styles.smallText}>{jobType}</Text>
                        </View>
                        <View style={styles.row}>
                            {volunteer == "" ? 
                            (<Text style={styles.mediumText}>No one has signed up yet.</Text>) : (
                              <Text style={styles.mediumText}>Volunteer: {volunteer}</Text>
                            )}
                        </View>         
                    </View>
                </View>
                <View style={styles.column, {alignContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
                  <Entypo 
                    name="trash"
                    color="#264653"
                    size={35}
                    style={styles.volunteer} 
                    onPress={() => db.ref('/jobs').orderByChild("title").equalTo(title)
                  .on("child_added", function(snapshot) {
                    snapshot.ref.remove();
                  })
                    }>
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

class UpcomingPosts extends Component {
    constructor() {
        super();
        this.ref = db.ref('/jobs');
        this.userRef = db.ref('/users');
        this.state = {
            jobs: sortBy(this.ref, 'title'),
            sortedJobArray: [],
            allUsers: sortBy(this.userRef, 'username'),
        };
    }

    static contextType = AuthContext;

    componentDidMount() {
      db.ref('/jobs').orderByChild("title").on('value', querySnapShot => {
          let data = querySnapShot.val() ? querySnapShot.val() : {};
          let jobItems = {...data};
          let jobArray = [];
          Object.keys(jobItems).map((key) => {
            let jobKey = key;
            let jobStartDateTime = jobItems[key].startDateTime;
            jobArray.push({ "key": jobKey, "startDateTime": jobStartDateTime })
          })
          jobArray.sort(function compare(a, b) {
            var dateA = new Date(a.startDateTime);
            var dateB = new Date(b.startDateTime);
            return dateA - dateB;
          })
          this.setState({
            jobs: jobItems,
            sortedJobArray: jobArray
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
        let value = this.context;
        console.log("set username? ", value["username"]);
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header
                    backgroundColor="#2A9D8F"
                    centerComponent={{text: 'Upcoming Job Posts', style: {color: '#fff', fontSize: 23}}}
                />
                <TouchableOpacity onPress={() => this.props.navigation.navigate("NewJobPage")} style={styles.newJobBtn}>
                  <Icon name="add-box" size={30} style={{color:'white'}}/>
                </TouchableOpacity>
                <ScrollView style={styles.scrollView}>
                <View>
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
                        <Text>No upcoming jobs</Text>
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
    marginLeft: 5,
    padding: 3,
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
    padding: 5,
    //alignSelf: 'flex-end'
  },
});
export default UpcomingPosts;
