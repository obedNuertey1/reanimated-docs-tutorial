import React from 'react';
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import {Gesture, GestureDetector, GestureHandlerRootView} from 'react-native-gesture-handler';

const SIZE = 120;
const BOUNDARY_OFFSET = 50;

export default function App(){
  const offset = useSharedValue(0);
  const width = useSharedValue(0);

  const onLayout = (event)=>{
    width.value = event.nativeEvent.layout.width;
  }
  const pan = Gesture.Pan()
  .onChange((event)=>{
    offset.value += event.changeX;
  })
  .onFinalize((event)=>{
    offset.value = withDecay({
      velocity: event.velocityX,
      rubberBandEffect: true,
      clamp: [
        -(width.value / 2) + SIZE / 2 + BOUNDARY_OFFSET,
        width.value / 2 - SIZE / 2 - BOUNDARY_OFFSET
      ],
    })
  })

  const animatedStyles = useAnimatedStyle(()=>({
    transform: [{translateX: offset.value}],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <View onLayout={onLayout} style={styles.wrapper}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.box, animatedStyles]} />
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
    height: '100%'
  },
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: SIZE,
    width: SIZE,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    cursor: 'grab',
    alignItems: 'center',
    justifyContent: 'center'
  }
})


// import 'react-native-gesture-handler';
// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
//   withTiming,
// } from 'react-native-reanimated';
// import {
//   Gesture,
//   GestureDetector,
//   GestureHandlerRootView,
// } from 'react-native-gesture-handler';

// export default function App() {
//   const pressed = useSharedValue(false);
//   const offset = useSharedValue(0);

//   const pan = Gesture.Pan()
//   .onBegin(()=>{
//     pressed.value = true;
//   })
//   .onChange((event)=>{
//     offset.value = event.translationX;
//   })
//   .onFinalize(()=>{
//     offset.value = withSpring(0);
//     pressed.value = false;
//   })

//   // const tap = Gesture.Tap()
//   //   .onBegin(() => {
//   //     pressed.value = true;
//   //   })
//   //   .onFinalize(() => {
//   //     pressed.value = false;
//   //   });

//   const animatedStyles = useAnimatedStyle(()=>({
//     backgroundColor: pressed.value ? '#FFE04B': '#B58DF1',
//     transform: [
//       {translateX: offset.value},
//       {scale: withTiming(pressed.value ? 1.2: 1, {duration: 1000})}
//     ]
//   }))

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <View style={styles.container}>
//         <GestureDetector gesture={pan}>
//           <Animated.View style={[styles.circle, animatedStyles]} />
//         </GestureDetector>
//       </View>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100%',
//   },
//   circle: {
//     height: 120,
//     width: 120,
//     borderRadius: 500,
//   },
// });