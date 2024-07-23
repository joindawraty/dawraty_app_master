import React from 'react';
import {Text} from 'react-native';
import {fonts} from '../../constants';

const MetropolisExtraBoldText = props => {
  const {style, ...restProps} = props;
  return (
    <Text
      style={[style, {fontFamily: fonts.MetropolisExtraBold}]}
      {...restProps}
    />
  );
};

export default MetropolisExtraBoldText;
