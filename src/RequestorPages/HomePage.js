import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"; // generates warnings i mean i guess its fine but idk
const Tab = createMaterialTopTabNavigator();
import { Dimensions, SafeAreaView, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import UpcomingPosts from "./UpcomingPosts.js";
import PastPosts from "./PastPosts.js";
import TrustedVolunteers from "./TrustedVolunteers.js";

const windowWidth = Dimensions.get("window").width;


function HomePage() {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator tabBarOptions={{
        labelStyle: { fontSize: 20, color: "#E76F51", fontWeight: "bold" },
        tabStyle: { width: windowWidth / 3 },
        style: { backgroundColor: "#FFFFFF", alignContent: "center", justifyContent: "center" },
        showIcon: true,
        showLabel: false,
      }}>
        <Tab.Screen 
          name="Upcoming Jobs" 
          component={UpcomingPosts}
          options= {{
            tabBarLabel:"Upcoming Jobs",
            tabBarIcon: ({ }) => (
              <Icon name="today" size={30} color="#900" />
            )
          }} 
        />
        <Tab.Screen name="Past Jobs" component={PastPosts}  options= {{
          tabBarLabel:"Past Jobs",
          tabBarIcon: ({ }) => (
            <Icon name="history" size={30} color="#900" />
          )
        }} 
        />
        <Tab.Screen name="Trusted Volunteers" component={TrustedVolunteers}
          options= {{
            tabBarLabel:"Trusted Volunteers",
            tabBarIcon: ({ }) => (
              <Icon name="supervisor-account" size={30} color="#900" />
            )
          }} 
        /> 
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default HomePage;