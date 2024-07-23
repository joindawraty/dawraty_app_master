import React from 'react';
import {TouchableOpacity} from 'react-native';

import MetropolisSemiBoldText from '../Text/MetropolisSemiBoldText';

import color from '../color';

export const Item = ({title, index, active, setActive}) => {
  return (
    <TouchableOpacity
      onPress={() => setActive(index)}
      style={{
        paddingHorizontal: 15,
        borderBottomColor: active === index ? color.black : color.white,
        borderBottomWidth: active === index ? 3 : 0,
      }}>
      <MetropolisSemiBoldText
        style={[
          {
            paddingBottom: 10,
          },
        ]}>
        {title}
      </MetropolisSemiBoldText>
    </TouchableOpacity>
  );
};
