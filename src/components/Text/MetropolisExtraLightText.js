import React from 'react';
import {Text} from 'react-native';
import {fonts} from '../../constants';

const MetropolisExtraLightText = props => {
  const {style, ...restProps} = props;
  return (
    <Text
      style={[style, {fontFamily: fonts.MetropolisExtraLight}]}
      {...restProps}
    />
  );
};

export default MetropolisExtraLightText;
