import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MetropolisRegularText from './Text/MetropolisRegularText';
import color from './color';

export const CourseDetailRowItem = props => {
  const {iconName, iconColor, text, style} = props;
  return (
    <View
      style={{
        ...styles.container,
        ...style,
      }}>
      <Icon name={iconName} size={18} color={iconColor ?? color.black} />
      <MetropolisRegularText style={styles.text}>{text}</MetropolisRegularText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  text: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    lineHeight: 17,
  },
});

export default CourseDetailRowItem;
