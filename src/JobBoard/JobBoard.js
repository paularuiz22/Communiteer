import React, {Component} from "react";
import { Header } from 'react-native-elements';
import { StyleSheet, Text, SafeAreaView, ScrollView, Picker, View, FlatList, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { db } from "../../config";
import { sortBy } from "lodash";
import { formatTime } from "../RequestorPages/NewJobPage";
import { Ionicons } from "@expo/vector-icons"
import { AuthContext } from "../../AuthContext";
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var activeUser  = {
    username: '',
    trustedUsers: [],
};
    
class JobBoard extends Component {
    constructor () {
        super();
        this.ref = db.ref('/jobs');
        this.state = {
            refresh: false,
            selectedType: "All Jobs",
            selectedRequestor: "All Requestors",
            activeSections: [],
            jobs: sortBy(this.ref, 'startDateTime'),
            allUsers: sortBy(this.userRef, 'username'),
        };
        this.getActiveUser = this.getActiveUser.bind(this);
    }
    
    static contextType = AuthContext;

    componentDidMount() {
        db.ref('/jobs').orderByChild("title").on('value', querySnapShot => {
            let data = querySnapShot.val() ? querySnapShot.val() : {};
            let jobItems = {...data};
            var jobArray = [];
            Object.keys(jobItems).forEach((key) => {
                jobArray.push(jobItems[key]);
            });
            this.setState({
                jobs: jobArray.sort(function compare(a, b) {
                    //var jobA = a["job"];
                    //var jobB = b["job"];
                    //var dateA = new Date(jobA.startDateTime);
                    //var dateB = new Date(jobB.startDateTime);
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

//    sortJobsByDate(jsonObjects, prop, direction) {
//        var objArray = [];
//        var keys = Object.keys(jsonObjects);
//        for (var i = 0; i < keys.length; i++) {
//            var k = keys[i];
//
//            var job = {
//            };
//        }
//        var direct = arguments.length > 2 ? arguments[2] : 1;
//        if (objArray) {
//            objArray.sort(function(a,b) {
//                if(a[prop] && b[prop]) {
//                    var aDate = new Date(a[prop]);
//                    var bDatte = new Date(b[prop]);
//                }
//                return ( (a < b) ? -1*direction : ((a > b) ? 1*direction : 0) );
//            });
//        }
//    }

    toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };
    
    setSections = sections => {
        this.setState({
          activeSections: sections.includes(undefined) ? [] : sections,
        });
    };
    
    renderHeader = (section, _, isActive) => {
        if (section != null)
        {
            let startDate = new Date(section["startDateTime"]);
            let endDate = new Date(section["endDateTime"]);
            let startTime = formatTime(startDate);
            let endTime = formatTime(endDate);

            return (
                <Animatable.View
                    duration={400}
                    style={[styles.header, isActive ? styles.active : styles.inactive]}
                    transition="backgroundColor"
                >
                    <Text style={styles.headingOne}>{monthNames[startDate.getMonth()]}</Text>
                    <View style={styles.row}>
                        <View style={styles.circle}>
                            <Text style={styles.numberLabel}>{startDate.getDate()}</Text>
                        </View>
                        <TouchableOpacity style={styles.jobLabel}>
                            <Text style={styles.jobLabelTitle}>{section.title}</Text>
                            <View style={styles.row}>
                                <Text style={styles.mediumText}>{startTime} - {endTime}</Text>
                                <View style={styles.typeLabel}>
                                    <Text style={styles.smallText}>{section.jobType}</Text>
                                </View>
                                <Text style={styles.mediumText}>{section.location}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            );
        }
    };
    
    renderContent(section, _, isActive) {
        if (section != null)
        {
            return (
                <Animatable.View
                    duration={400}
                    style={[styles.content, isActive ? styles.active : styles.inactive]}
                    transition="backgroundColor"
                >
                    <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
                        {section.description}
                    </Animatable.Text>
                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress= { () => db.ref('/jobs').orderByChild("title").equalTo(section.title).on('child_added', function(snapshot) {
                            var temp = snapshot.child("volunteer").val();
                            //console.log(temp);
                            snapshot.ref.update({
                                volunteer: activeUser.username
                            });
                        })
                    }>
                        <Text style={{color: "white"}}> Request Opportunity </Text>
                    </TouchableOpacity>
                </Animatable.View>
            );
        }
    }

    render () {
        this.getActiveUser(Object.keys(this.state.allUsers));
        var keys = Object.keys(this.state.jobs);
        const { multipleSelect, activeSections } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.topRow}>
                    <Text style={styles.headingOne}>Job Type</Text>
                    <Picker
                        selectedValue={this.state.selectedType}
                        style={styles.pickerStyle}
                        itemStyle={{height: 45}}
                        onValueChange={(value) => {
                            this.setState({ selectedType: value });
                            this.setState({ refresh: !this.state.refresh });
                        }}
                    >
                        <Picker.Item label="All Jobs" value="All Jobs"/>
                        <Picker.Item label="Beautification" value="Beautification"/>
                        <Picker.Item label="Children" value="Children"/>
                        <Picker.Item label="House Chores" value="House Chores"/>
                        <Picker.Item label="Pet Care" value="Pet Care"/>
                        <Picker.Item label="Shopping" value="Shopping"/>
                        <Picker.Item label="Tutoring" value="Tutoring"/>
                    </Picker>
                </View>
                <View style={styles.view}>
                    <Text style={styles.headingOne}>Requestors</Text>
                    <Picker
                        selectedValue={this.state.selectedRequestor}
                        style={styles.pickerStyle}
                        itemStyle={{height: 44}}
                        onValueChange={(value) => {
                            this.setState({ selectedRequestor: value});
                            this.setState({ refresh: !this.state.refresh });
                        }}
                    >
                        <Picker.Item label="All Requestors" value="All Requestors"/>
                        <Picker.Item label="Only Trusted Requestors" value="Only Trusted Requestors" />
                    </Picker>
                </View>
                <View style={styles.view}>
                <ScrollView>
                    <Accordion
                            activeSections={activeSections}
                            sections={Object.values(this.state.jobs)}
                            // sections={data}
                            touchableComponent={TouchableOpacity}
                            expandMultiple={multipleSelect}
                            renderHeader={this.renderHeader}
                            renderContent={this.renderContent}
                            duration={400}
                            onChange={this.setSections}
                        />
                </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
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
    fontSize: 25,
    padding: 10,
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
  topRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 3,
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
  column: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: 10,
    alignContent: 'center',
    textAlignVertical: 'center',
  },
});

export default JobBoard;