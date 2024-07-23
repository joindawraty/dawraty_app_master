import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import color from '../components/color';

const TabBarButton = props => {
  const {onPress, title, focused, iconName} = props;

  const dynamicStyle = {
    color: focused ? color.blue : color.bottom,
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Icon style={dynamicStyle} name={iconName} size={25} />
        <Text
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={[styles.text, dynamicStyle]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'column',
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
  },
  buttonContainer: {
    display: 'flex',
    // flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    flex: 1,
  },
});

export default TabBarButton;
