import { useRef, useState } from 'react';
import { Text, Animated, Dimensions, SafeAreaView, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';

export default function App() {
  const tomImg = require('./assets/tom.png')
  const jerryImg = require('./assets/jerry.png')
  const screenWidth = Dimensions.get('window').width - 40
  const screenHeight = Dimensions.get('window').height - 40
  const noOfTaps = useRef(Math.floor(Math.random() * 7) + 1)
  const tapRef = useRef(0)
  const [taps, setTaps] = useState(0)

  const tomAnim = useRef(new Animated.ValueXY({
    x: 50,
    y: 50
  })).current

  const jerry1Anim = useRef(new Animated.ValueXY({
    x: Math.floor(50 + Math.random() * (screenWidth - 50)),
    y: Math.floor(100 + Math.random() * (screenHeight - 100))
  })).current
  const jerry2Anim = useRef(new Animated.ValueXY({
    x: Math.floor(50 + Math.random() * (screenWidth - 50)),
    y: Math.floor(100 + Math.random() * (screenHeight - 100)),
  })).current
  const jerry3Anim = useRef(new Animated.ValueXY({
    x: Math.floor(50 + Math.random() * (screenWidth - 50)),
    y: Math.floor(100 + Math.random() * (screenHeight - 100)),
  })).current

  const onPress = (evt) => {
    var x = evt.nativeEvent.pageX || evt.nativeEvent.locationX
    var y = evt.nativeEvent.pageY || evt.nativeEvent.locationY
    console.log(x, y)
    Animated.timing(tomAnim, {
      toValue: {
        x: x - 60,
        y: y - 50
      },
      duration: 500,
      useNativeDriver: false
    }).start()
  }

  const jerryMove = (jerryAnim) => {
    return Animated.timing(jerryAnim, {
      toValue: {
        x: 40 + Math.floor(Math.random() * (screenWidth - 40)) - 40,
        y: 40 + Math.floor(Math.random() * (screenHeight - 40)) - 40
      },
      duration: 500,
      useNativeDriver: false
    })
  }

  const onPressJerry = (evt) => {
    console.log('Jerry pressed', evt.nativeEvent.pageX, evt.nativeEvent.pageY)
    Animated.parallel([jerryMove(jerry1Anim), jerryMove(jerry2Anim), jerryMove(jerry3Anim)]).start()
  }

  const onMove = () => {
    console.log('onMove', tomAnim)
  }

  const onRelease = () => {
    console.log('onRelease', tomAnim)
  }

  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

  return (
    <SafeAreaView style={styles.container}
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      onResponderGrant={onPress}
      onResponderMove={onMove}
      onResponderRelease={onRelease}
    >
      <Animated.Image source={tomImg} style={{
        width: 118,
        height: 100,
        position: 'absolute',
        top: tomAnim.y,
        left: tomAnim.x
      }} />
      <AnimatedTouchableOpacity style={{
        width: 75,
        height: 72,
        position: 'absolute',
        top: jerry1Anim.y,
        left: jerry1Anim.x,
        zIndex: 1000
      }} onPress={(evt) => {
        tapRef.current += 1
        if (tapRef.current < noOfTaps.current) {
          onPressJerry(evt)
        }
        onPress(evt)
      }}
      >
        <Image source={jerryImg} style={{
          width: 75,
          height: 72,
        }}
        />
      </AnimatedTouchableOpacity>
      <AnimatedTouchableOpacity style={{
        width: 75,
        height: 72,
        position: 'absolute',
        top: jerry2Anim.y,
        left: jerry2Anim.x,
        zIndex: 1000
      }} onPress={(evt) => {
        tapRef.current += 1
        if (tapRef.current < noOfTaps.current) {
          onPressJerry(evt)
        }
        onPress(evt)
      }}>
        <Image source={jerryImg} style={{
          width: 75,
          height: 72,
        }}
        />
      </AnimatedTouchableOpacity>
      <AnimatedTouchableOpacity style={{
        width: 75,
        height: 72,
        position: 'absolute',
        top: jerry3Anim.y,
        left: jerry3Anim.x,
        zIndex: 1000
      }} onPress={(evt) => {
        tapRef.current += 1
        if (tapRef.current < noOfTaps.current) {
          onPressJerry(evt)
        }
        onPress(evt)
      }}>
        <Image source={jerryImg} style={{
          width: 75,
          height: 72,
        }}
        />
      </AnimatedTouchableOpacity>
      <Text style={styles.text}>No of Taps: {noOfTaps.current}</Text>
      {/* <Text style={styles.text2}>Taps: {taps}</Text> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  text: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  text2: {
    position: 'absolute',
    right: 10,
    bottom: 10
  }
});
