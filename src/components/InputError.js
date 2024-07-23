import React from 'react';
import {theme} from '../constants';
import {Text} from 'react-native';
// import {Icon} from "@ui-kitten/components"

export const showError = err => {
  return (
    <Text style={{color: theme.colors.danger}}>
      {/* <Icon name='alert-circle-outline'/> */}
      {err}
    </Text>
  );
};
