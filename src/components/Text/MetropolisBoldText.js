import React from 'react';
import {Text} from 'react-native';
import {fonts} from '../../constants';

const MetropolisBoldText = props => {
  const {style, ...restProps} = props;
  return (
    <Text
      style={[{textAlign: 'left'}, style, {fontFamily: fonts.MetropolisBold}]}
      {...restProps}
    />
  );
};

export default MetropolisBoldText;
