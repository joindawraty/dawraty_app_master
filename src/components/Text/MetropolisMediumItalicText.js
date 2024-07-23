import React from 'react';
import {Text} from 'react-native';
import {fonts} from '../../constants';

const MetropolisMediumItalicText = props => {
  const {style, ...restProps} = props;
  return (
    <Text
      style={[style, {fontFamily: fonts.MetropolisMediumItalic}]}
      {...restProps}
    />
  );
};

export default MetropolisMediumItalicText;
