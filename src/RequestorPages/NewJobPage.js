import React, { Component } from "react";
import { Dimensions, StyleSheet, ScrollView, Button, View, SafeAreaView, Text, TouchableOpacity, TextInput, KeyboardAvoidingView } from "react-native";
import {Picker} from "@react-native-community/picker";
import db from "../../config.js"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ToggleSwitch from 'toggle-switch-react-native';

const screen = Dimensions.get("screen");
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const weekDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

class NewJobPage extends Component {
  constructor() {
    super();
    this.ref = db.ref('/jobs');
    this.state = {
      title: '',
      description: '',
      jobType: '',
      startDateTime: '',
      endDateTime: '',
      location: '',
      numVolunteers: '',
      isStartDateTimePickerVisible: false,
      isEndDateTimePickerVisible: false,
      startDateTimeLabel: 'Select Start Date/Time',
      endDateTimeLabel: 'Select End Date/Time',
      onlyForTrusted: false,
      requestor: '',
    };
    this.updateTextInput = this.updateTextInput.bind(this);
    this.saveJob = this.saveJob.bind(this);
  }


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
            startDateTime: this.state.startDateTime,
            endDateTime: this.state.endDateTime,
            location: this.state.location,
            numVolunteers: this.state.numVolunteers,
            onlyForTrusted: this.state.onlyForTrusted,
            requestor: this.state.requestor,

        }).then(() => {
            this.setState({
                title: '',
                description: '',
                startDateTime: '',
                endDateTime: '',
                location: '',
                about: '',
                numVolunteers: '',
                isStartDateTimePickerVisible: false,
                isEndDateTimePickerVisible: false,
                startDateTimeLabel: 'Select Start Date/Time',
                endDateTimeLabel: 'Select End Date/Time',
                onlyForTrusted: false,
                requestor: '',
            });
            this.props.navigation.goBack();
        }).catch((error) => {
                console.error("Error adding document: ", error);
        });
    }

    updateJobType = (jobType) => {
      this.setState({ jobType: jobType })
    };

    showStartDateTimePicker = () => {
        this.setState({ isStartDateTimePickerVisible: true});
    };
    hideStartDateTimePicker = () => {
        this.setState({ isStartDateTimePickerVisible: false});
    };
    handleStartDatePicked = (date) => {
        console.log('A start date has been picked: ', date);
        let formattedDate = this.formatDate(date);
        console.log('formatted date: ', formattedDate);
        this.setState({ startDateTimeLabel: formattedDate});
        this.setState({ startDateTime: date });
        this.hideStartDateTimePicker();
    }

    formatDate = (date) => {
        let time = date.getHours() % 12;
        let timeLabel = date.getHours() < 12 ? 'am' : 'pm';
        let formattedDate = weekDayNames[date.getDay()] + ', ' + monthNames[date.getMonth()] + ' ' + date.getDate().toString() + ', ' + date.getFullYear().toString() + ' at ' + time.toString() + ':' + date.getMinutes().toString() + timeLabel;
        return formattedDate;
    }

    showEndDateTimePicker = () => {
        this.setState({ isEndDateTimePickerVisible: true });
    };
    hideEndDateTimePicker = () => {
        this.setState({ isEndDateTimePickerVisible: false });
    };
    handleEndDatePicked = (date) => {
        console.log('An end date has been picked: ', date);
        let formattedDate = this.formatDate(date);
        this.setState({ endDateTimeLabel: formattedDate});
        this.setState({ endDateTime: date});
        this.hideEndDateTimePicker();
    }

    render () {
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
                            <Picker.Item label="All Jobs" value="alljobs"/>
                            <Picker.Item label="Beautification" value="beautification"/>
                            <Picker.Item label="Children" value="children"/>
                            <Picker.Item label="House Chores" value="housechores"/>
                            <Picker.Item label="Pet Care" value="petcare"/>
                            <Picker.Item label="Shopping" value="shopping"/>
                            <Picker.Item label="Tutoring" value="tutoring"/>
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
                        <Text style={styles.headingOne}>Start Time</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.updateTextInput(text, 'startTime')}
                            value={this.state.startTime}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.headingOne}>End Time</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.updateTextInput(text, 'endTime')}
                            value={this.state.endTime}
                        />
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
                        <ToggleSwitch
                            isOn={this.state.onlyForTrusted}
                            onColor='#264653'
                            offColor='#D3D3D9'
                            label="Only show to trusted volunteers?"
                            labelStyle={{color: "black", fontWeight: "4"}}
                            size="large"
                            onToggle={isOn => this.setState({ onlyForTrusted: isOn})}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.headingOne}>Requestor</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.updateTextInput(text, 'requestor')}
                            value={this.state.requestor}
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
export default NewJobPage;
