import React, { Component } from "react";
import { Dimensions, StyleSheet, ScrollView, View, SafeAreaView, TextInput, Text, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import db from "../../config.js"
import { sortBy } from 'lodash';
import userTypes from "../Users/userType"

const screen = Dimensions.get("screen");

let today = new Date();
const activeUserName = 'lizBashaw'
var activeUser;

const VolunteerUser = ({user: {firstName, lastName, userType, username}}, key) => {
  var trusted = false;
  for(var i = 0; i < activeUser.trustedUsers.length; i++) {
    if (activeUser.trustedUsers[i] == username) {
      trusted = true;
    }
  }
  if (userType == userTypes.VOLUNTEER & trusted) {

    return (
      <TouchableOpacity
        key={key} style={styles.volunteer}
        onPress={ () => this.removeVolunteer(key)}
      >
        <Text style={styles.volunteerText}>{firstName} {lastName}</Text>
        <Text style={styles.volunteerText}>{userType}</Text>
        <Text style={styles.volunteerText}>{username}</Text>
        <Text style={styles.volunteerText}>trusted? {trusted ? "yes" : "no"}</Text>


      </TouchableOpacity>
    );
  } else {
    return null;
  }
};
const ActiveUser = ({user: {firstName, lastName, trustedUsers, userType, username}}, key) => {
  if (userType == userTypes.REQUESTOR & username == activeUserName) {
    return null;
    /*(
      <TouchableOpacity
        key={key} style={styles.volunteer}
        onPress={ () => this.removeVolunteer(key)}
      >
      {trustedUsers.length > 0 ? (
            trustedUsers.forEach(element => {
              <Text>{element}</Text>
            })
          ): (
            <Text>No trusted users</Text>
          )}
        <Text style={styles.volunteerText}>{firstName} {lastName}</Text>
        <Text style={styles.volunteerText}>{userType}</Text>
        <Text style={styles.volunteerText}>trusted volunteers: {trustedUsers.map((user)=> {<Text>{user}</Text>})}</Text>

      </TouchableOpacity>
    );*/
  } else {
    return null;
  }
};

class TrustedVolunteers extends Component {

    constructor() {
        super();
        this.ref = db.ref('/users');
        this.state = {
            createVolunteer: '',
            allUsers: []
        };
    }
    
    componentDidMount() {
        db.ref('/users').orderByChild('username').on('value', querySnapShot => {
            let data = querySnapShot.val() ? querySnapShot.val() : {};
            let userItems = {...data};
            this.setState({
                allUsers: sortBy(userItems, 'username'),
            });
        }); 
    }

    cloneVolunteers() {
        return [...this.state.allUsers];
    }

    // TODO: finish implementing removal of trusted
    async removeVolunteer(i) {
        try {
            const volunteers = this.cloneVolunteers();
            volunteers.splice(i, 1);
            this.setState({allUsers: volunteers});
        }
        catch(e) {
        }
    }

    // TODO: integrate backend into implementation to add trusted volunteer
    async addVolunteer() {
        if (this.state.createVolunteer.length <= 0)
            return;
        try {
            const volunteers = this.cloneVolunteers();
            this.ref.push(this.state.createVolunteer);
            this.setState({
                allUsers : volunteers,
                volunteer: ''
            });
        }
        catch (e) {
        }
    }

    render () {
      let userKeys = Object.keys(this.state.allUsers);
      let userObjects = Object.values(this.state.allUsers);
      var i = 0;
      for (var i = 0; i < userObjects.length; i++) {
        var curr = userObjects[i];
        if (curr.username == activeUserName) {
          activeUser = curr;
        }
      }
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                <View>
                    {userKeys.length > 0 ? (
                      userKeys.map(key => (
                        <ActiveUser
                          key={key}
                          id={key}
                          user={this.state.allUsers[key]}
                        />
                      ))
                    ): (
                      <Text>No trusted users</Text>
                    )}
                  </View>
                  <View>
                    {userKeys.length > 0 ? (
                      userKeys.map(key => (
                        <VolunteerUser
                          key={key}
                          id={key}
                          user={this.state.allUsers[key]}
                        />
                      ))
                    ): (
                      <Text>No trusted users</Text>
                    )}
                  </View>
                  <View>
                    {activeUser ? (
                      <VolunteerUser
                      user={activeUser}
                      />
                    ) : (
                      <Text>No active user</Text>
                    )}
                  </View>
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
                            value={this.state.createVolunteer}
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
    fontSize: 20,
    padding: 20,
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
