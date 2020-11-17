import React, { Component } from "react";
import { Text, View } from "react-native";
import { Image, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { db } from '../../config';
import { sortBy } from 'lodash';
import {AuthContext} from "../../AuthContext.js";

class Login extends Component {
    constructor () {
        super();
        this.ref = db.ref('/users');
        this.state = {
            username: '',
            password: '',
            users: '',
            userVerified: false,
            userType: '',
        };
        this.login = this.login.bind(this);
        this.onFooterLinkPress = this.onFooterLinkPress.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    static contextType = AuthContext;

    onFooterLinkPress() {
        this.props.navigation.navigate("Registration");
    };

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
        //console.log('logins : ', this);
        userKeys.forEach((key) => {
            usersProcessed++;
            if ((this.state.users[key].username == this.state.username || this.state.users[key].email == this.state.username) && this.state.users[key].password == this.state.password)
            {
                this.setState({ userVerified: true, userType: this.state.users[key].userType });
                verified = true;
                userType = this.state.users[key].userType;
            }
            if (usersProcessed == userKeys.length)
            {
                if (verified && userType == 'volunteer')
                {
                    this.context.setUsername(this.state.username);
                    this.props.navigation.navigate("VolunteerNavigator");
                }
                else if (verified && userType == 'requestor')
                {
                    this.context.setUsername(this.state.username);
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
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={this.onFooterLinkPress}
                    style={styles.footerLink}>SIGN UP</Text></Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 0,
  },
  container: {
    paddingTop:50,
    flex: 1,
    backgroundColor: "#2A9D8F",
    alignItems: "center",
    justifyContent: "center",
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#FFFFFF",
    flex: 2
  },
  inputView:{
    width:"80%",
    backgroundColor:"#40877E",
    borderRadius:25,
    height:50,
    marginBottom:10,
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
    marginTop: 10,
    marginBottom: 5,
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
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d"
  },
  footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16
  }
});
export default Login;