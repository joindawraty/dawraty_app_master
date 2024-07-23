// Loader.js
import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {useLoading} from './LoadingContext';
import components from '../../components';
import MetropolisMediumText from '../../components/Text/MetropolisMediumText';

const AppLoader = () => {
  const {isLoading} = useLoading();

  if (!isLoading) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.centerView}>
        <ActivityIndicator color="#ffffff" />
        <MetropolisMediumText style={styles.oldPrice}>
          Loading...
        </MetropolisMediumText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centerView: {
    backgroundColor: components.color.blue,
    padding: 20,
    borderRadius: 15,
  },
  oldPrice: {
    color: components.color.white,
    fontSize: 14,
    marginTop: 20,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppLoader;
