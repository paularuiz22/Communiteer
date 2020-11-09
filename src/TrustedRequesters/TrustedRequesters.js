import React, { Component } from "react";
import { Header } from 'react-native-elements';
import { Text, SafeAreaView, ScrollView, View } from 'react-native';
import { db } from "../../config";
import styles from "../../styles";
import { AuthContext } from "../../AuthContext";

const activeUserName = 'paularuiz22'

const TrustedUser = ({user: {firstName, lastName, userType, username}}) => {
  return (
    <View style={styles.requestor}>
        <Text style={styles.mediumText}>{firstName} {lastName}</Text>
        <Text style={styles.mediumText}>{userType}</Text>
        <Text style={styles.mediumText}>{username}</Text>
    </View>
  );
};

const ActiveUser = ({user: {userType, username}}) => {
  if (userType == userTypes.REQUESTOR & username == activeUserName) {
    return null;
  } else {
    return null;
  }
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
        allUsers: userItems, //sortBy(userItems, 'username'),
      });
    }); 
  }

  render () {
    let userKeys = Object.keys(this.state.allUsers);
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