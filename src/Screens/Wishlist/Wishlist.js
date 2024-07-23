import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import color from '../../components/color';
import WishlistItem from '../../components/WishlistItem';
import {getWishList} from '../../services/wishlist_api';
import {BASE_API} from '../../services/API_URI';
import {useLoading} from '../../context/Loading/LoadingContext';
import {
  addToCartRequest,
  getCartCountService,
  getCartItemsRequest,
} from '../../redux/actions/cartActions';
import useWishlist from '../../hooks/useWishlist';
import MetropolisSemiBoldText from '../../components/Text/MetropolisSemiBoldText';
import {useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {successToast} from '../../util/toastUtils';

const WishlistScreen = props => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user?.userData);

  const [wishListData, setWishListData] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);

  const {t} = useTranslation();
  const {setIsLoading} = useLoading();
  const {onRemoveWishlist} = useWishlist();

  useFocusEffect(
    React.useCallback(() => {
      onRefresh();
    }, []),
  );

  const getWishes = async () => {
    try {
      const response = await getWishList();
      if (response && response.data && response.data.success) {
        setWishListData(response.data.data);
      }
      setRefreshing(false);
    } catch (err) {
      console.log(
        '[getWishes] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
      setRefreshing(false);
    }
  };

  const deleteWishList = async (item, index) => {
    try {
      setIsLoading(true);
      const res = await onRemoveWishlist(item.course_id);
      setIsLoading(false);
      if (res && res.data && res.data.success) {
        const prevArray = [...wishListData];
        prevArray.splice(index, 1);
        setWishListData(prevArray);
      }
      if (res && res.data && res.data.message) {
        successToast(res.data.message);
      }
    } catch (err) {
      console.log(
        '[deleteWishList] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
      setIsLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getWishes();
  };

  const renderItem = ({item, index}) => {
    const {id, courses} = item;
    const price = courses.course_sale;
    const isFree = courses.is_free == 1;
    let newPrice = '';
    let oldPrice = '';
    if (isFree) {
      newPrice = 'Free';
    } else if (!price.on_sale) {
      oldPrice = price?.old_price;
    } else {
      newPrice = price?.new_price;
      oldPrice = price?.old_price;
    }
    return (
      <SafeAreaView>
        <WishlistItem
          key={id}
          imageUri={
            courses.course_image ? {uri: BASE_API + courses.course_image} : null
          }
          title={courses.name}
          author={
            courses.instructor.first_name + ' ' + courses.instructor.last_name
          }
          newPrice={newPrice}
          oldPrice={oldPrice}
          country_id={courses.country_id}
          isFavorite={true}
          onPress={() => {}}
          onAddToCart={async () => {
            try {
              setIsLoading(true);
              const addToCartRes = await dispatch(
                addToCartRequest(item?.courses),
              );
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
              console.log(
                '[onAddToCart] Error : ',
                err?.response?.data?.message ?? err?.message,
              );
              setIsLoading(false);
            }
          }}
          onFavoriteChange={() => {
            deleteWishList(item, index);
          }}
          isFree={courses?.course_sale?.is_free}
          onSale={courses?.course_sale?.on_sale}
          translation={courses?.translation}
        />
      </SafeAreaView>
    );
  };

  const renderEmptyComponent = () => {
    if (!isRefreshing && !wishListData?.length) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <MetropolisSemiBoldText style={styles.noDataText}>
            {t('common.noWishlistFound')}
          </MetropolisSemiBoldText>
        </View>
      );
    }
  };

  return (
    <FlatList
      data={wishListData}
      renderItem={renderItem}
      keyExtractor={(item, index) => index}
      style={styles.container}
      contentContainerStyle={[
        styles.listContentStyle,
        !isRefreshing &&
          !wishListData?.length && {
            flex: 1,
          },
      ]}
      onRefresh={() => {
        onRefresh();
      }}
      refreshing={isRefreshing}
      ListEmptyComponent={renderEmptyComponent}
    />
  );
};

const styles = StyleSheet.create({
  noDataText: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  listContentStyle: {
    marginVertical: 15,
    paddingHorizontal: 15,
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
});

export default WishlistScreen;
