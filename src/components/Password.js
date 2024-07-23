import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import AppTextInput from './AppTextInput';
import SmallIconBtn from './SmallIconBtn';
import MetropolisRegularText from './Text/MetropolisRegularText';

import color from './color';

const Password = props => {
  const {value, onChangeText} = props;
  const [show, setShow] = useState(false);

  return (
    <>
      <View style={[styles.container, props.container]}>
        <AppTextInput
          placeholder={props.placeholder || 'Password'}
          style={styles.input}
          autoCapitalize="none"
          secureTextEntry={!show}
          value={value}
          onChangeText={onChangeText}
        />
        <SmallIconBtn
          iconName={show ? 'eye' : 'eye-off'}
          iconColor={color.black}
          iconSize={18}
          onPress={() => setShow(prevState => !prevState)}
          containerStyle={styles.eyeIcon}
        />
      </View>
      {props?.error && typeof props?.error === 'string' ? (
        <MetropolisRegularText style={{color: 'red', marginTop: 8}}>
          {props?.error}
        </MetropolisRegularText>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
    paddingEnd: 5,
  },
  input: {
    flex: 1,
    color: '#000',
    justifyContent: 'center',
    marginTop: 0,
  },
  eyeIcon: {
    alignSelf: 'center',
    marginRight: 5,
  },
});

export default Password;
