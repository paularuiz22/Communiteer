import React, { Component } from "react";
import { Dimensions, StyleSheet, ScrollView, Button, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Switch } from "react-native";
import {Picker} from "@react-native-community/picker";
import { db } from '../../config';
import DateTimePickerModal from "react-native-modal-datetime-picker";
//import ToggleSwitch from 'toggle-switch-react-native';
import jobTypes from "../../jobTypes";
import { AuthContext } from "../../AuthContext";

const screen = Dimensions.get("screen");
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var now = new Date();
var plusOneHour = new Date();
plusOneHour.setHours(now.getHours() + 1);
export default class NewJobPage extends Component {
  constructor() {
    super();
    this.ref = db.ref('/jobs');
    this.state = {
      title: '',
      description: '',
      jobType: jobTypes.OTHER,
      startDateTime: now,
      endDateTime: plusOneHour,
      location: '',
      numVolunteers: '',
      isStartDateTimePickerVisible: false,
      isEndDateTimePickerVisible: false,
      startDateTimeLabel: 'Select Start Date/Time',
      endDateTimeLabel: 'Select End Date/Time',
      onlyForTrusted: false,
    };
      this.updateTextInput = this.updateTextInput.bind(this);
      this.saveJob = this.saveJob.bind(this);
  }

  static contextType = AuthContext;


    updateTextInput = (text, field) => {
      const state = this.state
      state[field] = text;
      this.setState(state);
    }

    saveJob() {
        // TODO: verify the input fields (that they're not empty, time is formatted correctly, etc) before pushing
        this.ref.push({
            title: this.state.title,
            jobType: this.state.jobType,
            description: this.state.description,
            date: parseInt(this.state.date, 10),
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            location: this.state.location,
            numVolunteers: this.state.numVolunteers,
            onlyForTrusted: this.state.onlyForTrusted,
            requestor: this.context["username"],
        }).then(() => {
            this.setState({
                title: '',
                description: '',
                startDateTime: now,
                endDateTime: plusOneHour,
                location: '',
                about: '',
                numVolunteers: '',
                isStartDateTimePickerVisible: false,
                isEndDateTimePickerVisible: false,
                startDateTimeLabel: 'Select Start Date/Time',
                endDateTimeLabel: 'Select End Date/Time',
                onlyForTrusted: false,
            });
            this.props.navigation.goBack();
        }).catch((error) => {
                console.error("Error adding document: ", error);
        });
    }

   updateJobType = (jobType) => {
      this.setState({ jobType: jobType })
   }

    showStartDateTimePicker = () => {
        this.setState({ isStartDateTimePickerVisible: true});
    };
    hideStartDateTimePicker = () => {
        this.setState({ isStartDateTimePickerVisible: false});
    };
    handleStartDatePicked = (date) => {
        console.log('A start date has been picked: ', date);
        let formattedDate = formatDate(date);
        console.log('formatted date: ', formattedDate);
        this.setState({ startDateTimeLabel: formattedDate});
        this.setState({ startDateTime: date.toString() });
        this.hideStartDateTimePicker();
    }



    showEndDateTimePicker = () => {
        this.setState({ isEndDateTimePickerVisible: true });
    };
    hideEndDateTimePicker = () => {
        this.setState({ isEndDateTimePickerVisible: false });
    };
    handleEndDatePicked = (date) => {
        console.log('An end date has been picked: ', date);
        let formattedDate = formatDate(date);
        this.setState({ endDateTimeLabel: formattedDate});
        this.setState({ endDateTime: date.toString()});
        this.hideEndDateTimePicker();
    }

