import React, {useState, Component} from "react";
import { Header } from 'react-native-elements';
import { Dimensions, StyleSheet, Text, SafeAreaView, ScrollView, Picker, View, FlatList } from 'react-native';
import Constants from 'expo-constants';

class JobBoard extends Component {
    constructor () {
        super();
        this.state = {
            selectedType: "House Chores",
            selectedRequestor: "Only Trusted Requestors",
            data: [
            {
                requestor: "Clara",
                month: "January",
                day: 27,
                title: "Pick-up Groceries",
                time: "4pm - 5pm",
                type: "Shopping",
                location: "Woodstock, GA"
            },
            {
                requestor: "Charlie",
                month: "February",
                day: 30,
                title: "Walk Dog",
                time: "3pm - 3:30pm",
                type: "Pet Care",
                location: "Downtown Atlanta, GA"
            },
            {
                requestor: "Paula",
                month: "August",
                day: 1,
                title: "Vacuum Main Floor",
                time: "2pm - 4pm",
                type: "House Chores",
                location: "Vinings, GA"
            },
            {
                requestor: "Bob",
                month: "September",
                day: 2,
                title: "Water Patio Plants",
                time: "9am - 9:30am",
                type: "House Chores",
                location: "Buckhead, GA"
            },
            {
                requestor: "Clara",
                month: "September",
                day: 3,
                title: "Decorate for Halloween",
                time: "10am - 12am",
                type: "House Chores",
                location: "Buckhead, GA"
            }
            ]
        };
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
            return (
                <View style={styles.row}>
                    <View style={styles.circle}>
                        <Text style={styles.numberLabel}>{props.dataPoint.day}</Text>
                    </View>
                    <View style={styles.jobLabel}>
                        <Text style={styles.jobLabelTitle}>{props.dataPoint.title}</Text>
                        <View style={styles.row}>
                            <Text style={styles.mediumText}>{props.dataPoint.time}</Text>
                            <View style={styles.typeLabel}>
                                <Text style={styles.smallText}>{props.dataPoint.type}</Text>
                            </View>
                            <Text style={styles.mediumText}>{props.dataPoint.location}</Text>
                        </View>
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
                    data={state.data}
                    width='100%'
                    extraData={state.data}
                    keyExtractor={(item) => item.key}
                    ItemSeparatorComponent={props.flatListItemSeparator}
                    renderItem={({ item }) =>
                        <props.jobItem dataPoint={item} month="January" type={state.selectedType} requestor={state.selectedRequestor}/>
                    }
                />
                <Text style={styles.headingOne}>February</Text>
                <FlatList
                    data={state.data}
                    width='100%'
                    extraData={state.data}
                    keyExtractor={(item) => item.key}
                    ItemSeparatorComponent={props.flatListItemSeparator}
                    renderItem={({ item }) =>
                        <props.jobItem dataPoint={item} month="February" type={state.selectedType} requestor={state.selectedRequestor}/>
                    }
                />
                <Text style={styles.headingOne}>March</Text>
                <FlatList
                    data={state.data}
                    width='100%'
                    extraData={state.data}
                    keyExtractor={(item) => item.key}
                    ItemSeparatorComponent={props.flatListItemSeparator}
                    renderItem={({ item }) =>
                        <props.jobItem dataPoint={item} month="March" type={state.selectedType} requestor={state.selectedRequestor}/>
                    }
                />
                <Text style={styles.headingOne}>April</Text>
                <FlatList
                    data={state.data}
                    width='100%'
                    extraData={state.data}
                    keyExtractor={(item) => item.key}
                    ItemSeparatorComponent={props.flatListItemSeparator}
                    renderItem={({ item }) =>
                        <props.jobItem dataPoint={item} month="April" type={state.selectedType} requestor={state.selectedRequestor}/>
                    }
                />
                <Text style={styles.headingOne}>May</Text>
                <FlatList
                    data={state.data}
                    width='100%'
                    extraData={state.data}
                    keyExtractor={(item) => item.key}
                    ItemSeparatorComponent={props.flatListItemSeparator}
                    renderItem={({ item }) =>
                        <props.jobItem dataPoint={item} month="May" type={state.selectedType} requestor={state.selectedRequestor}/>
                    }
                />
                <Text style={styles.headingOne}>June</Text>
                <FlatList
                    data={state.data}
                    width='100%'
                    extraData={state.data}
                    keyExtractor={(item) => item.key}
                    ItemSeparatorComponent={props.flatListItemSeparator}
                    renderItem={({ item }) =>
                        <props.jobItem dataPoint={item} month="June" type={state.selectedType} requestor={state.selectedRequestor}/>
                    }
                />
                <Text style={styles.headingOne}>July</Text>
                <FlatList
                    data={state.data}
                    width='100%'
                    extraData={state.data}
                    keyExtractor={(item) => item.key}
                    ItemSeparatorComponent={props.flatListItemSeparator}
                    renderItem={({ item }) =>
                        <props.jobItem dataPoint={item} month="July" type={state.selectedType} requestor={state.selectedRequestor}/>
                    }
                />
                <Text style={styles.headingOne}>August</Text>
                <FlatList
                    data={state.data}
                    width='100%'
                    extraData={state.data}
                    keyExtractor={(item) => item.key}
                    ItemSeparatorComponent={props.flatListItemSeparator}
                    renderItem={({ item }) =>
                        <props.jobItem dataPoint={item} month="August" type={state.selectedType} requestor={state.selectedRequestor}/>
                    }
                />
                <Text style={styles.headingOne}>September</Text>
                <FlatList
                    data={state.data}
                    width='100%'
                    extraData={state.data}
                    keyExtractor={(item) => item.key}
                    ItemSeparatorComponent={props.flatListItemSeparator}
                    renderItem={({ item }) =>
                        <props.jobItem dataPoint={item} month="September" type={state.selectedType} requestor={state.selectedRequestor}/>
                    }
                />
                <Text style={styles.headingOne}>October</Text>
                <FlatList
                    data={state.data}
                    width='100%'
                    extraData={state.data}
                    keyExtractor={(item) => item.key}
                    ItemSeparatorComponent={props.flatListItemSeparator}
                    renderItem={({ item }) =>
                        <props.jobItem dataPoint={item} month="October" type={state.selectedType} requestor={state.selectedRequestor}/>
                    }
                />
                <Text style={styles.headingOne}>November</Text>
                <FlatList
                    data={state.data}
                    width='100%'
                    extraData={state.data}
                    keyExtractor={(item) => item.key}
                    ItemSeparatorComponent={props.flatListItemSeparator}
                    renderItem={({ item }) =>
                        <props.jobItem dataPoint={item} month="November" type={state.selectedType} requestor={state.selectedRequestor}/>
                    }
                />
                <Text style={styles.headingOne}>December</Text>
                <FlatList
                    data={state.data}
                    width='100%'
                    extraData={state.data}
                    keyExtractor={(item) => item.key}
                    ItemSeparatorComponent={props.flatListItemSeparator}
                    renderItem={({ item }) =>
                        <props.jobItem dataPoint={item} month="December" type={state.selectedType} requestor={state.selectedRequestor}/>
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
                            this.ItemList({ state: this.state, flatListItemSeparator: this.FlatListItemSeparator, jobItem: this.JobItem });
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
                            this.ItemList({ state: this.state, flatListItemSeparator: this.FlatListItemSeparator, jobItem: this.JobItem });
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
    padding: 10,
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
  }
});

export default JobBoard;