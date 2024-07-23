import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/Ionicons';
import {Style} from '../assets/Styles/Style';
import AppTextInput from './AppTextInput';

const ConfirmPassword = props => {
  const [show, setShow] = useState(false);

  return (
    <View style={{flexDirection: 'row', marginTop: 0}}>
      <View style={{flexDirection: 'column', flex: 1}}>
        <View style={[{flexDirection: 'row'}, Style.textemail]}>
          <AppTextInput
            placeholder="Re-enter Password"
            value={props.password}
            style={{flex: 1, color: '#000'}}
            autoCapitalize="none"
            onChangeText={text => props.setPassword(text)}
            placeholderTextColor={'#CACACA'}
            secureTextEntry={!show}
          />
          <TouchableOpacity
            onPress={() => setShow(!show)}
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              marginRight: 10,
            }}>
            <Icon
              name={show ? 'eye' : 'eye-off'}
              type="ionicon"
              size={18}
              color="#000"
              style={{color: '#000'}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default ConfirmPassword;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    fontSize: widthPercentageToDP('4%'),
    color: '#FFFFFF',
    fontFamily: 'OpenSans-SemiBold',
  },
});
