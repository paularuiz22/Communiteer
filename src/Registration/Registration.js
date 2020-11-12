import React, { Component } from "react";
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import * as firebase from "firebase";
import { db } from '../../config';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from "react-native-simple-radio-button";
import RadioGroup from 'react-native-radio-button-group';

class Registration extends Component {
    constructor() {
        super();
        this.ref = db.ref('/users');
        this.state = {
            city: '',
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            state: '',
            streetAddress: '',
            userType: 'volunteer',
            username: '',
            zipCode: '',
            radioProps: [{label: "Volunteer", value: 0}, {label: "Requestor", value: 1}]
        }
        this.updateTextInput = this.updateTextInput.bind(this);
        this.createUser = this.createUser.bind(this);
        this.setUserType = this.setUserType.bind(this);
    }

    updateTextInput = (text, field) => {
        const state = this.state;
        state[field] = text;
        this.setState(state);
    }

    setUserType = (value) => {
        if (value == 0)
        {
            this.setState({userType: "volunteer"});
        }
        else
        {
            this.setState({userType: "requestor"});
        }
    }

    createUser() {
        this.ref.push({
            city: this.state.city,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            state: this.state.state,
            streetAddress: this.state.streetAddress,
            trustedUsers: [],
            userType: this.state.userType,
            username: this.state.username,
            zipCode: this.state.zipCode,
        }).then((docRef) => {
            this.setState({
                city: '',
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                state: '',
                streetAddress: '',
                userType: 'volunteer',
                username: '',
                zipCode: ''
            });
            this.props.navigation.goBack();
            console.log('')
        }).catch((error) => {
            console.error("Error adding user: ", error);
        });
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.space}></Text>
                <Text style={styles.title}>Enter User Information</Text>
                <View style = {styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="First Name"
                        onChangeText={(text) => this.updateTextInput(text, 'firstName')}
                        value={this.state.firstName}
                    />
                </View>
                <View style = {styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Last Name"
                        onChangeText={(text) => this.updateTextInput(text, 'lastName')}
                        value={this.state.lastName}
                    />
                </View>
                <View style = {styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email"
                        onChangeText={(text) => this.updateTextInput(text, 'email')}
                        value={this.state.email}
                    />
                </View>
                <View style = {styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Username"
                        onChangeText={(text) => this.updateTextInput(text, 'username')}
                        value={this.state.username}
                    />
                </View>
                <View style = {styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Password"
                        onChangeText={(text) => this.updateTextInput(text, 'password')}
                        value={this.state.password}
                    />
                </View>
                <View style = {styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Street Address"
                        onChangeText={(text) => this.updateTextInput(text, 'streetAddress')}
                        value={this.state.streetAddress}
                    />
                </View>
                <View style = {styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="City"
                        onChangeText={(text) => this.updateTextInput(text, 'city')}
                        value={this.state.city}
                    />
                </View>
                <View style = {styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="State"
                        onChangeText={(text) => this.updateTextInput(text, 'state')}
                        value={this.state.state}
                    />
                </View>
                <View style = {styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Zipcode"
                        onChangeText={(text) => this.updateTextInput(text, 'zipCode')}
                        value={this.state.zipCode}
                    />
                </View>
                <RadioForm
                    radio_props={this.state.radioProps}
                    initial={0}
                    formHorizontal={true}
                    labelHorizontal={false}
                    buttonColor={"#264653"}
                    animation={true}
                    onPress={(value) => { this.setUserType(value); }}
                />
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={this.createUser}>
                    <Text style={{color: 'white'}}>SIGN UP</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Registration;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2A9D8F",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontWeight:"bold",
        fontSize:25,
        color:"#FFFFFF",
        marginBottom:40
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