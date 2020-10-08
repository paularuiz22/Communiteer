import React from "react";
import { Header } from 'react-native-elements';

function AssignedJobs() {
  return (
    <Header
        backgroundColor="#2A9D8F"
        centerComponent={{text: 'Assigned Jobs', style: {color: '#fff'}}}
        rightComponent={{icon: 'home', color: '#fff'}}
    />
  );
}
export default AssignedJobs;