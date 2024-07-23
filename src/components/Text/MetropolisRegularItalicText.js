import React from 'react';
import {Text} from 'react-native';
import {fonts} from '../../constants';

const MetropolisRegularItalicText = props => {
  const {style, ...restProps} = props;
  return (
    <Text
      style={[style, {fontFamily: fonts.MetropolisRegularItalic}]}
      {...restProps}
    />
  );
};

export default MetropolisRegularItalicText;
