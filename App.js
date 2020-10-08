import * as React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';

import 'react-native-gesture-handler';
import AssignedJobs from "./Components/AssignedJobs/AssignedJobs.js";
import JobBoard from "./Components/JobBoard/JobBoard.js";
import PastJobs from "./Components/PastJobs/PastJobs.js";
import Stats from "./Components/Stats/Stats.js";
import Login from "./Components/Login/Login.js";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator>
        <Stack.Screen
        name="Login" component={Login}
        />
      </Stack.Navigator> */}
      <Tab.Navigator>
        <Tab.Screen  name="Login" component={Login} />
        <Tab.Screen name="AssignedJobs" component={AssignedJobs} />
        <Tab.Screen name="PastJobs" component={PastJobs} />
        <Tab.Screen name="JobBoard" component={JobBoard} />
        <Tab.Screen name="Stats" component={Stats} />
      </Tab.Navigator>
     
    </NavigationContainer>
  );
}
