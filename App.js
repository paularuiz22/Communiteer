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
import { Ionicons } from "@expo/vector-icons";
import Collapse from "./src/RequestorPages/collapse"
import collapse from "./src/RequestorPages/collapse";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const windowWidth = Dimensions.get("window").width;

export default function App() {
  //index();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="VolunteerNavigator" component={VolunteerNavigator} options={{headerShown: false}}/>
        <Stack.Screen name="HomePage" component={HomePage} options={{headerShown: false}}/>
        <Stack.Screen name="NewJobPage" component={NewJobPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function VolunteerNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "AssignedJobs") {
            iconName = focused ? "ios-clipboard" : "ios-clipboard";
          } else if (route.name === "PastJobs") {
            iconName = focused ? "ion-md-checkbox" : "ios-list";
          } else if (route.name === "JobBoard") {
            iconName = focused ? "ios-list-box" : "ios-list";
          } else if (route.name === "Stats") {
            iconName = focused ? "ios-analytics" : "ios-analytics-outline";
          }else if (route.name === "TrustedRequestor") {
            iconName = focused ? "ios-contact" : "ios-list";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#E76F51",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="AssignedJobs" component={AssignedJobs}/>
      <Tab.Screen name="PastJobs" component={PastJobs} />
      <Tab.Screen name="JobBoard" component={JobBoard} />
      <Tab.Screen name="Stats" component={Stats}/>
      <Tab.Screen name="TrustedRequestor" component={TrustedRequestor} />
    </Tab.Navigator>
  );
}

// function VolunteerNavigator () {
//   return (
//     <Tab.Navigator tabBarOptions={{
//       labelStyle: { fontSize: 8, color: "#FFFFFF", fontWeight: "bold" },
//       tabStyle: { width: windowWidth / 2 },
//       style: { backgroundColor: "#2A9D8F" },
//     }}>
//       <Tab.Screen name="AssignedJobs" component={AssignedJobs} options={{ tabBarBadge: 3 }}/>
//       <Tab.Screen name="PastJobs" component={PastJobs} />
//       <Tab.Screen name="JobBoard" component={JobBoard} />
//       <Tab.Screen name="Stats" component={Stats}/>
//       <Tab.Screen name="TrustedRequestor" component={TrustedRequestor} />
//     </Tab.Navigator>
//   );
// }

