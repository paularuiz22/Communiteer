import React, { Component } from "react";
import { Header } from 'react-native-elements';
import { StyleSheet, FlatList, Text, SafeAreaView, ScrollView, Picker, View, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import db from "../../config";
import sortBy from "lodash";



const TrustedUser = ({user: {firstName, lastName, userType, username}}, key) => {
  return (
    <View style={styles.row}>
      <Text style={styles.jobLabel}>{username}</Text>
    </View>
  );
};

class TrustedRequestors extends Component {

  constructor() {
    super();
    this.ref = db.ref('/users');
    this.state = {
      allUsers: sortBy(this.ref, 'username'),
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
              <View>
                <Text>{this.state.allUsers[key].username}</Text>
              </View>
            ))
          ) : (
            <Text>No trusted requestors.</Text>
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