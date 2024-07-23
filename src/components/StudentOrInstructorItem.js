import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';

import MetropolisSemiBoldText from './Text/MetropolisSemiBoldText';
import SmallRoundedButton from './SmallRoundedButton';

import color from './color';
import {vh, vw} from '../util/dimenstions';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {appConstants} from '../constants';
import MyImage from './MyImage';
import {useOrientation} from '../util/useOrientation';

const StudentOrInstructorItem = ({title, image, desc, onPress}) => {
  const orientation = useOrientation();
  const {t} = useTranslation();
  const userData = useSelector(state => state.user?.userData);
  return (
    <View
      style={styles.container}
      styles={
        orientation === 'PORTRAIT'
          ? {width: (Dimensions.get('window').width - 45) / 2}
          : {width: (Dimensions.get('window').width - 45) / 2}
      }>
      <MyImage source={image} style={styles.img} />
      <View style={styles.detailsContainer}>
        <MetropolisSemiBoldText style={styles.titleTxt}>
          {title}
        </MetropolisSemiBoldText>
        {/* <MetropolisRegularText style={styles.descTxt}>
        {desc}
      </MetropolisRegularText> */}
      </View>
      <SmallRoundedButton
        text={
          userData?.user?.type === appConstants.Instructor
            ? t('common.sendMessage')
            : t('common.askQuestion')
        }
        onPress={onPress}
        containerStyle={styles.btn}
        textStyle={styles.btnTxt}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    elevation: 5,
    backgroundColor: color.white,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: color.black,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 15,
    marginRight: 15,
    padding: 15,
    width: (Dimensions.get('window').width - 45) / 2,
  },
  img: {
    height: vh(90),
    width: vh(90),
    alignSelf: 'center',
    borderRadius: 1000,
  },
  detailsContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  titleTxt: {
    fontSize: 15,
    marginVertical: 15,
    textAlign: 'center',
    alignSelf: 'center',
  },
  descTxt: {
    fontSize: 12,
  },
  btn: {
    alignSelf: 'center',
    // marginTop: 15,
    borderRadius: 100,
    width: '101%',
  },
  btnTxt: {
    padding: 8,
    fontSize: 12,
  },
});

export default StudentOrInstructorItem;
