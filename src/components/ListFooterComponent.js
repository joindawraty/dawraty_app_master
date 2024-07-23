import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import MetropolisSemiBoldText from './Text/MetropolisSemiBoldText';
import color from './color';

const ListFooterComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={color.blue} />
      <MetropolisSemiBoldText style={styles.text}>
        Loading...
      </MetropolisSemiBoldText>
    </View>
  );
};

export default ListFooterComponent;

const styles = StyleSheet.create({
  text: {
    color: color.blue,
    marginLeft: 10,
  },
  container: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
