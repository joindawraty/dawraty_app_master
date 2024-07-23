import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SmallIconBtn = props => {
  const {
    iconName,
    backgroundColor,
    iconColor,
    iconSize,
    onPress,
    containerStyle,
    iconStyle,
  } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        backgroundColor && {backgroundColor: backgroundColor},
        containerStyle,
      ]}>
      <Icon
        name={iconName}
        style={iconStyle}
        size={iconSize ?? 22}
        color={iconColor ?? '#fff'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SmallIconBtn;