    render () {
       var dateVisible = false;
        return (
            <KeyboardAvoidingView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.row}>
                        <Text style={styles.headingOne}>Job Type</Text>
                        <Picker
                            selectedValue={this.state.jobType}
                            style={styles.picker}
                            onValueChange={this.updateJobType}
                        >
                            {Object.keys(jobTypes).map((key) => {
                                return (<Picker.Item label={jobTypes[key]} value={key} key={key}/>);
                            })}

                        </Picker>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.headingOne}>Title</Text>
                        <TextInput
                              style={styles.input}
                              onChangeText={(text) => this.updateTextInput(text, 'title')}
                              value={this.state.title}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.headingOne}>About</Text>
                        <View style ={{ flex: 1}}>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => this.updateTextInput(text, 'description')}
                                value={this.state.description}
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.headingOne}>Start Date/Time</Text>
                        <View>
                            <Button onPress={this.showStartDateTimePicker} title = {this.state.startDateTimeLabel} />
                        </View>
                        {this.state.isStartDateTimePickerVisible && (
                            <DateTimePickerModal
                                isVisible={true}
                                mode={'datetime'}
                                onConfirm={this.handleStartDatePicked}
                                onCancel={this.hideStartDateTimePicker}
                                style={{alignContent: 'center', alignItems: 'center'}}
                            />
                        )}
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.headingOne}>End Date/Time</Text>
                        <View>
                            <Button onPress={this.showEndDateTimePicker} title = {this.state.endDateTimeLabel} />
                        </View>
                        {this.state.isEndDateTimePickerVisible && (
                            <DateTimePickerModal
                                isVisible={true}
                                mode={'datetime'}
                                onConfirm={this.handleEndDatePicked}
                                onCancel={this.hideEndDateTimePicker}
                            />
                        )}
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.headingOne}>Location</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.updateTextInput(text, 'location')}
                            value={this.state.location}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.headingOne}># of volunteers</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.updateTextInput(text, 'numVolunteers')}
                            value={this.state.numVolunteers}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.smallerHeading}>Only show to trusted volunteers?</Text>
                        <Switch
                            trackColor={{ false: '#D3D3D9', true: "#264653" }}
                            thumbColor={this.state.onlyForTrusted ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            value={this.state.onlyForTrusted}
                            label="Only show to trusted volunteers?"
                            labelStyle={{color: "black", fontWeight: "4"}}
                            size="large"
                            onValueChange={value => this.setState({ onlyForTrusted: value})}
                        />
                    </View>
                    <TouchableOpacity style={styles.saveBtn}>
                        <Button
                            title="SAVE"
                            color="white"
                            onPress={() => this.saveJob()} />
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        );
     }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  headingOne: {
    fontSize: 24,
    padding: 8
  },
  smallerHeading: {
      fontSize: 18,
      padding: 8,
  },
  scrollView: {
    margin: 10,
    alignSelf: 'center',
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
  saveBtn:{
    width:"80%",
    backgroundColor:"#264653",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    alignSelf: 'center',
    marginTop:15,
    marginBottom:10
  },
  row: {
    //width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2,
    justifyContent:"flex-start",
  },
  picker: {
    height: 150,
    width: 200,
    alignItems:"center",
    justifyContent:"center"
  },
  input: {
     height: 40,
     //width: "50%",
     backgroundColor:"#D3D3D3",
     borderRadius: 10,
     borderColor: '#D3D3D3',
     borderWidth: 1,
     alignItems:"center",
     justifyContent:"center",
     flex: 1
  }
});
export const formatDate = (date) => {
    let time = date.getHours() % 12;
    let timeLabel = date.getHours() < 12 ? 'am' : 'pm';
    let formattedDate = weekDayNames[date.getDay()] + ', ' + monthNames[date.getMonth()] + ' ' + date.getDate().toString() + ', ' + date.getFullYear().toString() + ' at ' + time.toString() + ':' + date.getMinutes().toString() + timeLabel;
    return formattedDate;
}

export const formatTime = (date) => {
    let time = date.getHours() % 12;
    let timeLabel = date.getHours() < 12 ? 'am' : 'pm';
    let formattedTime = time.toString() + ':' + date.getMinutes().toString() + timeLabel;
    return formattedTime;
}
