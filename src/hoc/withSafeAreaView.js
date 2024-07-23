import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const withSafeAreaView = WrappedComponent => {
  return props => {
    const {edges = ['bottom'], style, ...restProps} = props;

    const combinedStyle = {flex: 1, ...style};

    return (
      <SafeAreaView edges={edges} style={combinedStyle}>
        <WrappedComponent {...restProps} />
      </SafeAreaView>
    );
  };
};

export default withSafeAreaView;
