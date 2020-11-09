import React, { Component } from "react";
import { Header } from 'react-native-elements';
import { StyleSheet, Text, SafeAreaView, ScrollView, View } from 'react-native';
import Constants from 'expo-constants';
import db from "../../config";



const TrustedUser = ({user: {firstName, lastName, userType, username}}) => {
  return (
    <View style={styles.requestor}>
        <Text style={styles.mediumText}>{firstName} {lastName}</Text>
        <Text style={styles.mediumText}>{userType}</Text>
        <Text style={styles.mediumText}>{username}</Text>
    </View>
  );
};

class TrustedRequestors extends Component {

  constructor() {
    super();
    this.ref = db.ref('/users');
    this.state = {
      allUsers: [],
    };
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

const styles = StyleSheet.create({
    requestors: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5,
      marginTop: 5
    },
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
    },
    scrollView: {
      marginHorizontal: 10,
    },
    headingOne: {
      fontSize: 30,
      padding: 10
    },
    numberLabel: {
      fontSize: 30,
      padding: 10,
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
    requestor: {
      alignItems: 'center',
      borderWidth: 2,
      backgroundColor: '#f9f9f9',
      borderColor: '#ddd',
    },
    jobLabel: {
      flex: 1,
      fontSize: 30,
      padding: 10,
      borderRadius: 10,
      backgroundColor: "white",
      padding: 10
    },
    jobLabelTitle: {
      fontSize: 24,
    },
    typeLabel: {
      width: 100,
      height: 25,
      borderRadius: 10,
      backgroundColor: "#FF9B21",
      padding: 10
    },
    smallText: {
      fontSize: 12,
      color: "#fff",
      textAlign: "center",
      textAlignVertical: "center"
    },
    mediumText: {
      fontSize: 18,
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 10
    },
  });

export default TrustedRequestors;