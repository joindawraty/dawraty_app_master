import React from 'react';
import {Text} from 'react-native';
import {fonts} from '../../constants';

const MetropolisBoldItalicText = props => {
  const {style, ...restProps} = props;
  return (
    <Text
      style={[style, {fontFamily: fonts.MetropolisBoldItalic}]}
      {...restProps}
    />
  );
};

export default MetropolisBoldItalicText;
