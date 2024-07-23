import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Learning from '../../components/CourseComponent/Learning';
import Curriculum from '../../components/CourseComponent/Curriculum';
import MetropolisSemiBoldText from '../../components/Text/MetropolisSemiBoldText';
import MetropolisRegularText from '../../components/Text/MetropolisRegularText';
import MetropolisMediumText from '../../components/Text/MetropolisMediumText';
import CourseDetailRowItem from '../../components/CourseDetailRowItem';
import CoursePrice from '../../components/CoursePrice';
import RoundedButton from '../../components/RoundedButton';

import color from '../../components/color';
import {slider} from '../../constants/images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import * as services from '../../services';
import {useLoading} from '../../context/Loading/LoadingContext';
import {BASE_API} from '../../services/API_URI';
import RoutePaths from '../../util/RoutePaths';
import RenderHTML from 'react-native-render-html';
import {StyleSheet} from 'react-native';
import {appConstants, fonts} from '../../constants';
import useWishlist from '../../hooks/useWishlist';
import {useTranslation} from 'react-i18next';
import {getTranslationFromMany} from '../../util/misc';
import {useSelector} from 'react-redux';
import {
  addCourseChapterToCartRequest,
  addToCartRequest,
  getCartCountService,
  getCartItemsRequest,
} from '../../redux/actions/cartActions';
import {useDispatch} from 'react-redux';
import MyImage from '../../components/MyImage';
import {successToast} from '../../util/toastUtils';
import {useOrientation} from '../../util/useOrientation';

