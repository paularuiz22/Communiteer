import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import * as firebase from "firebase";

export default function RegistrationScreen({navigation}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          fullName,
        };
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate("Home", {user: data});
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder='Full Name'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder='E-mail'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder='Confirm Password'
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onRegisterPress()}>
        <Text style={styles.buttonTitle}>Create account</Text>
      </TouchableOpacity>
      <View style={styles.footerView}>
        <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
      </View>
    </View>
  );
}
// import React from "react";
// import { Text, View } from "react-native";
// import { Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
// import { Button } from "react-native";

// function Registration({navigation}) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.logo}>Communiteer</Text>
//       <Image source={require("../img/logo.png")} />
//       <View style={styles.inputView} >
//         <TextInput  
//           style={styles.inputText}
//           placeholder="Email" 
//           placeholderTextColor="#003f5c"
//           onChangeText={text => this.setState({email:text})}/>
//       </View>
//       <View style={styles.inputView} >
//         <TextInput  
//           secureTextEntry
//           style={styles.inputText}
//           placeholder="Password" 
//           placeholderTextColor="#003f5c"
//           onChangeText={text => this.setState({password:text})}/>
//       </View>
//       <TouchableOpacity>
//         <Text style={styles.forgot}>Forgot Password?</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate("VolunteerNavigator")} style={styles.loginBtn}>
//         <Button title="VOLUNTEER LOG IN" color="#264653" onPress={() => navigation.navigate("VolunteerNavigator")}/>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate("HomePage")} style={styles.loginBtn}>
//         <Button title="REQUESTOR LOG IN" color="#264653" onPress={() => navigation.navigate("HomePage")}/>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.signUpBtn}>
//         <Text style={styles.loginText}>SIGN UP</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// export default Registration;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#2A9D8F",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   logo:{
//     fontWeight:"bold",
//     fontSize:50,
//     color:"#FFFFFF",
//     marginBottom:40
//   },
//   inputView:{
//     width:"80%",
//     backgroundColor:"#40877E",
//     borderRadius:25,
//     height:50,
//     marginBottom:20,
//     justifyContent:"center",
//     padding:20
//   },
//   inputText:{
//     height:50,
//     color:"white"
//   },
//   forgot:{
//     color:"white",
//     fontSize:11
//   },
//   loginBtn:{
//     width:"80%",
//     backgroundColor:"#264653",
//     borderRadius:25,
//     height:50,
//     alignItems:"center",
//     justifyContent:"center",
//     marginTop:30,
//     marginBottom:10
//   },
//   loginText:{
//     color:"#264653"
//   },
//   signUpBtn:{
//     width:"80%",
//     backgroundColor:"#FFFFFF",
//     borderRadius:25,
//     height:50,
//     alignItems:"center",
//     justifyContent:"center",
//     marginBottom:10
//   },
// });

