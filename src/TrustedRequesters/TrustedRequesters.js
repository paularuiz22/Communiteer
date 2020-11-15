import React, { Component } from "react";
import { Header } from 'react-native-elements';
import { Text, StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { db } from "../../config";
import { AuthContext } from "../../AuthContext";
import { sortBy } from "lodash";
import userTypes from "../Users/userType"
import { Entypo } from "@expo/vector-icons";

var activeUser  = {
  username: '',
  trustedUsers: [],
};

const TrustedUser = ({user: {firstName, lastName, userType, username}}) => {
  if (userType == userTypes.REQUESTOR & contained(username, activeUser.trustedUsers)) {
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

export default TrustedRequestors;