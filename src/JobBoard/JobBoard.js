import React, {Component} from "react";
import { Header } from 'react-native-elements';
import { StyleSheet, Text, SafeAreaView, ScrollView, Picker, View, FlatList, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { db } from "../../config";
import { sortBy } from "lodash";
import { formatTime } from "../RequestorPages/NewJobPage";
import { Ionicons } from "@expo/vector-icons"
import { AuthContext } from "../../AuthContext";
import jobTypes from "../../jobTypes";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var activeUser  = {
    username: '',
    trustedUsers: [],
  };
  

class JobBoard extends Component {
    constructor () {
        super();
        this.ref = db.ref('/jobs');
        this.userRef = db.ref('/users');
        this.state = {
            refresh: false,
            selectedType: "All Jobs",
            selectedRequestor: "All Requestors",
            jobs: sortBy(this.ref, 'title'),
            sortedJobArray: [],
            allUsers: sortBy(this.userRef, 'username'),
        };
        this.getActiveUser = this.getActiveUser.bind(this);
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
                jobArray.push({ "key": jobKey, "startDateTime": jobStartDateTime})
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

    sortJobsByDate(jsonObjects, prop, direction) {
        var objArray = [];
        var keys = Object.keys(jsonObjects);
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];

            var job = {
            };
        }
        var direct = arguments.length > 2 ? arguments[2] : 1;
        if (objArray) {
            objArray.sort(function(a,b) {
                if(a[prop] && b[prop]) {
                    var aDate = new Date(a[prop]);
                    var bDatte = new Date(b[prop]);
                }
                return ( (a < b) ? -1*direction : ((a > b) ? 1*direction : 0) );
            });
        }
    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#607D8B",
                }}
            />
        );
    }

    JobItem (props) {

        let startJSONdate = new Date(props.dataPoint.startDateTime);
        let endJSONdate = new Date(props.dataPoint.endDateTime);
        let startClockTime = formatTime(startJSONdate);
        let endClockTime = formatTime(endJSONdate);
        var trusted = false;
        for(var i = 0; i < activeUser.trustedUsers.length; i++) {
          if (activeUser.trustedUsers[i] == props.dataPoint.requestor) {
            trusted = true;
          }
        }
        {/*if (props.dataPoint.volunteer == "" && monthNames[startJSONdate.getMonth()] == props.month
            && (props.dataPoint.jobType == props.type || props.type == "All Jobs")
            && (props.dataPoint.requestor == props.requestor || props.requestor == "All Requestors" || (props.requestor == "Only Trusted Requestors" && trusted))) {*/}
        if (props.dataPoint.volunteer == ""
            && (props.dataPoint.jobType == props.type || props.type == "All Jobs")
            && (props.dataPoint.requestor == props.requestor || props.requestor == "All Requestors" || (props.requestor == "Only Trusted Requestors" && trusted))) {
            return (
                <View>
                <View>
                    <Text style={styles.headingOne}>{monthNames[startJSONdate.getMonth()]}</Text>
                </View>
                <View style={styles.row}>
                    <View style={styles.circle}>
                        <Text style={styles.numberLabel}>{startJSONdate.getDate()}</Text>
                    </View>
                    <TouchableOpacity style={styles.jobLabel}>
                        <Text style={styles.jobLabelTitle}>{props.dataPoint.title}</Text>
                        <View style={styles.row}>
                            <Text style={styles.mediumText}>{startClockTime} - {endClockTime}</Text>
                            <View style={styles.typeLabel}>
                                <Text style={styles.smallText}>{props.dataPoint.jobType }</Text>
                            </View>
                            <Text style={styles.mediumText, {marginLeft: 2}}>{props.dataPoint.location}</Text>
                        </View>
                        <View>
                            <Text>Requestor: {props.dataPoint.requestor}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.column}>
                    <TouchableOpacity 
                        style={styles.requestBtn} 
                        onPress= { () => db.ref('/jobs').orderByChild("title").equalTo(props.dataPoint.title).on('child_added', function(snapshot) {
                            var temp = snapshot.child("volunteer").val();
                            console.log(temp);
                            snapshot.ref.update({
                                volunteer: activeUser.username
                            });
                        })
                    }
                    >
                        <Text style={{color: "white"}}> Request Opportunity </Text>
                    </TouchableOpacity>
                        {/* <Ionicons
                            name="md-add"
                            color="#264653"
                            size={40}
                            onPress= { () => db.ref('/jobs').orderByChild("title").equalTo(props.dataPoint.title).on('child_added', function(snapshot) {
                                    var temp = snapshot.child("volunteer").val();
                                    console.log(temp);
                                    snapshot.ref.update({
                                        volunteer: activeUser.username
                                    });
                                })
                            }
                        /> */}
                    </View>
                </View>
                </View>
            );
        }
        return <View style={styles.filler}></View>;
    }

