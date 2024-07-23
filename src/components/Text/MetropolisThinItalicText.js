import React from 'react';
import {Text} from 'react-native';
import {fonts} from '../../constants';

const MetropolisThinItalicText = props => {
  const {style, ...restProps} = props;
  return (
    <Text
      style={[style, {fontFamily: fonts.MetropolisThinItalic}]}
      {...restProps}
    />
  );
};

export default MetropolisThinItalicText;
