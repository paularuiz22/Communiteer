import React, { Component } from "react";
import { Header } from 'react-native-elements';
import { Text, SafeAreaView, ScrollView, View } from 'react-native';
import { db } from "../../config";
import styles from "../../styles";
import { AuthContext } from "../../AuthContext";
import { sortBy } from "lodash";
import userTypes from "../Users/userType"


//const activeUserName = 'paularuiz22';
var activeUser  = {
  username: '',
  trustedUsers: [],
};

const TrustedUser = ({user: {firstName, lastName, userType, username}}) => {
  var trusted = false;
  for(var i = 0; i < activeUser.trustedUsers.length; i++) {
    if (activeUser.trustedUsers[i] == username) {
      trusted = true;
    }
  }
  if (userType == userTypes.REQUESTOR & trusted) {
    return (
      <View style={styles.requestor}>
          <Text style={styles.mediumText}>{firstName} {lastName}</Text>
          <Text style={styles.mediumText}>{userType}</Text>
          <Text style={styles.mediumText}>{username}</Text>
      </View>
    );
    } else {
      return null;
    }
};


class TrustedRequestors extends Component {

  static contextType = AuthContext;

  constructor() {
    super();
    this.ref = db.ref('/users');
    this.state = {
      allUsers: [],
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

  render () {
    let value = this.context;
    let userKeys = Object.keys(this.state.allUsers);
    var i = 0;
    for (var i = 0; i < userKeys.length; i++) {
      var curr = this.state.allUsers[userKeys[i]];
      if (curr.username == value["username"]) {
        activeUser.username = curr.username;
        activeUser.trustedUsers = curr.trustedUsers;
      }
    }
    return (
      <SafeAreaView style={styles.container}>
        <Header
            backgroundColor="#2A9D8F"
            centerComponent={{text: 'Trusted Requestors', style: {color: '#fff'}}}
          />
        <ScrollView style={styles.scrollView}> 
        <View>
          {userKeys.length > 0 ? (
            userKeys.map(key => (
              <TrustedUser
                key={key}
                id={key}
                user={this.state.allUsers[key]}
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


export default TrustedRequestors;