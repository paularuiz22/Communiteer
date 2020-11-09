import { StyleSheet } from "react-native";
import Constants from 'expo-constants';


export default StyleSheet.create({
    requestors: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 5
      },
      container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
      },
      scrollView: {
        marginHorizontal: 10,
      },
      headingOne: {
        fontSize: 30,
        padding: 10
      },
      numberLabel: {
        fontSize: 30,
        padding: 10,
        color: '#fff',
        textAlign: 'center'
      },
      circle: {
        width: 75,
        height: 75,
        borderRadius: 75/2,
        backgroundColor: "#264653",
        padding: 10
      },
      requestor: {
        alignItems: 'center',
        borderWidth: 2,
        backgroundColor: '#f9f9f9',
        borderColor: '#ddd',
      },
      jobLabel: {
        flex: 1,
        fontSize: 30,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "white",
        padding: 10
      },
      jobLabelTitle: {
        fontSize: 24,
      },
      typeLabel: {
        width: 100,
        height: 25,
        borderRadius: 10,
        backgroundColor: "#FF9B21",
        padding: 10
      },
      smallText: {
        fontSize: 12,
        color: "#fff",
        textAlign: "center",
        textAlignVertical: "center"
      },
      mediumText: {
        fontSize: 18,
      },
      row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10
      },
      
});