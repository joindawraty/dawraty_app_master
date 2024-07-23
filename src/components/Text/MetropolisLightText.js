import React from 'react';
import {Text} from 'react-native';
import {fonts} from '../../constants';

const MetropolisLightText = props => {
  const {style, ...restProps} = props;
  return (
    <Text style={[style, {fontFamily: fonts.MetropolisLight}]} {...restProps} />
  );
};

export default MetropolisLightText;
