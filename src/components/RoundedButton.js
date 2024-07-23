import React from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import color from './color';
import Icon from 'react-native-vector-icons/Ionicons';
import MetropolisBoldText from './Text/MetropolisBoldText';
import MetropolisMediumText from './Text/MetropolisMediumText';

const RoundedButton = props => {
  const {
    bordered,
    bgColor,
    textColor,
    text,
    onPress,
    style,
    textStyle,
    isLoading,
    iconName,
    light,
  } = props;
  const TextComponent = light ? MetropolisMediumText : MetropolisBoldText;
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={onPress}
      style={{
        borderWidth: bordered ? 1 : 0,
        backgroundColor: bgColor ?? color.blue,
        alignItems: 'center',
        justifyContent: 'center',
        ...styles.container,
        ...style,
      }}>
      {isLoading ? (
        <ActivityIndicator size={'small'} color={textColor ?? color.white} />
      ) : (
        <View style={styles.iconAndTextContainer}>
          {iconName ? (
            <Icon name={iconName} size={20} color={textColor ?? color.white} />
          ) : null}
          <TextComponent
            style={{
              ...styles.text,
              color: textColor ?? color.white,
              marginLeft: iconName ? 8 : 0,
              ...textStyle,
            }}>
            {text}
          </TextComponent>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 5,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconAndTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    paddingVertical: 15,
  },
});

export default RoundedButton;
