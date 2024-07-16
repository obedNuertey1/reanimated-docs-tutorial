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
  const width = useSharedValue(100);

  const handlePress = () => {
    width.value = withSpring(width.value + 50);
  }

  const handlePressNeg = () => {
    width.value = withSpring(width.value - 50);
  }

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
      style={{
        width: width,
        height: 100,
        backgroundColor: 'violet',
        borderRadius: 10
      }}
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
