import React from 'react';
import {Text} from 'react-native';
import {fonts} from '../../constants';

const MetropolisLightItalicText = props => {
  const {style, ...restProps} = props;
  return (
    <Text
      style={[style, {fontFamily: fonts.MetropolisLightItalic}]}
      {...restProps}
    />
  );
};

export default MetropolisLightItalicText;
