import React from 'react';
import {Text} from 'react-native';
import {fonts} from '../../constants';

const MetropolisMediumText = props => {
  const {style, ...restProps} = props;
  return (
    <Text
      {...restProps}
      style={[{textAlign: 'left'}, style, {fontFamily: fonts.MetropolisMedium}]}
    />
  );
};

export default MetropolisMediumText;
