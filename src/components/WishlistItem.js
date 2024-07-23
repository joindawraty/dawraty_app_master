import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import MetropolisSemiBoldText from './Text/MetropolisSemiBoldText';
import MetropolisRegularText from './Text/MetropolisRegularText';
import RoundedButton from './RoundedButton';
import color from './color';
import SmallIconBtn from './SmallIconBtn';
import CoursePrice from './CoursePrice';
import MyImage from './MyImage';
import {getTranslationFromMany} from '../util/misc';

const WishlistItem = props => {
  const {
    imageUri,
    title,
    author,
    newPrice,
    oldPrice,
    isFavorite,
    onPress,
    country_id,
    onAddToCart,
    onFavoriteChange,
    isFree,
    onSale,
    translation,
  } = props;

  const {t} = useTranslation();

  const [favorite, setFavorite] = useState(isFavorite);

  const changeFavoriteHandler = () => {
    if (onFavoriteChange) {
      onFavoriteChange();
    }
    setFavorite(prevState => !prevState);
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <MyImage source={imageUri} style={styles.img} resizeMode="cover" />
      <View style={styles.rightContainer}>
        <MetropolisSemiBoldText style={styles.titleTxt}>
          {t('dynamic', {
            en: title,
            ar: getTranslationFromMany(translation, 'name', title),
          })}
        </MetropolisSemiBoldText>
        <MetropolisRegularText style={styles.authorTxt}>
          {author ? t('courseAuthors.' + author, author) : ''}
        </MetropolisRegularText>
        <CoursePrice
          newPrice={newPrice}
          oldPrice={oldPrice}
          country_id={country_id}
          isFree={isFree}
          onSale={onSale}
          style={{
            flex: 1,
            marginVertical: 0,
            marginTop: 10,
          }}
        />
        {/* <View style={styles.priceContainer}> */}
        {/* <MetropolisSemiBoldText
            style={{color: oldPrice ? color.red : color.blue}}>
            {`KD ${newPrice}`}
          </MetropolisSemiBoldText>
          {oldPrice && (
            <MetropolisMediumText style={styles.oldTxt}>
              {`KD ${oldPrice}`}
            </MetropolisMediumText>
          )} */}
        {/* </View> */}
        <View style={styles.btnContainer}>
          <RoundedButton
            bordered={false}
            bgColor={color.blue}
            textColor={color.white}
            text={t('common.addToCart')}
            onPress={onAddToCart}
            style={styles.addToCartBtn}
            textStyle={styles.addToCartTxt}
            isLoading={false}
            iconName={'cart-outline'}
            light={true}
          />
          <SmallIconBtn
            iconName={favorite ? 'heart' : 'heart-outline'}
            backgroundColor={color.white}
            iconColor={color.skyBlue}
            iconSize={28}
            onPress={changeFavoriteHandler}
            containerStyle={styles.wishlistBtn}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,

    elevation: 5,
    backgroundColor: color.white,
    shadowColor: color.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  img: {
    height: 120,
    width: 120,
    borderRadius: 10,
    marginRight: 10,
  },
  rightContainer: {
    flex: 1,
  },
  titleTxt: {
    fontSize: 15,
  },
  authorTxt: {
    fontSize: 12,
    marginTop: 12,
  },
  priceContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  oldTxt: {
    marginLeft: 8,
    fontSize: 11,
    textDecorationLine: 'line-through',
    textDecorationColor: color.grey,
    color: color.grey,
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  addToCartBtn: {
    maxWidth: 120,
    marginBottom: -1,
  },
  addToCartTxt: {
    fontSize: 12,
    paddingVertical: 10,
  },
  wishlistBtn: {
    marginRight: 0,
  },
});

export default WishlistItem;
