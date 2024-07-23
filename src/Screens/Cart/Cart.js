import React, {useEffect, useMemo} from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useIsFocused} from '@react-navigation/native';

import MyImage from '../../components/MyImage';
import CoursePrice from '../../components/CoursePrice';
import RoundedButton from '../../components/RoundedButton';
import SmallRoundedBtn from '../../components/SmallRoundedButton';
import MetropolisSemiBoldText from '../../components/Text/MetropolisSemiBoldText';
import MetropolisRegularText from '../../components/Text/MetropolisRegularText';

import {
  deleteCartChapterItemRequest,
  deleteCartItemRequest,
  getCartCountService,
  getCartItemsRequest,
} from '../../redux/actions/cartActions';

import color from '../../components/color';
import RoutePaths from '../../util/RoutePaths';
import {BASE_API} from '../../services/API_URI';
import {errorToast} from '../../util/toastUtils';
import {getTranslationFromMany} from '../../util/misc';

const CartItem = ({
  courseCover,
  courseName,
  instructorName,
  newPrice,
  oldPrice,
  country_id,
  onRemove,
  onSale,
  isFree,
  translation,
}) => {
  const {t} = useTranslation();
  return (
    <TouchableOpacity
      onPress={() => {}}
      style={{
        flexDirection: 'row',
        backgroundColor: color.white,
        borderBottomColor: color.grey,
        borderBottomWidth: 1,
        paddingVertical: 15,
      }}>
      <MyImage
        source={courseCover}
        style={{height: 100, width: 90, borderRadius: 10, marginRight: 15}}
      />
      <View style={{flex: 1}}>
        <MetropolisSemiBoldText style={{flex: 1, fontSize: 15}}>
          {t('dynamic', {
            en: courseName,
            ar: getTranslationFromMany(translation, 'name', courseName),
          })}
        </MetropolisSemiBoldText>
        <MetropolisRegularText style={{fontSize: 12, marginTop: 10}}>
          {instructorName}
        </MetropolisRegularText>
        <CoursePrice
          newPrice={newPrice}
          oldPrice={oldPrice}
          country_id={country_id}
          isFree={isFree}
          onSale={onSale}
          style={{
            flex: 1,
            marginTop: 8,
            marginVertical: 0,
          }}
        />
        <SmallRoundedBtn
          text={t('common.remove')}
          onPress={onRemove}
          containerStyle={{
            backgroundColor: color.white,
            borderWidth: 1,
            borderColor: color.blue,
            marginRight: 10,
            marginTop: 5,
          }}
          textStyle={{
            color: color.blue,
            paddingVertical: 2,
            fontSize: 12,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const CartScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const {isLoading, data} = useSelector(state => state.cart);
  const userData = useSelector(state => state.user?.userData);

  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userData) {
          await Promise.allSettled([
            dispatch(getCartItemsRequest()),
            dispatch(getCartCountService()),
          ]);
        }
      } catch (err) {
        console.log('Error : ', err?.message);
      }
    };
    if (isFocused) {
      fetchData();
    }
  }, [dispatch, isFocused, userData]);

  const onRemoveHandler = async courseId => {
    try {
      const courseIndex = data.findIndex(
        course => course?.courses?.id === courseId,
      );
      if (courseIndex !== -1) {
        const deleteCartItem = await dispatch(deleteCartItemRequest(courseId));
        if (userData?.user && deleteCartItem.type.includes('fulfilled')) {
          try {
            await Promise.allSettled([
              dispatch(getCartItemsRequest()),
              dispatch(getCartCountService()),
            ]);
          } catch (err) {
            console.log('err : ', err);
          }
        }
      }
    } catch (err) {
      console.log('[Cart - onRemoveHandler] Error: ', err?.message);
    }
  };

  const onRemoveChapterHandler = async (courseId, chapterId) => {
    try {
      const courseIndex = data.findIndex(
        course => course?.courses?.id === courseId,
      );
      if (courseIndex !== -1) {
        const deleteCartChapterItemRequestRes = await dispatch(
          deleteCartChapterItemRequest({
            courseId,
            chapterId,
          }),
        );
        if (deleteCartChapterItemRequestRes.type.includes('fulfilled')) {
          try {
            await Promise.allSettled([
              dispatch(getCartItemsRequest()),
              dispatch(getCartCountService()),
            ]);
          } catch (err) {
            console.log('err : ', err);
          }
        }
      }
    } catch (err) {
      console.log('[Cart - onRemoveChapterHandler] Error: ', err?.message);
    }
  };

  const renderItem = ({item}) => {
    const filteredChapters = item?.chapters?.map(chapterId => {
      return item.courses?.chapter?.find(chapter => chapter.id === chapterId);
    });

    return item?.chapters === null || item?.chapters?.length === 0 ? (
      <CartItem
        courseCover={{uri: BASE_API + item?.courses?.course_image}}
        courseName={item?.courses?.name}
        instructorName={t(
          'courseAuthors.' +
            item?.courses?.instructor?.first_name +
            ' ' +
            item?.courses?.instructor?.last_name,
          item?.courses?.instructor?.first_name +
            ' ' +
            item?.courses?.instructor?.last_name,
        )}
        newPrice={item?.courses?.course_sale?.new_price}
        oldPrice={item?.courses?.course_sale?.old_price}
        country_id={item.courses.country_id}
        onSale={item?.courses?.course_sale?.on_sale}
        isFree={item?.courses?.course_sale?.is_free}
        onRemove={() => {
          onRemoveHandler(item?.courses?.id);
        }}
        translation={item?.courses?.translation}
      />
    ) : (
      filteredChapters.map((chapter, index) => {
        return (
          <CartItem
            key={chapter?.id ?? index}
            courseCover={{uri: BASE_API + item?.courses?.course_image}}
            courseName={chapter?.name}
            instructorName={t(
              'courseAuthors.' +
                item?.courses?.instructor?.first_name +
                ' ' +
                item?.courses?.instructor?.last_name,
              item?.courses?.instructor?.first_name +
                ' ' +
                item?.courses?.instructor?.last_name,
            )}
            newPrice={chapter?.price}
            oldPrice={chapter?.price}
            onSale={false}
            isFree={false}
            onRemove={() => {
              onRemoveChapterHandler(item?.courses?.id, chapter?.id);
            }}
            translation={chapter?.translation}
          />
        );
      })
    );
  };

  const cartTotal = useMemo(() => {
    if (data?.length) {
      return data.reduce((acc, currItem, index, arr) => {
        let coursePrice =
          (currItem?.courses?.course_sale?.is_free
            ? 0
            : currItem?.courses?.course_sale?.on_sale
            ? currItem?.courses?.course_sale?.new_price
            : currItem?.courses?.course_sale?.old_price) || 0;

        if (currItem?.chapters?.length) {
          coursePrice = currItem?.chapters?.reduce((priceAcc, chapterId) => {
            const chapterPrice =
              currItem?.courses?.chapter?.find?.(chapterPayload => {
                return chapterPayload.id === chapterId;
              })?.price ?? 0;
            return priceAcc + chapterPrice;
          }, 0);
        }

        return acc + coursePrice;
      }, 0);
    }
    return 0;
  }, [data]);

  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={{flex: 1, backgroundColor: color.white}}>
      <MetropolisSemiBoldText
        style={{
          fontSize: 16,
          color: color.black,
          marginLeft: 15,
          marginVertical: 15,
        }}>
        {`${data?.length ?? 0} Items`}
      </MetropolisSemiBoldText>
      <FlatList
        data={data}
        renderItem={renderItem}
        style={{flex: 1}}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      <>
        <MetropolisSemiBoldText
          style={{
            fontSize: 20,
            color: color.black,
            marginVertical: 15,
            marginLeft: 15,
          }}>
          {userData.user.country_id === 112
            ? t('course.total_price_in_kd', {
                price: cartTotal,
              })
            : t('course.total_price_in_bd', {
                price: cartTotal,
              })}
        </MetropolisSemiBoldText>
        <RoundedButton
          text={t('common.checkout')}
          onPress={() => {
            if (userData == null || userData == undefined) {
              navigation.navigate(RoutePaths.login);
            } else if (data?.length > 0) {
              navigation.navigate(RoutePaths.checkout);
            } else {
              errorToast(t('common.noCourseFound'));
            }
          }}
          textStyle={{
            fontSize: 16,
          }}
          style={{
            maxHeight: 50,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: safeAreaInsets.bottom + 15,
            marginHorizontal: 15,
          }}
          isLoading={isLoading}
          iconName={''}
          light={true}
        />
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: 200,
    height: 400,
    resizeMode: 'contain',
  },
});

export default CartScreen;
