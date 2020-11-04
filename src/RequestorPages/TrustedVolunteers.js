import React, { Component } from "react";
import { Dimensions, StyleSheet, ScrollView, Button, View, SafeAreaView, TextInput, Text, Alert, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import {Picker} from "@react-native-community/picker";
import { db } from '../../config';
import { sortBy } from 'lodash';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

let today = new Date();
let todayDay = today.getDate();

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

class TrustedVolunteers extends Component {

    constructor() {
        super();
        this.ref = db.ref('/jobs');
        this.state = {
            volunteer: '',
            volunteers: []
        };
    }
    componentDidMount() {
        db.ref('/jobs').orderByChild("date").on('value', querySnapShot => {
            let data = querySnapShot.val() ? querySnapShot.val() : {};
            let jobItems = {...data};
            this.setState({
                jobs: sortBy(jobItems, 'date'),
            });
        });
    }

    cloneVolunteers() {
        return [...this.state.volunteers];
    }

    async removeVolunteer(i) {
        try {
            const volunteers = this.cloneVolunteers();
            volunteers.splice(i, 1);
            this.setState({volunteers: volunteers});
        }
        catch(e) {
        }
    }

    async addVolunteer() {
        if (this.state.volunteer.length <= 0)
            return;
        try {
            const volunteers = this.cloneVolunteers();
            volunteers.push(this.state.volunteer);
            this.setState({
                volunteers: volunteers,
                volunteer: ''
            });
        }
        catch (e) {
        }
    }

    renderVolunteers() {
        return this.state.volunteers.map((volunteer, i) => {
            return (
                <TouchableOpacity
                    key={i} style={styles.volunteer}
                    onPress={ () => this.removeVolunteer(i)}
                >
                    <Text style={styles.volunteerText}>{volunteer}</Text>
                </TouchableOpacity>
            );
        });
    }

    render () {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    {this.renderVolunteers()}
                </ScrollView>
                <KeyboardAvoidingView
                    style={styles.footer}
                    behavior="position"
                    enabled={true}
                >
                    <View style={styles.footerInner}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => this.addVolunteer()}
                        >
                            <Text style={styles.btnText}>+</Text>
                        </TouchableOpacity>
                        <TextInput
                            style={styles.textInput}
                            placeholder={'Add Trusted Volunteer'}
                            placeholderTextColor={'rgba(255, 255, 255, .7)'}
                            onChangeText={(volunteer) => this.setState({volunteer})}
                            value={this.state.volunteer}
                        />
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    width: '100%',
    height: 100,
    bottom: 0,
  },
  footerInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  btn: {
    zIndex: 1,
    position: 'absolute',
    right: 20,
    top: -50,
    width: 100,
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: "#264653"
  },
  btnText: {
    color: '#fff',
    fontSize: 40,
  },
  textInput: {
    zIndex: 0,
    flex: 1,
    padding: 20,
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#262526'
  },
  volunteer: {
    margin: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderRadius: 10,
  },
  volunteerText: {
    fontSize: 14,
    padding: 20
  },
  container: {
    flex: 1,
    alignItems: "center",
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
  scrollView: {
    maxHeight: '82%',
    marginBottom: 100,
    backgroundColor: '#fff'
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
  typeLabel: {
    width: 100,
    height: 25,
    borderRadius: 10,
    backgroundColor: "#FF9B21",
    marginLeft: 10,
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2
  },
  column: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: 5
  },
});
export default TrustedVolunteers;
