import React, {useState} from "react";
import { Header } from 'react-native-elements';
import { StyleSheet, Text, SafeAreaView, ScrollView, Picker, View } from 'react-native';
import Constants from 'expo-constants';

function JobBoard() {
  const [selectedValue, setSelectedValue] = useState("alljobs");
  return (
    <SafeAreaView style={styles.container}>
      <Header
        backgroundColor="#2A9D8F"
        centerComponent={{text: 'Job Board', style: {color: '#fff'}}}
        rightComponent={{icon: 'home', color: '#fff'}}
      />
      <Text style={styles.headingOne}>Job Type</Text>
      <Picker
        selectedValue={selectedValue}
        style={{height:150, width:200}}
        onValueChange={(itemValue, itemIndex) => selectedValue(itemValue)}
      >
        <Picker.Item label="All Jobs" value="alljobs"/>
        <Picker.Item label="Beautification" value="beautification"/>
        <Picker.Item label="Children" value="children"/>
        <Picker.Item label="House Chores" value="housechores"/>
        <Picker.Item label="Pet Care" value="petcare"/>
        <Picker.Item label="Shopping" value="shopping"/>
        <Picker.Item label="Tutoring" value="tutoring"/>
      </Picker>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.headingOne}>September</Text>
        <View style={styles.row}>
            <View style={styles.circle}>
                <Text style={styles.numberLabel}>27</Text>
            </View>
            <View style={styles.jobLabel}>
                <Text style={styles.jobLabelTitle}>Pick-up Groceries</Text>
                <View style={styles.row}>
                    <Text style={styles.mediumText}>4pm - 5pm</Text>
                    <View style={styles.typeLabel}>
                        <Text style={styles.smallText}>Shopping</Text>
                    </View>
                    <Text style={styles.mediumText}>Woodstock, GA</Text>
                </View>
            </View>
        </View>
        <View style={styles.row}>
            <View style={styles.circle}>
                <Text style={styles.numberLabel}>30</Text>
            </View>
            <View style={styles.jobLabel}>
                <Text style={styles.jobLabelTitle}>Walk Dog</Text>
                <View style={styles.row}>
                    <Text style={styles.mediumText}>3pm - 3:30pm</Text>
                    <View style={styles.typeLabel}>
                        <Text style={styles.smallText}>Pet Care</Text>
                    </View>
                    <Text style={styles.mediumText}>Downtown Atlanta, GA</Text>
                </View>
            </View>
        </View>
        <Text style={styles.headingOne}>October</Text>
        <View style={styles.row}>
            <View style={styles.circle}>
                <Text style={styles.numberLabel}>1</Text>
            </View>
            <View style={styles.jobLabel}>
                <Text style={styles.jobLabelTitle}>Vacuum Main Floor</Text>
                <View style={styles.row}>
                    <Text style={styles.mediumText}>2pm - 4pm</Text>
                    <View style={styles.typeLabel}>
                        <Text style={styles.smallText}>House Chores</Text>
                    </View>
                    <Text style={styles.mediumText}>Vinings, GA</Text>
                </View>
            </View>
        </View>
        <View style={styles.row}>
            <View style={styles.circle}>
                <Text style={styles.numberLabel}>2</Text>
            </View>
            <View style={styles.jobLabel}>
                <Text style={styles.jobLabelTitle}>Water Patio Plants</Text>
                <View style={styles.row}>
                    <Text style={styles.mediumText}>9am - 9:30am</Text>
                    <View style={styles.typeLabel}>
                        <Text style={styles.smallText}>House Chores</Text>
                    </View>
                    <Text style={styles.mediumText}>Buckhead, GA</Text>
                </View>
            </View>
        </View>
        <View style={styles.row}>
            <View style={styles.circle}>
                <Text style={styles.numberLabel}>3</Text>
            </View>
            <View style={styles.jobLabel}>
                <Text style={styles.jobLabelTitle}>Decorate for Halloween</Text>
                <View style={styles.row}>
                    <Text style={styles.mediumText}>10am - 12am</Text>
                    <View style={styles.typeLabel}>
                        <Text style={styles.smallText}>House Chores</Text>
                    </View>
                    <Text style={styles.mediumText}>Buckhead, GA</Text>
                </View>
            </View>
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
    width: 300,
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
  }
});

export default JobBoard;