import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"; // generates warnings i mean i guess its fine but idk
const Tab = createMaterialTopTabNavigator();

import Leaderboard from "./Leaderboard.js";
import Analytics from "./Analytics.js";

function Stats() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
      <Tab.Screen name="Analytics" component={Analytics} />
    </Tab.Navigator>
  );
}
export default Stats;