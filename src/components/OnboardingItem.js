import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import {normalize, screenHeight, vh, vw} from '../util/dimenstions';

const OnboardingItem = props => {
  const {image} = props;

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={image} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  img: {
    flex: 1,
  },
  text: {
    marginTop: 20,
    fontSize: normalize(18),
    textAlign: 'center',
    lineHeight: vh(25),
  },
});

export default OnboardingItem;
