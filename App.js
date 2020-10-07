import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AssignedJobs from "./src/AssignedJobs/AssignedJobs.js";
import JobBoard from "./src/JobBoard/JobBoard.js";
import PastJobs from "./src/PastJobs/PastJobs.js";
import Stats from "./src/Stats/Stats.js";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="AssignedJobs" component={AssignedJobs} />
        <Tab.Screen name="PastJobs" component={PastJobs} />
        <Tab.Screen name="JobBoard" component={JobBoard} />
        <Tab.Screen name="Stats" component={Stats} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}