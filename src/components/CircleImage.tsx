import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const CircleImage = () => {
  return (
    <View style={CircleImageStyles.container}>
      <Text>Circle Image</Text>
      <Image
        source={{uri: 'https://i.pravatar.cc/100'}}
        style={CircleImageStyles.container}
      />

      <Icon name="add-circle-outline" size={24} color="black" />
    </View>
  );
};

const CircleImageStyles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
