import React, { Component } from "react";
import { Text, View } from "react-native";
import { Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Button } from "react-native";
import { db } from '../../config';
import { sortBy } from 'lodash';

class Login extends Component {
    constructor () {
        super();
        this.ref = db.ref('/users');
        this.state = {
            username: '',
            password: '',
            // @Clara: what are you trying to sort with this.ref? I've added what I think you mean as line 11: `this.ref = db.ref('/users');` -Paula
            users: '',
            userVerified: false,
            userType: '',
        };
        this.login = this.login.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        db.ref('/users').orderByChild("username").on('value', querySnapShot => {
            let data = querySnapShot.val() ? querySnapShot.val() : {};
            let userItems = {...data};
            this.setState({
                users: sortBy(userItems, 'username'),
            });
        });
    }

    login() {
        let userKeys = Object.keys(this.state.users);
        var usersProcessed = 0;
        var verified = false;
        var userType = '';
        userKeys.forEach((key) => {
            usersProcessed++;
            if ((this.state.users[key].username == this.state.username || this.state.users[key].email == this.state.username))
            {
                this.setState({ userVerified: true, userType: this.state.users[key].userType });
                verified = true;
                userType = this.state.users[key].userType;
            }
            if (usersProcessed == userKeys.length)
            {
                if (verified && userType == 'volunteer')
                {
                    this.props.navigation.navigate("VolunteerNavigator");
                }
                else if (verified && userType == 'requestor')
                {
                    this.props.navigation.navigate("HomePage");
                }
                else
                {
                    Alert.alert('Invalid username or password');
                }
            }
        })
    }

    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>Communiteer</Text>
                <View>
                    <Image source={require("../img/logo.png")} />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Username or Email"
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({username:text})}/>
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
                <TouchableOpacity onPress={this.login} style={styles.loginBtn}>
                    <Text style={{color: 'white'}}>LOG IN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signUpBtn}>
                    <Text style={styles.loginText}>SIGN UP</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  scrollView: {
      marginHorizontal: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#2A9D8F",
    alignItems: "center",
    justifyContent: "center",
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#FFFFFF",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#40877E",
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
    backgroundColor:"#264653",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:30,
    marginBottom:10
  },
  loginText:{
    color:"#264653"
  },
  signUpBtn:{
    width:"80%",
    backgroundColor:"#FFFFFF",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginBottom:10
  },
});
export default Login;