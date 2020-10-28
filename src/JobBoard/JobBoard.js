import React, {useState, Component} from "react";
import { Header } from 'react-native-elements';
import { StyleSheet, Text, SafeAreaView, ScrollView, Picker, View, FlatList } from 'react-native';
import Constants from 'expo-constants';

class JobBoard extends Component {
    constructor () {
        super();
        this.state = {
            selectedValue: "alljobs",
            data: [
            {
                month: "January",
                day: 27,
                title: "Pick-up Groceries",
                time: "4pm - 5pm",
                type: "Shopping",
                location: "Woodstock, GA"
            },
            {
                month: "February",
                day: 30,
                title: "Walk Dog",
                time: "3pm - 3:30pm",
                type: "Pet Care",
                location: "Downtown Atlanta, GA"
            },
            {
                month: "August",
                day: 1,
                title: "Vacuum Main Floor",
                time: "2pm - 4pm",
                type: "House Chores",
                location: "Vinings, GA"
            },
            {
                month: "September",
                day: 2,
                title: "Water Patio Plants",
                time: "9am - 9:30am",
                type: "House Chores",
                location: "Buckhead, GA"
            },
            {
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
        if (props.dataPoint.month == props.month) {
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
                        selectedValue={this.state.selectedValue}
                        style={styles.pickerStyle}
                        itemStyle={{height: 44}}
                        onValueChange={(value) => this.setState({ selectedValue: value })}
                    >
                        <Picker.Item label="All Jobs" value="alljobs"/>
                        <Picker.Item label="Beautification" value="beautification"/>
                        <Picker.Item label="Children" value="children"/>
                        <Picker.Item label="House Chores" value="housechores"/>
                        <Picker.Item label="Pet Care" value="petcare"/>
                        <Picker.Item label="Shopping" value="shopping"/>
                        <Picker.Item label="Tutoring" value="tutoring"/>
                    </Picker>
                </View>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.headingOne}>January</Text>
                    <FlatList
                        data={this.state.data}
                        width='100%'
                        extraData={this.state.data}
                        keyExtractor={(item) => item.key}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={({ item }) =>
                            <this.JobItem dataPoint={item} month="January" />
                        }
                    />
                    <Text style={styles.headingOne}>February</Text>
                    <FlatList
                        data={this.state.data}
                        width='100%'
                        extraData={this.state.data}
                        keyExtractor={(item) => item.key}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={({ item }) =>
                            <this.JobItem dataPoint={item} month="February" />
                        }
                    />
                    <Text style={styles.headingOne}>March</Text>
                    <FlatList
                        data={this.state.data}
                        width='100%'
                        extraData={this.state.data}
                        keyExtractor={(item) => item.key}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={({ item }) =>
                            <this.JobItem dataPoint={item} month="March" />
                        }
                    />
                    <Text style={styles.headingOne}>April</Text>
                    <FlatList
                        data={this.state.data}
                        width='100%'
                        extraData={this.state.data}
                        keyExtractor={(item) => item.key}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={({ item }) =>
                            <this.JobItem dataPoint={item} month="April" />
                        }
                    />
                    <Text style={styles.headingOne}>May</Text>
                    <FlatList
                        data={this.state.data}
                        width='100%'
                        extraData={this.state.data}
                        keyExtractor={(item) => item.key}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={({ item }) =>
                            <this.JobItem dataPoint={item} month="May" />
                        }
                    />
                    <Text style={styles.headingOne}>June</Text>
                    <FlatList
                        data={this.state.data}
                        width='100%'
                        extraData={this.state.data}
                        keyExtractor={(item) => item.key}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={({ item }) =>
                            <this.JobItem dataPoint={item} month="June" />
                        }
                    />
                    <Text style={styles.headingOne}>July</Text>
                    <FlatList
                        data={this.state.data}
                        width='100%'
                        extraData={this.state.data}
                        keyExtractor={(item) => item.key}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={({ item }) =>
                            <this.JobItem dataPoint={item} month="July" />
                        }
                    />
                    <Text style={styles.headingOne}>August</Text>
                    <FlatList
                        data={this.state.data}
                        width='100%'
                        extraData={this.state.data}
                        keyExtractor={(item) => item.key}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={({ item }) =>
                            <this.JobItem dataPoint={item} month="August" />
                        }
                    />
                    <Text style={styles.headingOne}>September</Text>
                    <FlatList
                        data={this.state.data}
                        width='100%'
                        extraData={this.state.data}
                        keyExtractor={(item) => item.key}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={({ item }) =>
                            <this.JobItem dataPoint={item} month="September" />
                        }
                    />
                    <Text style={styles.headingOne}>October</Text>
                    <FlatList
                        data={this.state.data}
                        width='100%'
                        extraData={this.state.data}
                        keyExtractor={(item) => item.key}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={({ item }) =>
                            <this.JobItem dataPoint={item} month="October" />
                        }
                    />
                    <Text style={styles.headingOne}>November</Text>
                    <FlatList
                        data={this.state.data}
                        width='100%'
                        extraData={this.state.data}
                        keyExtractor={(item) => item.key}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={({ item }) =>
                            <this.JobItem dataPoint={item} month="November" />
                        }
                    />
                    <Text style={styles.headingOne}>December</Text>
                    <FlatList
                        data={this.state.data}
                        width='100%'
                        extraData={this.state.data}
                        keyExtractor={(item) => item.key}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={({ item }) =>
                            <this.JobItem dataPoint={item} month="December" />
                        }
                    />
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