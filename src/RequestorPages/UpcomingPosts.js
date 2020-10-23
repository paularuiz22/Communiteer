import React, { Component } from "react";
import { Dimensions, StyleSheet, ScrollView, Button, View, SafeAreaView, Text, Alert, TouchableOpacity } from "react-native";
import {Picker} from "@react-native-community/picker";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

function UpcomingPosts({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("NewJobPage")} style={styles.newJobBtn}>
                <Text style={{color: 'white'}}>ADD NEW JOB</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  newJobBtn:{
    width:"25%",
    backgroundColor:"#E76F51",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    marginBottom:10
  },
});
export default UpcomingPosts;
