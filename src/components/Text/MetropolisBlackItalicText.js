import React from 'react';
import {Text} from 'react-native';
import {fonts} from '../../constants';

const MetropolisBlackItalicText = props => {
  const {style, ...restProps} = props;
  return (
    <Text
      style={[style, {fontFamily: fonts.MetropolisBlackItalic}]}
      {...restProps}
    />
  );
};

export default MetropolisBlackItalicText;
