import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

import MetropolisSemiBoldText from './Text/MetropolisSemiBoldText';

import color from './color';
import MetropolisLightText from './Text/MetropolisLightText';

const CoursePrice = props => {
  const {newPrice, oldPrice, country_id, isFree, onSale, style} = props;

  const {t} = useTranslation();

  return (
    <View style={[styles.container, style]}>
      {isFree ? (
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
  );
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row', marginVertical: 20},
  newPrice: {
    fontSize: 18,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: color.darkGrey,
    fontSize: 16,
    marginHorizontal: 10,
  },
  percentageOff: {
    color: color.darkGrey,
    fontSize: 16,
  },
});

export default CoursePrice;
