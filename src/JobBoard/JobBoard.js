import React, {Component} from "react";
import { Header } from 'react-native-elements';
import { StyleSheet, Text, SafeAreaView, ScrollView, Picker, View, FlatList, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { db } from "../../config";
import { sortBy } from "lodash";
import { formatTime } from "../RequestorPages/NewJobPage";
import { Ionicons } from "@expo/vector-icons"

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


class JobBoard extends Component {
    constructor () {
        super();
        this.ref = db.ref('/jobs');
        this.state = {
            refresh: false,
            selectedType: "All Jobs",
            selectedRequestor: "All Requestors",
            jobs: sortBy(this.ref, 'title'),
        };
    }

    componentDidMount() {
        db.ref('/jobs').orderByChild("title").on('value', querySnapShot => {
            let data = querySnapShot.val() ? querySnapShot.val() : {};
            let jobItems = {...data};
            this.setState({
              jobs: sortBy(jobItems, 'title'),
            });
        });
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
        if (monthNames[startJSONdate.getMonth()] == props.month
            && (props.dataPoint.jobType == props.type || props.type == "All Jobs")
            && (props.dataPoint.requestor == props.requestor || props.requestor == "All Requestors")) { // TODO: || (props.requestor == "Only Trusted Requestors" && (props.dataPoint.requestor == "Clara" || props.dataPoint.requestor == "Paula")))) {

            return (
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
                        <Ionicons
                            name="md-add"
                            color="#264653"
                            size={40}
                        />
                    </View>
                </View>
            );
        }
        return <View style={styles.filler}></View>;
    }

    ItemList (props) {
        const state = props.state;

        return (
            <ScrollView style={styles.scrollView}>
                <Text style={styles.headingOne}>January</Text>
                <FlatList
                    data={state.jobs}
                    width='100%'
                    extraData={state.refresh}
                    keyExtractor={(item) => item.key}
                    ItemSeparatorComponent={props.flatListItemSeparator}
                    renderItem={({ item }) =>
                        <props.jobItem dataPoint={item} month="January" type={state.selectedType} requestor={state.selectedRequestor} navigation={props.navigation}/>
                    }
                />
                <Text style={styles.headingOne}>February</Text>
                <FlatList
                    data={state.jobs}
                    width='100%'
                    extraData={state.refresh}
                    keyExtractor={(item) => item.key}
                    ItemSeparatorComponent={props.flatListItemSeparator}
                    renderItem={({ item }) =>
                        <props.jobItem dataPoint={item} month="February" type={state.selectedType} requestor={state.selectedRequestor} navigation={props.navigation}/>
                    }
                />
                <Text style={styles.headingOne}>March</Text>
                <FlatList
                    data={state.jobs}
                    width='100%'
                    extraData={state.refresh}
                    keyExtractor={(item) => item.key}
                    ItemSeparatorComponent={props.flatListItemSeparator}
                    renderItem={({ item }) =>
                        <props.jobItem dataPoint={item} month="March" type={state.selectedType} requestor={state.selectedRequestor} navigation={props.navigation}/>
                    }
                />
                <Text style={styles.headingOne}>April</Text>
                <FlatList
                    data={state.jobs}
                    width='100%'
                    extraData={state.refresh}
                    keyExtractor={(item) => item.key}
                    ItemSeparatorComponent={props.flatListItemSeparator}
                    renderItem={({ item }) =>
                        <props.jobItem dataPoint={item} month="April" type={state.selectedType} requestor={state.selectedRequestor} navigation={props.navigation}/>
                    }
                />
                <Text style={styles.headingOne}>May</Text>
                <FlatList
                    data={state.jobs}
                    width='100%'
                    extraData={state.refresh}
                    keyExtractor={(item) => item.key}
                    ItemSeparatorComponent={props.flatListItemSeparator}
                    renderItem={({ item }) =>
                        <props.jobItem dataPoint={item} month="May" type={state.selectedType} requestor={state.selectedRequestor} navigation={props.navigation}/>
                    }
                />
                <Text style={styles.headingOne}>June</Text>
                <FlatList
                    data={state.jobs}
                    width='100%'
                    extraData={state.refresh}
                    keyExtractor={(item) => item.key}
                    ItemSeparatorComponent={props.flatListItemSeparator}
                    renderItem={({ item }) =>
                        <props.jobItem dataPoint={item} month="June" type={state.selectedType} requestor={state.selectedRequestor} navigation={props.navigation}/>
                    }
                />
                <Text style={styles.headingOne}>July</Text>
                <FlatList
                    data={state.jobs}
                    width='100%'
                    extraData={state.refresh}
                    keyExtractor={(item) => item.key}
                    ItemSeparatorComponent={props.flatListItemSeparator}
                    renderItem={({ item }) =>
                        <props.jobItem dataPoint={item} month="July" type={state.selectedType} requestor={state.selectedRequestor} navigation={props.navigation}/>
                    }
                />
                <Text style={styles.headingOne}>August</Text>
                <FlatList
                    data={state.jobs}
                    width='100%'
                    extraData={state.refresh}
                    keyExtractor={(item) => item.key}
                    ItemSeparatorComponent={props.flatListItemSeparator}
                    renderItem={({ item }) =>
                        <props.jobItem dataPoint={item} month="August" type={state.selectedType} requestor={state.selectedRequestor} navigation={props.navigation}/>
                    }
                />
                <Text style={styles.headingOne}>September</Text>
                <FlatList
                    data={state.jobs}
                    width='100%'
                    extraData={state.refresh}
                    keyExtractor={(item) => item.key}
                    ItemSeparatorComponent={props.flatListItemSeparator}
                    renderItem={({ item }) =>
                        <props.jobItem dataPoint={item} month="September" type={state.selectedType} requestor={state.selectedRequestor} navigation={props.navigation}/>
                    }
                />
                <Text style={styles.headingOne}>October</Text>
                <FlatList
                    data={state.jobs}
                    width='100%'
                    extraData={state.refresh}
                    keyExtractor={(item) => item.key}
                    ItemSeparatorComponent={props.flatListItemSeparator}
                    renderItem={({ item }) =>
                        <props.jobItem dataPoint={item} month="October" type={state.selectedType} requestor={state.selectedRequestor} navigation={props.navigation}/>
                    }
                />
                <Text style={styles.headingOne}>November</Text>
                <FlatList
                    data={state.jobs}
                    width='100%'
                    extraData={state.refresh}
                    keyExtractor={(item) => item.key}
                    ItemSeparatorComponent={props.flatListItemSeparator}
                    renderItem={({ item }) =>
                        <props.jobItem dataPoint={item} month="November" type={state.selectedType} requestor={state.selectedRequestor} navigation={props.navigation}/>
                    }
                />
                <Text style={styles.headingOne}>December</Text>
                <FlatList
                    data={state.jobs}
                    width='100%'
                    extraData={state.refresh}
                    keyExtractor={(item) => item.key}
                    ItemSeparatorComponent={props.flatListItemSeparator}
                    renderItem={({ item }) =>
                        <props.jobItem dataPoint={item} month="December" type={state.selectedType} requestor={state.selectedRequestor} navigation={props.navigation}/>
                    }
                />
            </ScrollView>
        );
    }

    render () {
        console.log('jobs length in job board', this.state.jobs.length);
        let jobsKeys = Object.keys(this.state.jobs);
        
        console.log(this.state.jobs[jobsKeys[0]]);
        return (
            <SafeAreaView style={styles.container}>
                <Header
                    backgroundColor="#2A9D8F"
                    centerComponent={{text: 'Job Board', style: {color: '#fff', fontSize: 35}}}
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
                        <Picker.Item label="Beautification" value="Beautification"/>
                        <Picker.Item label="Children" value="Children"/>
                        <Picker.Item label="House Chores" value="House Chores"/>
                        <Picker.Item label="Pet Care" value="Pet Care"/>
                        <Picker.Item label="Shopping" value="Shopping"/>
                        <Picker.Item label="Tutoring" value="Tutoring"/>
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
                <this.ItemList state={this.state} flatListItemSeparator={this.FlatListItemSeparator} jobItem={this.JobItem} />
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
});

export default JobBoard;