import React, { Component } from "react";
import { Dimensions, StyleSheet, ScrollView, View, SafeAreaView, Text } from "react-native";
import { db } from '../../config';
import { sortBy } from 'lodash';
import userTypes from "../Users/userType"
import { AuthContext } from "../../AuthContext";
import { Entypo } from "@expo/vector-icons";
import { Header } from 'react-native-elements';

const screen = Dimensions.get("screen");

var activeUser  = {
  username: '',
  trustedUsers: [],
};

const VolunteerUser = ({user: {firstName, lastName, userType, username}}) => {
  var trusted = false;
  for(var i = 0; i < activeUser.trustedUsers.length; i++) {
    if (activeUser.trustedUsers[i] == username) {
      trusted = true;
    }
  }
  if (userType == userTypes.VOLUNTEER & trusted) {
    return (
      <View style={styles.row}>
        <View style={{padding: 10, backgroundColor: "ECECEC"}}>
          <Text style={styles.jobLabelTitle}>{firstName} {lastName}</Text>
          <Text style={styles.mediumText}>{username}</Text>
        </View>
        <View style={styles.column}>
          <Entypo 
            name="trash"
            color="#264653"
            size={40}
            style={styles.volunteer} 
            onPress={
              () => db.ref('/users').orderByChild("username").equalTo(activeUser.username)
            .on('child_added', function(snapshot) {
                snapshot.ref.child("trustedUsers").orderByValue().equalTo(username)
                .on('child_added', function(snapshot) {
                  snapshot.ref.remove();
                })
            })}>
          </Entypo>
        </View>
      </View>
    );
    } else {
      return null;
    }
};


class TrustedVolunteers extends Component {

    static contextType = AuthContext;
    
    constructor() {
        super();
        this.ref = db.ref('/users');
        this.state = {
            createVolunteer: '',
            allUsers: []
        };
        this.componentDidMount = this.componentDidMount.bind(this);
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

    updateTextInput = (text, field) => {
      const state = this.state
      state[field] = text;
      this.setState(state);
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

    render () {
      let userKeys = Object.keys(this.state.allUsers);
      this.getActiveUser(userKeys);
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header
                    backgroundColor="#2A9D8F"
                    centerComponent={{text: 'Trusted Volunteers', style: {color: '#fff', fontSize: 35}}}
                />
                <ScrollView style={styles.scrollView}>
                  <View style={styles.container}>
                    {userKeys.length > 0 ? (
                      userKeys.map(key => (
                        <VolunteerUser
                          key={key}
                          id={key}
                          user={this.state.allUsers[key]}
                          // render = {this.render.bind(this)}
                        />
                      ))
                    ): (
                    <Text>No trusted users</Text>
                  )}
                  </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    alignItems: "center",
  },
  jobLabelTitle: {
    fontSize: 30,
  },
  typeLabel: {
    width: 100,
    height: 25,
    borderRadius: 10,
    backgroundColor: "#FF9B21",
    marginLeft: 10,
    padding: 5,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 5, 
    justifyContent: 'center'
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
  scrollView: {
    //marginHorizontal: 10,
    //marginBottom: 100,
    backgroundColor: '#fff'
  },
  numberLabel: {
    fontSize: 30,
    padding: 8,
    color: '#fff',
    textAlign: 'center'
  },
  jobLabel: {
    flex: 3,
    borderRadius: 10,
    backgroundColor: "#EEEEEE",
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
    padding: 2,
  },
  column: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: 5
  },
  volunteer: {
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
});
export default TrustedVolunteers;
