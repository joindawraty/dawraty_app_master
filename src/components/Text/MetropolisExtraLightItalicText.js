import React from 'react';
import {Text} from 'react-native';
import {fonts} from '../../constants';

const MetropolisExtraLightItalicText = props => {
  const {style, ...restProps} = props;
  return (
    <Text
      style={[
        style,
        {fontFamily: fonts.MetropolisExtraLightItalic},
      ]}
      {...restProps}
    />
  );
};

export default MetropolisExtraLightItalicText;
