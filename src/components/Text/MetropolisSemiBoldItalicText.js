import React from 'react';
import {Text} from 'react-native';
import {fonts} from '../../constants';

const MetropolisSemiBoldItalicText = props => {
  const {style, ...restProps} = props;
  return (
    <Text
      style={[
        style,
        {fontFamily: fonts.MetropolisSemiBoldItalic},
      ]}
      {...restProps}
    />
  );
};

export default MetropolisSemiBoldItalicText;
