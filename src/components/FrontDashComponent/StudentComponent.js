import React, {memo} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {useLoading} from '../../context/Loading/LoadingContext';
import useWishlist from '../../hooks/useWishlist';
import useCourses from '../../hooks/useCourses';

import MetropolisSemiBoldText from '../Text/MetropolisSemiBoldText';
import MetropolisRegularText from '../Text/MetropolisRegularText';
import MetropolisMediumText from '../Text/MetropolisMediumText';
import MetropolisLightText from '../Text/MetropolisLightText';
import SmallRoundedBtn from '../SmallRoundedButton';
import SmallIconBtn from '../SmallIconBtn';
import MyImage from '../MyImage';

import color from '../color';
import {images} from '../../constants';
import {BASE_API} from '../../services/API_URI';
import RoutePaths from '../../util/RoutePaths';

import {
  addToCartRequest,
  getCartCountService,
  getCartItemsRequest,
} from '../../redux/actions/cartActions';
import {getTranslationFromMany} from '../../util/misc';
import {successToast} from '../../util/toastUtils';
import {useOrientation} from '../../util/useOrientation';

export const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'First Item',
    image: images.slider.slider3,
    instructor: {
      first_name: 'Khaled',
      last_name: 'Al-Rajhi',
    },
    course_sale: {
      new_price: '55.00',
      old_price: '70.00',
    },
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Second Item',
    instructor: {
      first_name: 'Khaled',
      last_name: 'Al-Rajhi',
    },
    course_sale: {
      new_price: '55.00',
      old_price: '70.00',
    },
    image: images.slider.slider3,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Third Item',
    instructor: {
      first_name: 'Khaled',
      last_name: 'Al-Rajhi',
    },
    course_sale: {
      new_price: '55.00',
      old_price: '70.00',
    },
    image: images.slider.slider3,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d11',
    name: 'Fourth Item',
    instructor: {
      first_name: 'Khaled',
      last_name: 'Al-Rajhi',
    },
    course_sale: {
      new_price: '55.00',
      old_price: '70.00',
    },
    image: images.slider.slider3,
  },
];

const StudentViewingItem = props => {
  const orientation = useOrientation();
  const {
    id,
    title, // item.name
    image,
    instructorName, // `${item.instructor.first_name} ${item.instructor.last_name}`}
    newPrice, // item.course_sale.new_price
    oldPrice, // item.course_sale.old_price
    country_id, //item.courses.country_id
    isWhitelisted, // false
    onPress, // () => navigation.navigate('CourseDetail', {course: item})
    onCartPress,
    onWishlistPress,
    asRow,
    onSale,

    isFree,
    isPurchased,
    onContinueLearning,
    translation,
  } = props;
  const {t} = useTranslation();

  return (
    <Pressable
      key={id}
      onPress={onPress}
      style={{
        flex: 1,
        width: orientation === 'PORTRAIT' ? 240 : 240,
        flexDirection: asRow ? 'row' : 'column',
        marginRight: 20,
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
        marginLeft: 1,
      }}>
      <MyImage
        source={image}
        style={styles.addPhoto}
        styles={
          orientation === 'PORTRAIT'
            ? {width: (Dimensions.get('window').width * 55) / 100}
            : {width: (Dimensions.get('window').width * 55) / 100}
        }
        resizeMode="cover"
      />
      <View
        style={{
          flex: 1,
          marginTop: 10,
          marginLeft: 10,
        }}>
        <MetropolisSemiBoldText
          style={{
            fontSize: 15,
            textAlign: 'left',
          }}>
          {/* {title} */}
          {t('dynamic', {
            en: title,
            ar: getTranslationFromMany(translation, 'name', title),
          })}
        </MetropolisSemiBoldText>
        <MetropolisRegularText
          style={{
            fontSize: 12,
            marginTop: 10,
            textAlign: 'left',
          }}>
          {/* {instructorName} */}
          {instructorName
            ? t('courseAuthors.' + instructorName, instructorName)
            : ''}
        </MetropolisRegularText>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 8,
          }}>
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
        {isPurchased ? (
          <SmallRoundedBtn
            text={t('common.continueLearning')}
            onPress={onContinueLearning}
            containerStyle={{
              width: '95%',
              backgroundColor: color.blue,
              alignSelf: 'center',
              paddingVertical: 10,
              marginLeft: -10,
              marginVertical: 10,
            }}
            textStyle={{
              color: color.white,
              fontSize: 14,
            }}
          />
        ) : (
          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <SmallIconBtn
              iconName="cart"
              iconColor={color.white}
              containerStyle={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: color.blue,
                backgroundColor: color.blue,
              }}
              onPress={onCartPress}
            />
            <SmallIconBtn
              iconColor={color.blue}
              containerStyle={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: color.blue,
              }}
              iconName={isWhitelisted ? 'heart' : 'heart-outline'}
              iconSize={20}
              onPress={onWishlistPress}
            />
          </View>
        )}
      </View>
    </Pressable>
  );
};

