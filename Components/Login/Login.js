import { StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, View } from 'react-native';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';


const Stack = createStackNavigator();

function Login({navigation}) {
  return (
    // <Stack.Navigator>
    // <Stack.Screen




    <View style={styles.container}>
        <Text style={styles.logo}>Communiteer</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email" 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password" 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.loginBtn}
        onPress={() => navigation.navigate('AssignedJobs')}
        >
          <Text style={styles.loginText}>LOGIN</Text>
          
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
    </View>


    
    // />
    // </Stack.Navigator>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121f1f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#90cc90",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#707878",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#90cc90",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});

