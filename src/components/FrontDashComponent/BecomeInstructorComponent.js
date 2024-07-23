import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import MetropolisMediumText from '../Text/MetropolisMediumText';
import MetropolisRegularText from '../Text/MetropolisRegularText';

import images, {slider} from '../../constants/images';
import color from '../color';
import SmallRoundedBtn from '../SmallRoundedButton';
import RoutePaths from '../../util/RoutePaths';
import {appConstants} from '../../constants';
import {useTranslation} from 'react-i18next';

const DashboardAd = props => {
  const {title, message, btnText, onPress, rightImg, backgroundColor} = props;
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: backgroundColor ?? color.themeYellow},
      ]}>
      <View style={styles.leftContainer}>
        <View>
          <MetropolisMediumText style={styles.titleTxt}>
            {title}
          </MetropolisMediumText>
          <MetropolisRegularText style={styles.messageTxt}>
            {message}
          </MetropolisRegularText>
        </View>
        <SmallRoundedBtn
          text={btnText}
          onPress={onPress}
          containerStyle={{}}
          textStyle={{}}
        />
      </View>
      {rightImg ?? null}
    </View>
  );
};

const BecomeInstructorComponent = () => {
  const navigation = useNavigation();
  const {i18n} = useTranslation();

  return (
    <View style={{}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(RoutePaths.register, {
            type: appConstants.Instructor,
          });
        }}
        style={styles.bannerContainer}>
        <Image
          source={
            i18n.language === 'ar'
              ? images.slider.ic_become_instructor_ar
              : images.slider.ic_become_instructor_en
          }
          resizeMode="contain"
          style={styles.bannerImage}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(RoutePaths.register, {
            type: appConstants.Student,
          });
        }}
        style={styles.bannerContainer}>
        <Image
          source={
            i18n.language === 'ar'
              ? images.slider.ic_become_student_ar
              : images.slider.ic_become_student_en
          }
          resizeMode="contain"
          style={styles.bannerImage}
        />
      </TouchableOpacity>
      {/* <DashboardAd
        title={t('common.becomeAnInstructor')}
        message={
          'Top instructor from around the world teach millions of students here.'
        }
        btnText={'Start Teaching Today'}
        onPress={() => {
          navigation.navigate(RoutePaths.register, {
            type: appConstants.Instructor,
          });
        }}
        rightImg={
          <Image source={slider.slider3} style={{height: 100, width: '50%'}} />
        }
      /> */}
      {/* <DashboardAd
        title={t('common.register')}
        message={
          'Create an account to get access to our courses and get courses recommendations based on your likes.'
        }
        btnText={t('common.signUpLong')}
        onPress={() => {
          navigation.navigate(RoutePaths.register, {
            type: appConstants.Student,
          });
        }}
        rightImg={
          <Image source={slider.slider3} style={{height: 100, width: '30%'}} />
        }
        backgroundColor={color.purple}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  bannerContainer: {
    width: '100%',
    aspectRatio: 32 / 15,
    borderRadius: 10,
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: color.themeYellow,
    flexDirection: 'row',
    padding: 15,

    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  titleTxt: {
    fontSize: 15,
    color: '#000',
  },
  messageTxt: {
    marginTop: 10,
    marginBottom: 10,
    color: '#000',
    fontSize: 12,
  },
  btnText: {
    fontSize: 12,
    color: color.white,
    textAlign: 'center',
  },
});

export default BecomeInstructorComponent;
