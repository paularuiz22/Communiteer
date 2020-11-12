import React, {useState, Component} from "react";
import { Header } from 'react-native-elements';
import { Dimensions, StyleSheet, Text, SafeAreaView, ScrollView, Picker, View, FlatList, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { db } from '../../config';
import { sortBy } from 'lodash';

const screen = Dimensions.get("screen");

const Job = ({job: {job: description, title, jobType, date, startTime, endTime, location, numVolunteers}, id}) => {
    if (date >= todayDay) {
        return (
            <View style={styles.row}>
                <View style={styles.circle}>
                    <Text style={styles.numberLabel}>{date}</Text>
                </View>
                <View style={styles.jobLabel}>
                    <View style={styles.column}>
                        <Text style={styles.jobLabelTitle}>{title}</Text>
                        <View style={styles.row}>
                            <Text style={styles.mediumText}>{startTime} - {endTime}</Text>
                            <View style={styles.typeLabel}>
                                <Text style={styles.smallText}>{jobType}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.mediumText}>{location}</Text>
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

class JobBoard extends Component {
    constructor () {
        super();

        this.ref = db.ref('/jobs');
        this.state = {
            refresh: false,
            selectedType: "All Jobs",
            selectedRequestor: "All Requestors",
            itemKey: -1,
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
        })
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
        if (props.dataPoint.month == props.month
            && (props.dataPoint.type == props.type || props.type == "All Jobs")
            && (props.dataPoint.requestor == props.requestor || props.requestor == "All Requestors" || (props.requestor == "Only Trusted Requestors" && (props.dataPoint.requestor == "Clara" || props.dataPoint.requestor == "Paula")))) {
            var newItemKey = this.state.itemKey + 1;
            this.setState({itemKey: newItemKey});
            return (
//                <View style={styles.row}>
//                    <View style={styles.circle}>
//                        <Text style={styles.numberLabel}>{props.dataPoint.day}</Text>
//                    </View>
//                    <TouchableOpacity style={styles.jobLabel}>
//                        <Text style={styles.jobLabelTitle}>{props.dataPoint.title}</Text>
//                        <View style={styles.row}>
//                            <Text style={styles.mediumText}>{props.dataPoint.time}</Text>
//                            <View style={styles.typeLabel}>
//                                <Text style={styles.smallText}>{props.dataPoint.type}</Text>
//                            </View>
//                            <Text style={styles.mediumText}>{props.dataPoint.location}</Text>
//                        </View>
//                    </TouchableOpacity>
//                </View>

                <View>
                   <Job key={this.state.itemKey} id={this.state.itemKey} job={props.dataPoint} />
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
        return (
            <SafeAreaView style={styles.container}>
                <Header
                    backgroundColor="#2A9D8F"
                    centerComponent={{text: 'Job Board', style: {color: '#fff'}}}
                />
                <View style={styles.topRow}>
                    <Text style={styles.headingOne}>Job Type</Text>
                    <Picker
                        selectedValue={this.state.selectedType}
                        style={styles.pickerStyle}
                        itemStyle={{height: 44}}
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
                        <Picker.Item label="Clara" value="Clara" />
                        <Picker.Item label="Paula" value="Paula" />
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
    alignItems: 'center',
    justifyContent: 'center',
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
    textAlign: 'center',
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
    padding: 10,
    alignItems:"center",
    justifyContent:"center",
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2,
  },
  pickerStyle: {
    height:80,
    width:"75%",
    fontSize: 32
  },
  filler: {
    height: 0,
  }
});

export default JobBoard;