import React, {useState} from "react";
import { Header } from 'react-native-elements';
import { StyleSheet, FlatList, Text, SafeAreaView, ScrollView, Picker, View, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import data from './data.js'

// const Item = ({ name }) => (
//   <View style={styles.row}>
//     <Text style={styles.jobLabel}>{name}</Text>
//   </View>
// );

// const onPress = () => {  
//   return(

//   )
// }

const Item = ({ name, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.jobLabel}>{name}</Text>
  </TouchableOpacity>
);


const renderItem = ({ item }) => (
  <Item name={item.name}
        iconURL={item.iconURL}/>
);

function TrustedRequestors() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView style={styles.scrollView}> */}
        <FlatList
          style={styles.jobLabel}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    requestors: {
      flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    marginBottom: 5, marginTop: 5
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
      // width: 320,
      // height: 100,
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