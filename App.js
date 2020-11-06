import * as React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, Dimensions, View, SafeAreaView, StyleSheet } from "react-native";
import index from "./index";

import AssignedJobs from "./src/AssignedJobs/AssignedJobs.js";
import JobBoard from "./src/JobBoard/JobBoard.js";
import PastJobs from "./src/PastJobs/PastJobs.js";
import Stats from "./src/Stats/Stats.js";
import Login from "./src/Login/Login.js";
import HomePage from "./src/RequestorPages/HomePage.js";
import NewJobPage from "./src/RequestorPages/NewJobPage.js";
import TrustedRequestor from "./src/TrustedRequesters/TrustedRequesters.js";
import TrustedVolunteers from "./src/RequestorPages/TrustedVolunteers/TrustedVolunteers.js";
import Registration from "./src/Registration/Registration.js";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const windowWidth = Dimensions.get("window").width;

export default function App() {
  //index();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Registration" component={Registration}/>
        <Stack.Screen name="VolunteerNavigator" component={VolunteerNavigator}/>
        <Stack.Screen name="HomePage" component={HomePage}/>
        <Stack.Screen name="NewJobPage" component={NewJobPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function VolunteerNavigator () {
    return (
        <Tab.Navigator tabBarOptions={{
            labelStyle: { fontSize: 20, color: "#FFFFFF", fontWeight: "bold" },
            tabStyle: { width: windowWidth / 2 },
            style: { backgroundColor: "#2A9D8F" },
        }}>
            <Tab.Screen name="AssignedJobs" component={AssignedJobs} />
            <Tab.Screen name="PastJobs" component={PastJobs} />
            <Tab.Screen name="JobBoard" component={JobBoard} />
            <Tab.Screen name="Stats" component={Stats}/>
            <Tab.Screen name="TrustedRequestor" component={TrustedRequestor} />
        </Tab.Navigator>
    );
}

