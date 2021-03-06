import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Dimensions } from "react-native";
import {AuthContext} from "./AuthContext.js";
import { Ionicons } from "@expo/vector-icons";

import AssignedJobs from "./src/VolunteerPages/AssignedJobs";
import JobBoard from "./src/VolunteerPages/JobBoard.js";
import PastJobs from "./src/VolunteerPages/PastJobs.js";
import Stats from "./src/VolunteerPages/Stats/Stats.js";
import Login from "./src/Login/Login.js";
import HomePage from "./src/RequestorPages/HomePage.js";
import NewJobPage from "./src/RequestorPages/NewJobPage.js";
import TrustedRequestor from "./src/VolunteerPages/TrustedRequesters.js";
import Registration from "./src/Registration/Registration.js";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const windowWidth = Dimensions.get("window").width;

class App extends React.Component {
  constructor() {
    super();

    this.setUsername = (value) => {
      this.setState(() => ({
        username: value
      }));
    };

    this.state = {
      username: "",
      setUsername: this.setUsername,
    };
  }

  render () {
    return (
      <AuthContext.Provider value={this.state}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="Registration" component={Registration} options={{headerShown: false}}/>
            <Stack.Screen name="VolunteerNavigator" component={VolunteerNavigator} options={{headerShown: false}}/>
            <Stack.Screen name="HomePage" component={HomePage} options={{headerShown: false}}/>
            <Stack.Screen name="NewJobPage" component={NewJobPage} options={{headerShown: false}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }
}
function VolunteerNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "AssignedJobs") {
            iconName = "ios-clipboard";
          } else if (route.name === "PastJobs") {
            iconName = "ios-checkmark";
          } else if (route.name === "JobBoard") {
            iconName = "ios-list";
          } else if (route.name === "Stats") {
            iconName = "ios-analytics";
          }else if (route.name === "TrustedRequestor") {
            iconName ="ios-contact";
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
      <Tab.Screen name="PastJobs" component={PastJobs}/>
      <Tab.Screen name="JobBoard" component={JobBoard} />
      <Tab.Screen name="Stats" component={Stats}/>
      <Tab.Screen name="TrustedRequestor" component={TrustedRequestor} />
    </Tab.Navigator>
  );
}

export default App;

