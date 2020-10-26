import React from "react";
import { Header } from 'react-native-elements';
import { StyleSheet, Text, SafeAreaView, ScrollView, Picker, View } from 'react-native';
import Constants from 'expo-constants';

function PastJobs() {
  return (
    <SafeAreaView style={styles.container}>
        <Header
          backgroundColor="#2A9D8F"
          centerComponent={{text: 'Past Jobs', style: {color: '#fff'}}}
        />
        <View style={styles.scrollView}>
            <View style={styles.scrollBar}>
                <Text style={styles.whiteHeadingOne}>Yard Work</Text>
            </View>
            <View style={styles.jobLabel}>
                <Text style={styles.blackHeadingOne}>Lawn Mowing</Text>
                <Text style={styles.smallText}>September 7, 2020</Text>
                <Text style={styles.smallText}>August 16, 2020</Text>
                <Text style={styles.smallText}>July 23, 2020</Text>
            </View>
            <View style={styles.jobLabel}>
                <Text style={styles.blackHeadingOne}>Watering Plants</Text>
                <Text style={styles.smallText}>September 15, 2020</Text>
                <Text style={styles.smallText}>August 31, 2020</Text>
                <Text style={styles.smallText}>August 17, 2020</Text>
            </View>
            <View style={styles.jobLabel}>
                <Text style={styles.blackHeadingOne}>Weeding</Text>
                <Text style={styles.smallText}>September 18, 2020</Text>
                <Text style={styles.smallText}>August 24, 2020</Text>
                <Text style={styles.smallText}>August 2, 2020</Text>
            </View>
            <View style={styles.scrollBar}>
                <Text style={styles.whiteHeadingOne}>Pet Care</Text>
            </View>
            <View style={styles.jobLabel}>
                <Text style={styles.blackHeadingOne}>Dog Walking</Text>
                <Text style={styles.smallText}>September 20, 2020</Text>
                <Text style={styles.smallText}>August 8, 2020</Text>
                <Text style={styles.smallText}>July 17, 2020</Text>
            </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  whiteHeadingOne: {
    fontSize: 30,
    color: "#fff",
    padding: 5,
    paddingLeft: 10
  },
  blackHeadingOne: {
    fontSize: 30,
  },
  numberLabel: {
    fontSize: 42,
    padding: 10,
    color: '#fff',
    textAlign: 'center'
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100/2,
    backgroundColor: "#264653",
    padding: 10
  },
  jobLabel: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    backgroundColor: "#EEEEEE",
    padding: 10,
    marginTop: 10
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
  },
  mediumText: {
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10
  },
  scrollBar: {
    width: '100%',
    height: 50,
    backgroundColor: "#6e6e6e",
    marginTop: 10,
  }
});

export default PastJobs;