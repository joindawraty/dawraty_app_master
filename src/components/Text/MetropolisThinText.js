import React from 'react';
import {Text} from 'react-native';
import {fonts} from '../../constants';

const MetropolisThinText = props => {
  const {style, ...restProps} = props;
  return (
    <Text
      style={[style, {fontFamily: fonts.MetropolisThin}]}
      {...restProps}
    />
  );
};

export default MetropolisThinText;
