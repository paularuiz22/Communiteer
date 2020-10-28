import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
import db from "./src/firebase.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/Login/Login.js";
import Home from "./src/Home/Home.js";
import Registration from "./src/Registration/Registration";
import RegistrationPhone from "./src/Registration/RegistrationPhone.js";

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <></>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <Stack.Screen name="Home">
            {props => <Home {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registration" component={RegistrationPhone} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// import * as React from "react";
// import { NavigationContainer, StackActions } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createStackNavigator } from "@react-navigation/stack";
// import { Text, Dimensions, View, SafeAreaView, StyleSheet } from "react-native";
// import index from "./index";

// import AssignedJobs from "./src/AssignedJobs/AssignedJobs.js";
// import JobBoard from "./src/JobBoard/JobBoard.js";
// import PastJobs from "./src/PastJobs/PastJobs.js";
// import Stats from "./src/Stats/Stats.js";
// import Login from "./src/Login/Login.js";
// import Registration from "./src/Registration/Registration.js";
// import HomePage from "./src/RequestorPages/HomePage.js";
// import NewJobPage from "./src/RequestorPages/NewJobPage.js";
// import {decode, encode} from 'base-64';
// if (!global.btoa) {  global.btoa = encode };
// if (!global.atob) { global.atob = decode };

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();
// const windowWidth = Dimensions.get("window").width;

// export default function App() {

//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   //index();
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         { user ? (
//           <Stack.Screen name="Home">
//             {props => <HomeScreen {...props} extraData={user} />}
//           </Stack.Screen>
//         ) : (
//           <>
//             <Stack.Screen name="Login" component={Login} />
//             <Stack.Screen name="Registration" component={Registration} />
//           </>
//         )}
//         <Stack.Screen name="Login" component={Login}/>
//         <Stack.Screen name="VolunteerNavigator" component={VolunteerNavigator}/>
//         <Stack.Screen name="HomePage" component={HomePage}/>
//         <Stack.Screen name="NewJobPage" component={NewJobPage}/>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// function VolunteerNavigator () {
//   return (
//     <Tab.Navigator tabBarOptions={{
//       labelStyle: { fontSize: 20, color: "#FFFFFF", fontWeight: "bold" },
//       tabStyle: { width: windowWidth / 2 },
//       style: { backgroundColor: "#2A9D8F" },
//     }}>
//       <Tab.Screen name="AssignedJobs" component={AssignedJobs} />
//       <Tab.Screen name="PastJobs" component={PastJobs} />
//       <Tab.Screen name="JobBoard" component={JobBoard} />
//       <Tab.Screen name="Stats" component={Stats}/>
//     </Tab.Navigator>
//   );
// }

