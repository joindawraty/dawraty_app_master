import React from 'react';
import {Text} from 'react-native';
import {fonts} from '../../constants';

const MetropolisRegularText = props => {
  const {style, ...restProps} = props;
  return (
    <Text
      {...restProps}
      style={[
        {textAlign: 'left'},
        style,
        {fontFamily: fonts.MetropolisRegular},
      ]}
    />
  );
};

export default MetropolisRegularText;
