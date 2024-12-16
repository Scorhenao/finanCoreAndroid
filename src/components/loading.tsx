import React, {useEffect, useRef} from 'react';
import {View, Text, Animated} from 'react-native';
import {LoadingStyles} from '../css/LoadingStyles';

const Loading = () => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ).start();
  }, [rotation]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={LoadingStyles.container}>
      <Animated.View
        style={[LoadingStyles.animatedContainer, {transform: [{rotate}]}]}>
        <Text style={LoadingStyles.icon}>$</Text>
      </Animated.View>
      <Text style={LoadingStyles.loadingText}>Loading...</Text>
    </View>
  );
};

export default Loading;
