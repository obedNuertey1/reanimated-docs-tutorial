// Experimenting with useAnimatedProps
import React from 'react';
import {Button, View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming
} from 'react-native-reanimated';
import {Svg, Circle} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function App(){
  const r = useSharedValue(20);

  const handlePress = () => {
    r.value += 10;
  }

  const decreasePress = () => {
    r.value -= 10;
  }

  const animatedProps = useAnimatedProps(()=>({
    r: withTiming(r.value)
  }))

  return (
    <View style={styles.container}>
      <Svg style={styles.svg}>
        <AnimatedCircle 
          cx="50%"
          cy="50%"
          fill="#b58df1"
          animatedProps={animatedProps}
        />
      </Svg>
      <View style={{marginTop: 10, flexDirection: "row", gap: 10}}>
        <Button onPress={handlePress} title="Click me" />
        <Button onPress={decreasePress} title="Click to shrink" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  svg: {
    height: 250,
    width: '100%'
  }
})



/* Experimenting with useAnimatedStyles */
// import Animated, {
//   useSharedValue,
//   withTiming,
//   useAnimatedStyle,
//   Easing,
//   withSpring
// } from "react-native-reanimated";
// import { View, Button } from "react-native";


// export default function App() {
//   /*A shared value is a react state which is automagically kept in sync between the javascript and the native side of your app*/
//   const translateX = useSharedValue(0);

//   const handlePress = () => {
//     translateX.value += 50;
//   }

//   const handlePressNeg = () => {
//     translateX.value -= 50;
//   }

//   const animatedStyles = useAnimatedStyle(()=>({
//     transform: [{translateX: withSpring(translateX.value * 2)}],
//   }))

//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//         flexDirection: "column",
//       }}
//     >
//       <Animated.View
//       style={[{
//         width: 120,
//         height: 120,
//         backgroundColor: '#b58df1',
//         borderRadius: 20,
//         marginVertical: 50
//       }, animatedStyles]}
//     />
//     <View 
//     style={{
//       marginTop: 20,
//       flexDirection: "row",
//       gap: 4
//     }}
//     >
//       <Button onPress={handlePress} title="Click me" />
//       <Button onPress={handlePressNeg} title="Click me to decrease" />
//     </View>
//     </View>
//   );
// }
