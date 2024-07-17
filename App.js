import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

export default function App() {
  const pressed = useSharedValue(false);
  const offset = useSharedValue(0);

  const pan = Gesture.Pan()
  .onBegin(()=>{
    pressed.value = true;
  })
  .onChange((event)=>{
    offset.value = event.translationX;
  })
  .onFinalize(()=>{
    offset.value = withSpring(0);
    pressed.value = false;
  })

  // const tap = Gesture.Tap()
  //   .onBegin(() => {
  //     pressed.value = true;
  //   })
  //   .onFinalize(() => {
  //     pressed.value = false;
  //   });

  const animatedStyles = useAnimatedStyle(()=>({
    backgroundColor: pressed.value ? '#FFE04B': '#B58DF1',
    transform: [
      {translateX: offset.value},
      {scale: withTiming(pressed.value ? 1.2: 1, {duration: 1000})}
    ]
  }))

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.circle, animatedStyles]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  circle: {
    height: 120,
    width: 120,
    borderRadius: 500,
  },
});