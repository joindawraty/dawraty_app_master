import React from 'react';
import {Text} from 'react-native';
import {fonts} from '../../constants';

const MetropolisExtraBoldItalicText = props => {
  const {style, ...restProps} = props;
  return (
    <Text
      style={[
        style,
        {fontFamily: fonts.MetropolisExtraBoldItalic},
      ]}
      {...restProps}
    />
  );
};

export default MetropolisExtraBoldItalicText;
