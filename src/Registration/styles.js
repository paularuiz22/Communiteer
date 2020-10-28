import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2A9D8F",
    alignItems: "center",
    justifyContent: "center",
  },
  space: {
    marginTop: 60,
  },
  title:{
    fontWeight:"bold",
    fontSize:25,
    color:"#FFFFFF",
    marginBottom:40
  },
  // logo: {
  //   flex: 1,
  //   height: 120,
  //   width: 90,
  //   alignSelf: "center",
  //   margin: 30
  // },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16
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
  button:{
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
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
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