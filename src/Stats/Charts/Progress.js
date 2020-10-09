import React from "react";
import { ProgressCircle } from "react-native-svg-charts";
import { Dimensions, View, } from "react-native";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");


class Points extends React.PureComponent {

  render() {
    return (
      <View>
        <ProgressCircle
          style={ { height: screen.height/2 } }
          progress={ 0.7 }
          progressColor={"#E76F51"}
          startAngle={ -Math.PI * 0.8 }
          endAngle={ Math.PI * 0.8 }
        />
      </View>
    );
  }
}
export default Points;