const StudentComponent = props => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user?.userData);
  const navigation = useNavigation();
  const {t} = useTranslation();

  const {courses, updateWishlistData} = useCourses();
  const {setIsLoading} = useLoading();
  const {onAddToWishlist, onRemoveWishlist} = useWishlist();

  const onDeleteWishList = async item => {
    try {
      setIsLoading(true);
      const res = await onRemoveWishlist(item.id);
      setIsLoading(false);
      if (res && res.data && res.data.success) {
        updateWishlistData(item, null);
      }
      if (res && res.data && res.data.message) {
        successToast(res.data.message);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(
        '[onDeleteWishList] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
    }
  };

  const onAddWishList = async item => {
    try {
      setIsLoading(true);
      const response = await onAddToWishlist(item.id);
      setIsLoading(false);
      if (response && response.data && response.data.success) {
        updateWishlistData(item, true);
      }
      if (response && response.data && response.data.message) {
        successToast(response.data.message);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(
        '[onAddWishList] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
    }
  };
  const renderItem = (item, index) => (
    <StudentViewingItem
      key={index}
      title={item.name}
      image={{
        uri: BASE_API + item.course_image,
      }}
      instructorName={`${item.instructor.first_name} ${item.instructor.last_name}`}
      newPrice={item.course_sale.new_price}
      oldPrice={item.course_sale.old_price}
      country_id={item.country_id}
      isWhitelisted={item.is_wishlist}
      onPress={() =>
        navigation.navigate(RoutePaths.courseDetails, {
          course: item,
          addWishlist: updateWishlistData.bind(null, item, true),
          removeWishlist: updateWishlistData.bind(null, item, false),
        })
      }
      onCartPress={async () => {
        try {
          setIsLoading(true);
          const addToCartRes = await dispatch(addToCartRequest(item));
          if (userData && addToCartRes.type.includes('fulfilled')) {
            try {
              await Promise.allSettled([
                dispatch(getCartItemsRequest()),
                dispatch(getCartCountService()),
              ]);
            } catch (err) {
              console.log('Error : ', err?.message);
            }
          }
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          console.log(
            '[onCartPress] Error : ',
            err?.response?.data?.message ?? err?.message,
          );
        }
      }}
      onWishlistPress={async () => {
        if (item.is_wishlist) {
          onDeleteWishList(item);
        } else {
          onAddWishList(item);
        }
      }}
      isFree={item?.is_free !== 0}
      isPurchased={item?.is_purchased?.is_purchased}
      // translation={item?.translation}
      onContinueLearning={() => {
        navigation.navigate(RoutePaths.courseFullDetails, {
          courseId: item?.course_sale?.course_id,
        });
      }}
      translation={item?.translation}
      onSale={item?.on_sale}
    />
  );

  if (!courses?.length) {
    return null;
  }

  return (
    <>
      <View style={styles.headerContainer}>
        <MetropolisSemiBoldText style={styles.titleTxt}>
          {t('common.studentsAreViewing')}
        </MetropolisSemiBoldText>
        <Pressable onPress={() => navigation.navigate(RoutePaths.courses)}>
          <MetropolisMediumText style={{color: color.skyBlue}}>
            {t('common.exploreMore')}
          </MetropolisMediumText>
        </Pressable>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        {courses?.map(renderItem)}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleTxt: {
    color: color.blue,
    fontSize: 18,
  },
  contentContainerStyle: {
    flexGrow: 1,
    marginTop: 15,
    marginBottom: 20,
    paddingBottom: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  addPhoto: {
    // width: (Dimensions.get('window').width * 55) / 100,
    height: 240,
    width: 240,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default memo(StudentComponent);
