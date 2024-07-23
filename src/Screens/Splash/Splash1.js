import React, {useCallback, useContext, useEffect, useRef} from 'react';
import {StatusBar, View, Image, StyleSheet, Platform} from 'react-native';
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';

import MetropolisMediumText from '../../components/Text/MetropolisMediumText';

import RoutePaths from '../../util/RoutePaths';
import {slider} from '../../constants/images';
import color from '../../components/color';
import {useSelector} from 'react-redux';

function Splash1() {
  const navigation = useNavigation();
  const appState = useSelector(state => state.app);
  const focusRef = useRef(true);

  useFocusEffect(
    useCallback(() => {
      focusRef.current = true;
      return () => {
        focusRef.current = false;
      };
    }, []),
  );

  useEffect(() => {
    if (focusRef.current) {
      var screenName = RoutePaths.home;
      if (appState && !appState.isOnboardingCompleted) {
        screenName = RoutePaths.Onboarding;
      }
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: screenName}],
          }),
        );
      }, 1000);
    }
  }, [appState, navigation]);

  return (
    <View style={styles.flex}>
      <StatusBar backgroundColor={color.blue} barStyle={'light-content'} />
      <View
        style={{
          backgroundColor: color.blue,
          height: 250,
          width: '100%',
          borderBottomLeftRadius: 200000,
        }}
      />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={slider.logo}
            style={{height: 70, width: 120, resizeMode: 'cover'}}
          />
          <MetropolisMediumText
            style={{fontSize: 24, color: '#000', marginTop: 5}}>
            {'DAWARTY'}
          </MetropolisMediumText>
          <MetropolisMediumText style={{fontSize: 10, color: '#000'}}>
            {'E-LEARNING COURSE APP'}
          </MetropolisMediumText>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          backgroundColor: color.skyBlue,
          height: 250,
          width: '100%',
          borderTopRightRadius: 300,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1},
  safeAreaView: {flex: 1, backgroundColor: '#fff'},
});

export default Splash1;
