import React from "react";
import { Header } from 'react-native-elements';

function PastJobs() {
  return (
    <Header
        backgroundColor="#2A9D8F"
        centerComponent={{text: 'Past Jobs', style: {color: '#fff'}}}
        rightComponent={{icon: 'home', color: '#fff'}}
    />
  );
}
export default PastJobs;