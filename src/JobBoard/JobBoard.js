import React from "react";
import { Header } from 'react-native-elements';

function JobBoard() {
  return (
    <Header
      backgroundColor="#2A9D8F"
      centerComponent={{text: 'Job Board', style: {color: '#fff'}}}
      rightComponent={{icon: 'home', color: '#fff'}}
    />
  );
}
export default JobBoard;