//    ItemList (props) {
//        const state = props.state;
//        let jobKeys = Object.keys(state.jobs);
//        let values = Object.values(state.jobs);
//
//        return (
//            <ScrollView style={styles.scrollView}>
//                <Text style={styles.headingOne}>January</Text>
//                <FlatList
//                    data={Object.values(state.jobs)}
//                    width='100%'
//                    extraData={state.refresh}
//                    keyExtractor={(item) => item.key}
//                    ItemSeparatorComponent={props.flatListItemSeparator}
//                    renderItem={({ item }) =>
//                        <props.jobItem dataPoint={item} month="January" type={state.selectedType} requestor={state.selectedRequestor} navigation={props.navigation}/>
//                    }
//                />
//                <Text style={styles.headingOne}>February</Text>
//                <FlatList
//                    data={Object.values(state.jobs)}
//                    width='100%'
//                    extraData={state.refresh}
//                    keyExtractor={(item) => item.key}
//                    ItemSeparatorComponent={props.flatListItemSeparator}
//                    renderItem={({ item }) =>
//                        <props.jobItem dataPoint={item} month="February" type={state.selectedType} requestor={state.selectedRequestor} navigation={props.navigation}/>
//                    }
//                />
//                <Text style={styles.headingOne}>March</Text>
//                <FlatList
//                    data={Object.values(state.jobs)}
//                    width='100%'
//                    extraData={state.refresh}
//                    keyExtractor={(item) => item.key}
//                    ItemSeparatorComponent={props.flatListItemSeparator}
//                    renderItem={({ item }) =>
//                        <props.jobItem dataPoint={item} month="March" type={state.selectedType} requestor={state.selectedRequestor} navigation={props.navigation}/>
//                    }
//                />
//                <Text style={styles.headingOne}>April</Text>
//                <FlatList
//                    data={Object.values(state.jobs)}
//                    width='100%'
//                    extraData={state.refresh}
//                    keyExtractor={(item) => item.key}
//                    ItemSeparatorComponent={props.flatListItemSeparator}
//                    renderItem={({ item }) =>
//                        <props.jobItem dataPoint={item} month="April" type={state.selectedType} requestor={state.selectedRequestor} navigation={props.navigation}/>
//                    }
//                />
//                <Text style={styles.headingOne}>May</Text>
//                <FlatList
//                    data={Object.values(state.jobs)}
//                    width='100%'
//                    extraData={state.refresh}
//                    keyExtractor={(item) => item.key}
//                    ItemSeparatorComponent={props.flatListItemSeparator}
//                    renderItem={({ item }) =>
//                        <props.jobItem dataPoint={item} month="May" type={state.selectedType} requestor={state.selectedRequestor} navigation={props.navigation}/>
//                    }
//                />
//                <Text style={styles.headingOne}>June</Text>
//                <FlatList
//                    data={Object.values(state.jobs)}
//                    width='100%'
//                    extraData={state.refresh}
//                    keyExtractor={(item) => item.key}
//                    ItemSeparatorComponent={props.flatListItemSeparator}
//                    renderItem={({ item }) =>
//                        <props.jobItem dataPoint={item} month="June" type={state.selectedType} requestor={state.selectedRequestor} navigation={props.navigation}/>
//                    }
//                />
//                <Text style={styles.headingOne}>July</Text>
//                <FlatList
//                    data={Object.values(state.jobs)}
//                    width='100%'
//                    extraData={state.refresh}
//                    keyExtractor={(item) => item.key}
//                    ItemSeparatorComponent={props.flatListItemSeparator}
//                    renderItem={({ item }) =>
//                        <props.jobItem dataPoint={item} month="July" type={state.selectedType} requestor={state.selectedRequestor} navigation={props.navigation}/>
//                    }
//                />
//                <Text style={styles.headingOne}>August</Text>
//                <FlatList
//                    data={Object.values(state.jobs)}
//                    width='100%'
//                    extraData={state.refresh}
//                    keyExtractor={(item) => item.key}
//                    ItemSeparatorComponent={props.flatListItemSeparator}
//                    renderItem={({ item }) =>
//                        <props.jobItem dataPoint={item} month="August" type={state.selectedType} requestor={state.selectedRequestor} navigation={props.navigation}/>
//                    }
//                />
//                <Text style={styles.headingOne}>September</Text>
//                <FlatList
//                    data={Object.values(state.jobs)}
//                    width='100%'
//                    extraData={state.refresh}
//                    keyExtractor={(item) => item.key}
//                    ItemSeparatorComponent={props.flatListItemSeparator}
//                    renderItem={({ item }) =>
//                        <props.jobItem dataPoint={item} month="September" type={state.selectedType} requestor={state.selectedRequestor} navigation={props.navigation}/>
//                    }
//                />
//                <Text style={styles.headingOne}>October</Text>
//                <FlatList
//                    data={Object.values(state.jobs)}
//                    width='100%'
//                    extraData={state.refresh}
//                    keyExtractor={(item) => item.key}
//                    ItemSeparatorComponent={props.flatListItemSeparator}
//                    renderItem={({ item }) =>
//                        <props.jobItem dataPoint={item} month="October" type={state.selectedType} requestor={state.selectedRequestor} navigation={props.navigation}/>
//                    }
//                />
//                <Text style={styles.headingOne}>November</Text>
//                <FlatList
//                    data={Object.values(state.jobs)}
//                    width='100%'
//                    extraData={state.refresh}
//                    keyExtractor={(item) => item.key}
//                    ItemSeparatorComponent={props.flatListItemSeparator}
//                    renderItem={({ item }) =>
//                        <props.jobItem dataPoint={item} month="November" type={state.selectedType} requestor={state.selectedRequestor} navigation={props.navigation}/>
//                    }
//                />
//                <Text style={styles.headingOne}>December</Text>
//                <FlatList
//                    data={Object.values(state.jobs)}
//                    width='100%'
//                    extraData={state.refresh}
//                    keyExtractor={(item) => item.key}
//                    ItemSeparatorComponent={props.flatListItemSeparator}
//                    renderItem={({ item }) =>
//                        <props.jobItem dataPoint={item} month="December" type={state.selectedType} requestor={state.selectedRequestor} navigation={props.navigation}/>
//                    }
//                />
//            </ScrollView>
//        );
//    }

    render () {
        this.getActiveUser(Object.keys(this.state.allUsers));
        var keys = Object.keys(this.state.jobs);
        return (
            <SafeAreaView style={styles.container}>
                <Header
                    backgroundColor="#2A9D8F"
                    centerComponent={{text: 'Job Board', style: {color: '#fff', fontSize: 25}}}
                />
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
                        <Picker.Item label="Outdoor Work" value={jobTypes.OUTDOORS}/>
                        <Picker.Item label="Organization" value={jobTypes.ORGANIZING}/>
                        <Picker.Item label="Housework" value={jobTypes.HOUSEWORK}/>
                        <Picker.Item label="Pet Care" value={jobTypes.PET_CARE}/>
                        <Picker.Item label="Shopping" value={jobTypes.SHOPPING}/>
                        <Picker.Item label="Technology" value={jobTypes.TECHNOLOGY}/>
                        <Picker.Item label="Other" value={jobTypes.OTHER}/>

                    </Picker>
                </View>
                <View style={styles.topRow}>
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
                {/*<this.ItemList state={this.state} flatListItemSeparator={this.FlatListItemSeparator} jobItem={this.JobItem} />*/}
                <ScrollView styles={styles.scrollView}>
                {keys.length > 0 ? (
                  this.state.sortedJobArray.map(job => {
                    var key = job.key;
                    return (<this.JobItem key={key} dataPoint={this.state.jobs[key]} type={this.state.selectedType} requestor={this.state.selectedRequestor}/>);
                  })
                ) : (
                    <Text>No jobs available</Text>
                )}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  headingOne: {
    fontSize: 30,
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
  requestBtn:{
    width:300,
    backgroundColor:"#264653",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:30,
    marginBottom:10
  },
});

export default JobBoard;