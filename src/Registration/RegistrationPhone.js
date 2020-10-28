import * as React from "react";
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";
import styles from "./styles";

export default function RegistrationPhone({navigation}) {
  const firebaseConfig = {
    apiKey: "AIzaSyAOrcreYt99Sm5lthdeJZ2mlEQ7NxbjBDA",
    authDomain: "communiteer-2020fall.firebaseapp.com",
    databaseURL: "https://communiteer-2020fall.firebaseio.com",
    projectId: "communiteer-2020fall",
    storageBucket: "communiteer-2020fall.appspot.com",
    messagingSenderId: "1091732706602",
    appId: "1:1091732706602:web:5d56786be1011c7cb8fa53",
    measurementId: "G-ZK4DKJGRPT"
  };
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const navigateToHome = () => {
    navigation.navigate("Home");
  };

  // const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
  const [message, showMessage] = React.useState((!firebaseConfig || Platform.OS === "web")
    ? { text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device."}
    : undefined);
  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 20 }}>Enter phone number</Text>
      <View style = {styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="+1 999 999 9999"
          autoFocus
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
        />
      </View>

      <Button
        style = {styles.button}
        title="Send Verification Code"
        disabled={!phoneNumber}
        onPress={async () => {
          // The FirebaseRecaptchaVerifierModal ref implements the
          // FirebaseAuthApplicationVerifier interface and can be
          // passed directly to `verifyPhoneNumber`.
          try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneNumber,
              recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            showMessage({
              text: "Verification code has been sent to your phone.",
            });
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: "red" });
          }
        }}
      />
      <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
      <View style = {styles.inputView}>
        <TextInput
          style={styles.inputText}
          editable={!!verificationId}
          placeholder="123456"
          onChangeText={setVerificationCode}
        />

      </View>
      <Button
        style = {styles.button}
        title="Confirm Verification Code"
        disabled={!verificationId}
        onPress={async () => {
          try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
              verificationId,
              verificationCode
            );
            await firebase.auth().signInWithCredential(credential);
            showMessage({ text: "Phone authentication successful 👍" });
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: "red" });
          }
        }}
      />
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <View style={styles.footerView}>
        <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
      </View>

      {message ? (
        <TouchableOpacity
          style={[StyleSheet.absoluteFill, { backgroundColor: 0xffffffee, justifyContent: "center" }]}
          onPress={() => showMessage(undefined)}>
          <Text style={{color: message.color || "blue", fontSize: 17, textAlign: "center", margin: 20, }}>
            {message.text}
          </Text>
        </TouchableOpacity>
      ) : undefined}
    </View>
  );
}

