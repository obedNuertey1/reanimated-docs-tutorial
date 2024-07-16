import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withSpring
} from "react-native-reanimated";
import { View, Button } from "react-native";


export default function App() {
  /*A shared value is a react state which is automagically kept in sync between the javascript and the native side of your app*/
  const translateX = useSharedValue(0);

  const handlePress = () => {
    translateX.value += 50;
  }

  const handlePressNeg = () => {
    translateX.value -= 50;
  }

  const animatedStyles = useAnimatedStyle(()=>({
    transform: [{translateX: withSpring(translateX.value * 2)}],
  }))

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Animated.View
      style={[{
        width: 120,
        height: 120,
        backgroundColor: '#b58df1',
        borderRadius: 20,
        marginVertical: 50
      }, animatedStyles]}
    />
    <View 
    style={{
      marginTop: 20,
      flexDirection: "row",
      gap: 4
    }}
    >
      <Button onPress={handlePress} title="Click me" />
      <Button onPress={handlePressNeg} title="Click me to decrease" />
    </View>
    </View>
  );
}
