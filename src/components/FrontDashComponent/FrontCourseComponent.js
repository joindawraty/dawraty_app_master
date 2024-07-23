import React, {useEffect, useRef, useState} from 'react';
import {View, FlatList, StyleSheet, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import CoursesRowItem from '../CoursesRowItem';
import ListFooterComponent from '../ListFooterComponent';
import MetropolisSemiBoldText from '../Text/MetropolisSemiBoldText';

import {useLoading} from '../../context/Loading/LoadingContext';
import useWishlist from '../../hooks/useWishlist';

import {
  addToCartRequest,
  getCartCountService,
  getCartItemsRequest,
} from '../../redux/actions/cartActions';
import {successToast} from '../../util/toastUtils';
import RoutePaths from '../../util/RoutePaths';
import {BASE_API} from '../../services/API_URI';
import {
  getCategoryCourses,
  getDashboardCourses,
} from '../../services/dashboard';
import {getTranslationFromMany} from '../../util/misc';
import {SafeAreaView} from 'react-native';

const FrontCourseComponent = props => {
  const {category, searchText, isCategory} = props;
  const navigation = useNavigation();
  const {t} = useTranslation();

  const [courses, setCourses] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);

  const {setIsLoading} = useLoading();
  const {onAddToWishlist, onRemoveWishlist} = useWishlist();

  const dispatch = useDispatch();
  const userData = useSelector(state => state.user?.userData);

  const categoryRef = useRef(null);
  const pageNo = useRef(1);
  const isEndReached = useRef(false);
  const searchTextRef = useRef('');
  const flatListRef = useRef(null);

  const getData = async () => {
    try {
      let tagID = null;
      if (categoryRef.current && !!categoryRef.current?.id) {
        tagID = categoryRef.current.id;
      }
      var res = null;
      if (isCategory) {
        res = await getCategoryCourses(
          tagID,
          pageNo.current,
          searchTextRef.current,
        );
      } else {
        res = await getDashboardCourses(
          tagID,
          pageNo.current,
          searchTextRef.current,
        );
      }
      if (res && res.data && res.data.data) {
        if (searchTextRef.current) {
          setCourses(res.data.data);
          isEndReached.current = true;
        } else {
          const resData = res.data.data;
          if (pageNo.current === 1) {
            setCourses(resData.data);
          } else {
            setCourses(prevCourses => [...prevCourses, ...resData.data]);
          }
          isEndReached.current = resData.data?.length < resData?.per_page;
        }
      }
      setRefreshing(false);
      setLoading(false);
    } catch (err) {
      setRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    setRefreshing(true);
    setLoading(false);
    pageNo.current = 1;
    if (searchText && searchText !== '') {
      searchTextRef.current = searchText;
    } else {
      searchTextRef.current = '';
    }
    if (category) {
      categoryRef.current = category;
    } else {
      categoryRef.current = null;
    }
    flatListRef.current?.scrollToOffset?.({
      offset: 0,
      animated: true,
    });
    getData();
  }, [category, searchText]);

  const onRefresh = () => {
    setRefreshing(true);
    pageNo.current = 1;
    isEndReached.current = true;
    getData();
  };

  const onEndReached = () => {
    if (!categoryRef.current) {
      if (isEndReached.current || isLoading) {
        return;
      }
      setLoading(true);
      pageNo.current += 1;
      getData();
    }
  };

  const updateWishlistData = (course, isWishList) => {
    const data = [...courses];
    const index = data.findIndex(item => item.id == course.id);
    if (index !== -1) {
      data[index].is_wishlist = isWishList;
      setCourses(data);
    }
  };

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

  const renderItem = ({item, index}) => {
    return (
      <SafeAreaView>
        <CoursesRowItem
          id={index}
          title={t('dynamic', {
            en: item.name,
            ar: getTranslationFromMany(item.translation, 'name', item.name),
          })}
          image={{uri: BASE_API + item.course_image}}
          // image={item.image}
          instructorName={t(
            'courseAuthors.' +
              item.instructor.first_name +
              ' ' +
              item.instructor.last_name,
            item.instructor.first_name + ' ' + item.instructor.last_name,
          )}
          newPrice={item.course_sale?.new_price}
          oldPrice={item.course_sale?.old_price}
          country_id={item.country_id}
          isFree={item.course_sale?.is_free}
          isPurchased={item?.is_purchased?.is_purchased}
          onSale={item.course_sale?.on_sale}
          isWhitelisted={item.is_wishlist}
          onPress={() => {
            navigation.navigate(RoutePaths.courseDetails, {
              course: item,
              addWishlist: updateWishlistData.bind(null, item, true),
              removeWishlist: updateWishlistData.bind(null, item, false),
            });
          }}
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
        />
      </SafeAreaView>
    );
  };

  const renderFooter = () => {
    if (isLoading && !isRefreshing) {
      return <ListFooterComponent />;
    }
    return null;
  };

  const renderEmptyComponent = () => {
    if (!isLoading && !isRefreshing) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <MetropolisSemiBoldText style={styles.noDataText}>
            {t('common.comingSoon')}
          </MetropolisSemiBoldText>
        </View>
      );
    }
    if (!isLoading && !isRefreshing && !courses?.length) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <MetropolisSemiBoldText style={styles.noDataText}>
            {t('common.comingSoon')}
          </MetropolisSemiBoldText>
        </View>
      );
    }
  };

  return (
    <FlatList
      ref={flatListRef}
      data={courses}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.container}
      contentContainerStyle={styles.flatListContentContainer}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      ListEmptyComponent={renderEmptyComponent}
    />
  );
};

const styles = StyleSheet.create({
  flatListContentContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  container: {
    flex: 1,
  },
  noDataText: {
    // textAlign: 'center',
    // width: '100%',
  },
  addPhoto: {
    width: widthPercentageToDP('35%'),
    height: widthPercentageToDP('40%'),
    borderRadius: 10,
    resizeMode: 'contain',
  },
});

export default FrontCourseComponent;
