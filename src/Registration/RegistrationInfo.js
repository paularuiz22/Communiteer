import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from "react-native-simple-radio-button";
import * as firebase from "firebase";
import db from "../firebase.js";

export default function RegistrationInfo({navigation}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  var radio_props = [
    {label: "Volunteer", value: 0 },
    {label: "Requestor", value: 1 }
  ];

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
            navigation.navigate("VolunteerNavigator", {user: data});
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
      <Text style ={styles.title}> Add More Info </Text>
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
      <RadioForm
        radio_props={radio_props}
        initial={0}
        formHorizontal={true}
        labelHorizontal={false}
        buttonColor={"#264653"}
        animation={true}
        onPress={(value) => {this.setState({value:value});}}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => onRegisterPress()}>
        <Text style={styles.buttonTitle}>Create account</Text>
      </TouchableOpacity>
    </View>
  );
}