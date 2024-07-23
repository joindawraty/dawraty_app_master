import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import MetropolisMediumText from './Text/MetropolisMediumText';

import color from './color';

const SmallRoundedBtn = props => {
  const {text, onPress, containerStyle, textStyle} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, containerStyle]}>
      <MetropolisMediumText style={[styles.btnText, textStyle]}>
        {text}
      </MetropolisMediumText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: color.skyBlue,
    alignSelf: 'flex-start',
    borderRadius: 5,
  },
  btnText: {
    fontSize: 12,
    color: color.white,
    textAlign: 'center',
  },
});

export default SmallRoundedBtn;
