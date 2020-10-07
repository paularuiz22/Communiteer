import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"; // generates warnings i mean i guess its fine but idk
const Tab = createMaterialTopTabNavigator();
import { Text, View } from 'react-native';

import Leaderboard from "./Leaderboard.js";
import Analytics from "./Analytics.js";

function Stats() {
  return (
    <Tab.Navigator tabBarOptions={{
                       labelStyle: { fontSize: 12 },
                       tabStyle: { width: 100 },
                       style: { backgroundColor: 'powderblue' },
                     }}>
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
      <Tab.Screen name="Analytics" component={Analytics} />
    </Tab.Navigator>
  );
}
export default Stats;