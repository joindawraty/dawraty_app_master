import React from 'react';
import {Text} from 'react-native';
import {fonts} from '../../constants';

const MetropolisBlackText = props => {
  const {style, ...restProps} = props;
  return (
    <Text style={[style, {fontFamily: fonts.MetropolisBlack}]} {...restProps} />
  );
};

export default MetropolisBlackText;
