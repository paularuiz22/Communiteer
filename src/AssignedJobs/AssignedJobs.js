import React, {useState} from "react";
import { Header } from 'react-native-elements';
import { StyleSheet, Text, SafeAreaView, ScrollView, Picker, View } from 'react-native';
import Constants from 'expo-constants';

function AssignedJobs() {
  const [selectedValue, setSelectedValue] = useState("alljobs");
  return (
    <SafeAreaView style={styles.container}>
        <Header
            backgroundColor="#2A9D8F"
            centerComponent={{text: 'Assigned Jobs', style: {color: '#fff'}}}
            rightComponent={{icon: 'home', color: '#fff'}}
        />
        <ScrollView style={styles.scrollView}>
            <Text style={styles.headingOne}>September</Text>
            <View style={styles.row}>
                <View style={styles.circle}>
                    <Text style={styles.numberLabel}>26</Text>
                </View>
                <View style={styles.jobLabel}>
                    <Text style={styles.jobLabelTitle}>Mow Catherine's Lawn</Text>
                    <Text style={styles.mediumText}>3pm - 5pm</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.circle}>
                    <Text style={styles.numberLabel}>27</Text>
                </View>
                <View style={styles.jobLabel}>
                    <Text style={styles.jobLabelTitle}>Walk Paula's Dog</Text>
                    <Text style={styles.mediumText}>3pm - 5pm</Text>
                </View>
            </View>
            <Text style={styles.headingOne}>October</Text>
            <View style={styles.row}>
                <View style={styles.circle}>
                    <Text style={styles.numberLabel}>7</Text>
                </View>
                <View style={styles.jobLabel}>
                    <Text style={styles.jobLabelTitle}>Organize Clara's Books</Text>
                    <Text style={styles.mediumText}>2pm - 3pm</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.circle}>
                    <Text style={styles.numberLabel}>15</Text>
                </View>
                <View style={styles.jobLabel}>
                    <Text style={styles.jobLabelTitle}>Clean Quinten's Patio</Text>
                    <Text style={styles.mediumText}>4:30pm - 5:30pm</Text>
                </View>
            </View>
            <Text style={styles.headingOne}>November</Text>
            <View style={styles.row}>
                <View style={styles.circle}>
                    <Text style={styles.numberLabel}>9</Text>
                </View>
                <View style={styles.jobLabel}>
                    <Text style={styles.jobLabelTitle}>Buy Dog Food for Paula</Text>
                    <Text style={styles.mediumText}>3pm - 3:30pm</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.circle}>
                    <Text style={styles.numberLabel}>17</Text>
                </View>
                <View style={styles.jobLabel}>
                    <Text style={styles.jobLabelTitle}>Sweep Quinten's Porch</Text>
                    <Text style={styles.mediumText}>5pm - 5:45pm</Text>
                </View>
            </View>
            <View style={styles.magnifyingGlass}>
                <View style={styles.magnifyingGlassCircle}/>
                <View style={styles.magnifyingGlassStick} />
            </View>
        </ScrollView>
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
  jobLabel: {
    width: 270,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#EEEEEE",
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

export default AssignedJobs;
