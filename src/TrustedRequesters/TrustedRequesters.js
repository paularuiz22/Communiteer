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
  if (userType == userTypes.REQUESTOR & contained(username, activeUser.trustedUsers)) {
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

function contained(needle, haystack) {
  var length = haystack.length;
  for(var i = 0; i < length; i++) {
      if(haystack[i] == needle)
          return true;
  }
  return false;
}


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

  getActiveUser() {
    let value = this.context;
    let userKeys = Object.keys(this.state.allUsers);
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
    this.getActiveUser();
    return (
      <SafeAreaView style={styles.container}>
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