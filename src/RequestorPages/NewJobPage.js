import React, { useState } from "react";
import { Dimensions, StyleSheet, ScrollView, Button, View, SafeAreaView, Text, Alert, TouchableOpacity, TextInput } from "react-native";
import {Picker} from "@react-native-community/picker";
import DatePicker from 'react-native-datepicker';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

function NewJobPage () {
    const [selectedValue, setSelectedValue] = useState("alljobs");
    const [titleValue, titleText] = React.useState('');
    const [startTimeValue, startTimeText] = React.useState('');
    const [endTimeValue, endTimeText] = React.useState('');
    const [locationValue, locationText] = React.useState('');
    const [aboutValue, aboutText] = React.useState('');
    const [numberValue, numberText] = React.useState('');
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.row}>
                    <Text style={styles.headingOne}>Job Type</Text>
                    <Picker
                        selectedValue={selectedValue}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => selectedValue(itemValue)}
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
                          onChangeText={titleValue => titleText(titleValue)}
                          value={titleValue}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.headingOne}>Start Time</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => startTimeText(text)}
                        value={startTimeValue}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.headingOne}>End Time</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => endTimeText(text)}
                        value={endTimeValue}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.headingOne}>Location</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => locationText(text)}
                        value={locationValue}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.headingOne}>About</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => aboutText(text)}
                        value={aboutValue}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.headingOne}># of volunteers</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => numberText(text)}
                        value={numberValue}
                    />
                </View>
                <DatePicker
                    style={{width: 200}}
                    date="2020-10-15"
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2020-10-1"
                    maxDate="2021-10-1"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                />
                <TouchableOpacity style={styles.saveBtn}>
                    <Text style={{color: 'white'}}>SAVE</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headingOne: {
    fontSize: 24,
    padding: 10
  },
  scrollView: {
      marginHorizontal: 20,
      marginTop: 20
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
    marginTop:30,
    marginBottom:10
  },
  row: {
    width: 500,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    alignItems:"center",
    justifyContent:"center",
  },
  picker: {
    height: 150,
    width: 200,
    alignItems:"center",
    justifyContent:"center"
  },
  input: {
     height: 40,
     width: "60%",
     backgroundColor:"#D3D3D3",
     borderRadius: 10,
     borderColor: '#D3D3D3',
     borderWidth: 1,
     alignItems:"center",
     justifyContent:"center",
  }
});
export default NewJobPage;
