import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';

import MetropolisSemiBoldText from './Text/MetropolisSemiBoldText';
import MetropolisMediumText from './Text/MetropolisMediumText';

import {images} from '../constants';
import color from './color';

const FreeCourseAd = props => {
  const {onPress} = props;
  return (
    <ImageBackground
      source={images.slider.skyblue_banner}
      resizeMode="cover"
      style={styles.container}
      imageStyle={styles.bgImg}>
      <View style={styles.leftContainer}>
        <View>
          <MetropolisMediumText style={styles.titleTxt}>
            {'Get first chapter of our'}
          </MetropolisMediumText>
          <MetropolisSemiBoldText style={styles.messageTxt}>
            {'Exclusive Biostatics'}
          </MetropolisSemiBoldText>
          <MetropolisSemiBoldText style={styles.messageTxt}>
            {'Courses for free'}
          </MetropolisSemiBoldText>
        </View>
        <TouchableOpacity onPress={onPress} style={styles.btn}>
          <MetropolisMediumText style={styles.btnTxt}>
            {'Buy for Free'}
          </MetropolisMediumText>
        </TouchableOpacity>
      </View>
      <Image
        source={images.slider.ic_laptop}
        style={styles.rightImg}
        resizeMode="contain"
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  bgImg: {
    borderRadius: 10,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleTxt: {
    color: color.white,
  },
  messageTxt: {
    marginTop: 5,
    fontSize: 16,
    color: color.white,
  },
  btn: {
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'yellow',
    borderRadius: 5,
  },
  btnTxt: {
    fontSize: 14,
  },
  rightImg: {
    width: 120,
    height: 100,
  },
});

export default FreeCourseAd;
