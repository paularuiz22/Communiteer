import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"; // generates warnings i mean i guess its fine but idk
const Tab = createMaterialTopTabNavigator();
import { Text, Dimensions, View, SafeAreaView, StyleSheet } from "react-native";

import UpcomingPosts from "./UpcomingPosts.js";
import PastPosts from "./PastPosts.js";
import TrustedVolunteers from "./TrustedVolunteers.js";

const windowWidth = Dimensions.get("window").width;
const screen = Dimensions.get("screen");


function HomePage() {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator tabBarOptions={{
        labelStyle: { fontSize: 20, color: "#E76F51", fontWeight: "bold" },
        tabStyle: { width: windowWidth / 3 },
        style: { backgroundColor: "#FFFFFF" },
      }}>
        <Tab.Screen name="Upcoming Jobs" component={UpcomingPosts} />
        <Tab.Screen name="Past Jobs" component={PastPosts} />
        <Tab.Screen name="Trusted Volunteers" component={TrustedVolunteers} />
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

export default HomePage;