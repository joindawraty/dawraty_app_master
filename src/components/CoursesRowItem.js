import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useTranslation} from 'react-i18next';

import MetropolisSemiBoldText from './Text/MetropolisSemiBoldText';
import MetropolisRegularText from './Text/MetropolisRegularText';
import MetropolisLightText from './Text//MetropolisLightText';
import SmallIconBtn from './SmallIconBtn';
import MyImage from './MyImage';

import color from './color';
import SmallRoundedBtn from './SmallRoundedButton';

const CoursesRowItem = props => {
  const {
    id,
    title,
    image,
    instructorName,
    newPrice,
    oldPrice,
    country_id,
    isWhitelisted,
    onPress,
    isFree,
    isPurchased,
    onSale,
    onWishlistPress,
    onCartPress,
  } = props;

  const {t} = useTranslation();

  return (
    <TouchableOpacity key={id} onPress={onPress} style={styles.container}>
      <MyImage source={image} style={styles.addPhoto} resizeMode="cover" />
      <View style={styles.contentContainer}>
        <MetropolisSemiBoldText numberOfLines={2} style={styles.titleText}>
          {title}
        </MetropolisSemiBoldText>
        <MetropolisRegularText style={styles.instructorText}>
          {instructorName}
        </MetropolisRegularText>
        <View style={{flex: 1, marginTop: 4}}>
          {isPurchased ? (
            ''
          ) : isFree ? (
            <MetropolisSemiBoldText
              style={{
                color: oldPrice ? 'red' : color.blue,
                fontSize: 15,
              }}>
              {t('common.free')}
            </MetropolisSemiBoldText>
          ) : !onSale ? (
            <MetropolisSemiBoldText
              style={{
                color: oldPrice ? 'red' : color.blue,
                fontSize: 15,
              }}>
              {country_id === 112
                ? t('course.price_in_kd', {price: oldPrice})
                : t('course.price_in_bd', {price: oldPrice})}
            </MetropolisSemiBoldText>
          ) : (
            <>
              <MetropolisSemiBoldText
                style={{
                  color: oldPrice ? 'red' : color.blue,
                  fontSize: 15,
                }}>
                {country_id === 112
                  ? t('course.price_in_kd', {price: newPrice})
                  : t('course.price_in_bd', {price: newPrice})}
              </MetropolisSemiBoldText>
              {oldPrice ? (
                <MetropolisLightText
                  style={{
                    color: color.grey,
                    textDecorationLine: 'line-through',
                    fontSize: 12,
                  }}>
                  {country_id === 112
                    ? t('course.price_in_kd', {price: oldPrice})
                    : t('course.price_in_bd', {price: oldPrice})}
                </MetropolisLightText>
              ) : null}
            </>
          )}
        </View>
        {isPurchased ? (
          <SmallRoundedBtn
            text={t('common.continueLearning')}
            onPress={onPress}
            containerStyle={{
              width: '95%',
              backgroundColor: color.blue,
              alignSelf: 'center',
              paddingVertical: 10,
              marginLeft: -10,
              marginTop: 10,
            }}
            textStyle={{
              color: color.white,
              fontSize: 14,
            }}
          />
        ) : (
          <View style={styles.BtnsContainer}>
            <SmallIconBtn
              iconName="cart"
              iconColor={color.white}
              containerStyle={styles.cartBtnContainer}
              onPress={onCartPress}
            />
            <SmallIconBtn
              iconColor={color.blue}
              containerStyle={styles.btnContainer}
              iconName={isWhitelisted ? 'heart' : 'heart-outline'}
              iconSize={20}
              onPress={onWishlistPress}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    marginTop: 20,
    marginRight: 0,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: color.white,
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addPhoto: {
    height: widthPercentageToDP('35%'),
    resizeMode: 'contain',
    width: widthPercentageToDP('38%'),
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
  },
  titleText: {
    fontSize: 15,
  },
  instructorText: {
    fontSize: 12,
    marginTop: 15,
  },
  priceContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  oldPriceText: {
    color: color.grey,
    textDecorationLine: 'line-through',
    fontSize: 12,
  },
  BtnsContainer: {flexDirection: 'row', marginVertical: 10},
  cartBtnContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: color.blue,
    backgroundColor: color.blue,
  },
  btnContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: color.blue,
  },
});

export default CoursesRowItem;
