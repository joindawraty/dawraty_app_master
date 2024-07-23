import React from 'react';
import {StyleSheet, View} from 'react-native';

import MetropolisMediumText from './Text/MetropolisMediumText';

const OnboardingActionBtn = props => {
  const {text} = props;
  return (
    <View style={styles.container}>
      <MetropolisMediumText style={styles.text}>{text}</MetropolisMediumText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
  },
  text: {
    fontSize: 16,
  },
});

export default OnboardingActionBtn;
