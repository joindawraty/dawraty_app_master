import React from 'react';
import {View} from 'react-native';

import MetropolisMediumText from './Text/MetropolisMediumText';
import AppTextInput from './AppTextInput';

import {Style} from '../assets/Styles/Style';

const InputWithTitle = props => {
  const {title, containerStyle, inputStyle, ...restProps} = props;

  return (
    <View style={containerStyle}>
      {title !== '' && <MetropolisMediumText>{title}</MetropolisMediumText>}
      <AppTextInput style={[Style.textemailsmall, inputStyle]} {...restProps} />
    </View>
  );
};

export default InputWithTitle;