const CourseDetail = ({navigation, route}) => {
  const params = route.params;

  const orientation = useOrientation();

  // addWishlist: updateWishlistData.bind(null, item, true),
  // removeWishlist: updateWishlistData.bind(null, item, false),

  const safeAreaInsets = useSafeAreaInsets();
  const {t, i18n} = useTranslation();

  const user = useSelector(state => state.user);

  const [detail, setDetail] = useState(null);
  const {setIsLoading} = useLoading();

  const {onAddToWishlist, onRemoveWishlist} = useWishlist();
  const dispatch = useDispatch();

  const getDetails = course => {
    setIsLoading(true);
    services.COURSE.getCourseDetails(course.id)
      .then(res => {
        setIsLoading(false);
        if (res && res?.data && res?.data?.data) {
          setDetail(res?.data?.data);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (route.params.course) {
      getDetails(route.params.course);
    } else {
      navigation.goBack();
    }
  }, [route.params]);

  const onDeleteWishList = async item => {
    try {
      setIsLoading(true);
      const res = await onRemoveWishlist(item.id);
      setIsLoading(false);
      if (res && res.data && res.data.success) {
        params?.removeWishlist?.();
        setDetail(prevState => {
          return {
            ...prevState,
            is_wishlist: false,
          };
        });
      }
      if (res && res.data && res.data.message) {
        successToast(res.data.message);
      }
    } catch (err) {
      console.log(
        '[onDeleteWishList] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
      setIsLoading(false);
    }
  };

  const onAddWishList = async item => {
    try {
      setIsLoading(true);
      const response = await onAddToWishlist(item.id);
      setIsLoading(false);
      if (response && response.data && response.data.success) {
        params?.addWishlist?.();
        setDetail(prevState => {
          return {
            ...prevState,
            is_wishlist: true,
          };
        });
      }
      if (response && response.data && response.data.message) {
        successToast(response.data.message);
      }
    } catch (err) {
      console.log(
        '[onAddWishList] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
      setIsLoading(false);
    }
  };

  const addCart = async (isRedirect = false) => {
    try {
      setIsLoading(true);
      const addToCartRes = await dispatch(addToCartRequest(detail));
      if (user?.userData && addToCartRes.type.includes('fulfilled')) {
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
      if (isRedirect) {
        navigation.navigate(RoutePaths.cart);
      }
    } catch (err) {
      console.log(
        '[onAddToCart] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
      setIsLoading(false);
    }
  };

  const addChapterToCart = async chapterPayload => {
    try {
      if (!user || !user?.userData) {
        navigation.navigate(RoutePaths.login);
        return;
      }
      setIsLoading(true);
      const addChapterToCartRes = await dispatch(
        addCourseChapterToCartRequest({
          courseData: detail,
          chapterData: chapterPayload,
        }),
      );
      if (addChapterToCartRes.type.includes('fulfilled')) {
        try {
          await Promise.allSettled([
            dispatch(getCartItemsRequest()),
            dispatch(getCartCountService()),
          ]);
        } catch (err) {
          console.log('addChapterToCart : ', err?.message);
        }
      }
      setIsLoading(false);
    } catch (err) {
      console.log(
        '[addChapterToCart] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
      setIsLoading(false);
    }
  };

  if (detail) {
    return (
      <ScrollView
        contentContainerStyle={{
          backgroundColor: color.white,
          paddingHorizontal: 15,
        }}>
        <View style={{marginBottom: 15, marginTop: 15}}>
          <MetropolisSemiBoldText
            style={{
              fontSize: 20,
              color: 'black',
            }}>
            {t('dynamic', {
              en: detail.name,
              ar: getTranslationFromMany(
                detail?.translation,
                'name',
                detail.name,
              ),
            })}
          </MetropolisSemiBoldText>
          {detail.instructor ? (
            <MetropolisRegularText
              style={{fontSize: 14, marginVertical: 15, color: color.blue}}>
              {t(
                'courseAuthors.' + detail.instructor.first_name,
                detail.instructor.last_name,
              )}
            </MetropolisRegularText>
          ) : null}
          {/* <MetropolisLightText style={{fontSize: 12}}>
            {"Learn this year's full biophysics portion here."}
          </MetropolisLightText> */}
        </View>
        {detail?.enrolled && detail?.show_students ? (
          <CourseDetailRowItem
            iconName="people"
            text={t('common.students', {students: detail?.enrolled})}
          />
        ) : null}
        {detail?.video_duration && (
          <CourseDetailRowItem
            iconName="videocam"
            text={t('course.course_duration', {
              hours: detail?.video_duration?.hours,
              minutes: detail?.video_duration?.minutes,
            })}
          />
        )}
        {detail.exercises && (
          <CourseDetailRowItem
            iconName="menu"
            text={t('course.exercises', {exercise: detail?.exercises})}
          />
        )}

        {detail?.pdf_count ? (
          <CourseDetailRowItem
            iconName="document-text-outline"
            text={t('common.documents', {documents: detail?.pdf_count})}
          />
        ) : null}

        {detail?.audio_duration ? (
          <CourseDetailRowItem
            iconName="musical-notes-outline"
            text={t('course.course_duration', {
              hours: detail?.audio_duration?.hours,
              minutes: detail?.audio_duration?.minutes,
            })}
          />
        ) : null}

        <ImageBackground
          source={{uri: BASE_API + detail.course_image}}
          resizeMode="cover"
          style={{
            height: 240,
            width: '100%',
            borderRadius: 15,
            overflow: 'hidden',
          }}>
          {detail.course_preview && (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#00000020',
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(RoutePaths.videoPlayerScreen, {
                    url: BASE_API + detail.course_preview.url,
                  });
                }}
                style={{
                  backgroundColor: color.white,
                  borderRadius: 100,
                  paddingRight: i18n.language === 'ar' ? 8 : 0,
                  paddingLeft: i18n.language === 'en' ? 8 : 0,
                }}>
                <Icon name="caret-forward" size={80} color={'#000'} />
              </TouchableOpacity>
              <MetropolisMediumText
                style={{
                  position: 'absolute',
                  bottom: 10,
                  alignSelf: 'center',
                  color: color.white,
                  backgroundColor: `${color.black}60`,
                }}>
                {'Preview this course'}
              </MetropolisMediumText>
            </View>
          )}
        </ImageBackground>
        <CoursePrice
          newPrice={detail?.course_sale?.new_price}
          oldPrice={detail?.course_sale?.old_price}
          country_id={detail?.country_id}
          isFree={detail?.course_sale?.is_free}
          onSale={detail?.course_sale?.on_sale}
        />

        {user?.userData?.user?.type ===
        appConstants.Instructor ? null : detail?.user_purchased_course ===
          false ? (
          <>
            <RoundedButton
              bordered={false}
              bgColor={color.blue}
              textColor={color.white}
              text={t('common.buyNow')}
              onPress={() => {
                addCart(detail);
              }}
              style={{}}
              isLoading={false}
            />

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <RoundedButton
                bordered={true}
                bgColor={color.white}
                textColor={color.blue}
                text={t('common.addToCart')}
                onPress={() => {
                  addCart();
                }}
                style={{flex: 0.48}}
                isLoading={false}
                iconName={'cart'}
                light
              />
              <RoundedButton
                bordered={true}
                bgColor={color.white}
                textColor={color.blue}
                text={t('common.wishlist')}
                onPress={() => {
                  if (detail.is_wishlist) {
                    onDeleteWishList(detail);
                  } else {
                    onAddWishList(detail);
                  }
                }}
                style={{flex: 0.48}}
                isLoading={false}
                iconName={detail.is_wishlist ? 'heart' : 'heart-outline'}
                light
              />
            </View>
          </>
        ) : (
          <RoundedButton
            bordered={false}
            bgColor={color.blue}
            textColor={color.white}
            text={t('common.continueLearning')}
            onPress={() => {
              // addCart(true);
              navigation.navigate(RoutePaths.courseFullDetails, {
                courseId: detail?.course_sale?.course_id,
              });
            }}
            style={{}}
            isLoading={false}
          />
        )}

        <MetropolisMediumText
          style={{
            fontSize: 15,
            marginVertical: 10,
            color: color.black,
          }}>
          {t('common.courseInclude')}
        </MetropolisMediumText>
        {!detail?.course_validities?.is_lifetime ? (
          <CourseDetailRowItem
            iconName="infinite-sharp"
            text={t('course.access_for_days', {
              days: detail?.course_validities?.duration,
            })}
          />
        ) : (
          <CourseDetailRowItem
            iconName="infinite-sharp"
            text={t('common.unlimitedAccess')}
          />
        )}
        <CourseDetailRowItem
          iconName="phone-portrait-outline"
          text={t('common.accessdevice')}
        />
        {detail?.video_duration ? (
          <CourseDetailRowItem
            iconName="time-outline"
            text={t('course.course_duration', {
              hours: detail?.video_duration?.hours,
              minutes: detail?.video_duration?.minutes,
            })}
          />
        ) : null}
        {detail?.audio_duration ? (
          <CourseDetailRowItem
            iconName="time-outline"
            text={t('course.course_duration', {
              hours: detail?.audio_duration?.hours,
              minutes: detail?.audio_duration?.minutes,
            })}
          />
        ) : null}
        {detail?.pdf_count ? (
          <CourseDetailRowItem
            iconName="time-outline"
            text={t('common.documents', {documents: detail?.pdf_count})}
          />
        ) : null}
        {detail?.exercises ? (
          <CourseDetailRowItem
            iconName="time-outline"
            text={t('course.exercises', {exercise: detail?.exercises})}
          />
        ) : null}
        {detail.description && (
          <>
            <MetropolisMediumText style={styles.titleText}>
              {t('common.aboutCourse')}
            </MetropolisMediumText>
            <RenderHTML
              contentWidth={
                orientation === 'PORTRAIT'
                  ? Dimensions.get('window').width
                  : Dimensions.get('window').width
              }
              defaultTextProps={styles.defaultTextProps}
              source={{
                html: t('dynamic', {
                  en: detail?.description?.replace(/<[^>]*>/g, ''),
                  ar:
                    getTranslationFromMany(
                      detail?.translation,
                      'description',
                      detail?.description?.replace(/<[^>]*>/g, ''),
                    ).replace(/(<([^>]+)>)/gi, '') ?? '',
                }),
              }}
            />
          </>
        )}
        {detail.course_objectives && detail.course_objectives.length > 0 && (
          <Learning objectives={detail.course_objectives} />
        )}
        {detail.chapter && (
          <Curriculum
            image={BASE_API + detail.course_image}
            chapter={detail.chapter}
            country_id={detail.country_id}
            onCartPress={addChapterToCart}
          />
        )}
        <MetropolisMediumText
          style={{
            fontSize: 15,
            marginVertical: 15,
            color: color.black,
          }}>
          {t('common.instructor')}
        </MetropolisMediumText>
        <View
          style={{
            flex: 1,
            padding: 15,
            backgroundColor: `${color.skyBlue}25`,
            borderRadius: 10,
            marginBottom: 15 + safeAreaInsets.bottom,
          }}>
          <View
            style={{
              flexDirection: 'row',
              // margin: 10,
              borderRadius: 10,
            }}>
            <MyImage
              source={
                detail.instructor.img_path
                  ? {uri: BASE_API + detail.instructor.img_path}
                  : slider.slider3
              }
              style={{
                height: 120,
                width: 120,
                borderRadius: 10,
                margin: 5,
                backgroundColor: color.white,
              }}
              resizeMode="contain"
            />
            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                paddingVertical: 10,
                marginLeft: 10,
              }}>
              <MetropolisSemiBoldText
                style={{
                  fontSize: 15,
                  color: 'black',
                  lineHeight: 17,
                }}>
                {t(
                  'courseAuthors.' +
                    detail?.instructor?.first_name +
                    ' ' +
                    detail?.instructor?.last_name,
                  detail?.instructor?.first_name +
                    ' ' +
                    detail?.instructor?.last_name,
                )}
              </MetropolisSemiBoldText>
              {detail?.enrolled && detail?.show_students ? (
                <CourseDetailRowItem
                  iconName="eye"
                  text={t('common.students', {students: detail?.enrolled})}
                  style={{
                    marginBottom: 0,
                  }}
                  iconColor={color.orange}
                />
              ) : null}
              {/* <CourseDetailRowItem
                iconName="play-circle-outline"
                text={'12 Courses'}
                iconColor={color.green}
                style={{
                  marginBottom: 0,
                }}
              /> */}
            </View>
          </View>
          {detail?.instructor?.about_us ? (
            <MetropolisRegularText style={{lineHeight: 17, marginTop: 16}}>
              {detail?.instructor?.about_us}
            </MetropolisRegularText>
          ) : null}
          {/* <MetropolisSemiBoldText
            style={{color: color.black, marginVertical: 15}}>
            {'Dawraty certified Mathematics Instructor'}
          </MetropolisSemiBoldText> */}
        </View>
      </ScrollView>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  titleText: {
    color: color.black,
    fontSize: 15,
    marginTop: 15,
  },
  defaultTextProps: {
    style: {
      fontFamily: fonts.MetropolisRegular,
      lineHeight: 16,
      fontSize: 12,
      textAlign: 'left',
      marginTop: 10,
    },
  },
});

export default CourseDetail;
