import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"; // generates warnings i mean i guess its fine but idk
const Tab = createMaterialTopTabNavigator();
import { Text, Dimensions, View, SafeAreaView, StyleSheet } from "react-native";

import LeaderBoard from "./Leaderboard.js";
import Analytics from "./Analytics.js";

const windowWidth = Dimensions.get("window").width;

function Stats() {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator tabBarOptions={{
        labelStyle: { fontSize: 20, color: "#E76F51", fontWeight: "bold" },
        tabStyle: { width: windowWidth / 2 },
        style: { backgroundColor: "powderblue" },
      }}>
        <Tab.Screen name="Leaderboard" component={LeaderBoard} />
        <Tab.Screen name="Analytics" component={Analytics} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: 20
  }
});

export default Stats;