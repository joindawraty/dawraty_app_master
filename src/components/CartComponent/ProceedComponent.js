import {CloseIcon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import color from '../color';
import {useDispatch} from 'react-redux';
import {deleteCartItemRequest} from '../../redux/actions/cartActions';
import {useLoading} from '../../context/Loading/LoadingContext';
import MetropolisRegularText from '../Text/MetropolisRegularText';
import {useTranslation} from 'react-i18next';
import MetropolisSemiBoldText from '../Text/MetropolisSemiBoldText';
import MetropolisMediumText from '../Text/MetropolisMediumText';

/* TODO: Refactor this code to be more readable/function better */
const Item = ({onRemove, item, title, chapterPrice, image}) => {
  const getChapterName = chapterId => {
    for (let chapter of item.courses.chapter) {
      if (chapter.id === chapterId) return chapter.name;
    }
  };

  const getChapterPrice = chapterId => {
    for (let chapter of item.courses.chapter) {
      if (chapter.id === chapterId) return chapter.price;
    }
  };

  const {t} = useTranslation();
  const getPrice = () => {
    if (chapterPrice !== undefined) {
      return chapterPrice;
    }
    if (item.courses?.is_free == 1) {
      return 'Free';
    } else if (item.courses?.course_sale?.on_sale) {
      return item.courses?.course_sale?.new_price;
    } else {
      return item.courses?.course_sale?.old_price;
    }
  };
  return item.chapters.length > 1 ? (
    item.chapters.map(chapter => (
      <View style={{marginTop: 22}}>
        <View style={{flexDirection: 'row', flex: 0.6}}>
          <MetropolisSemiBoldText
            style={{flex: 1, color: '#000', fontSize: 15, fontWeight: '700'}}>
            {getChapterName(chapter)}
          </MetropolisSemiBoldText>
          <MetropolisMediumText style={{color: '#000', fontSize: 12}}>
            {item.courses?.country_id === 112
              ? t('course.price_in_kd', {
                  price: getChapterPrice(chapter),
                })
              : t('course.price_in_bd', {
                  price: getChapterPrice(chapter),
                })}
          </MetropolisMediumText>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (item.courses) {
              onRemove(item.courses?.id);
            }
          }}
          style={{marginTop: 12}}>
          <MetropolisSemiBoldText style={{color: color.blue}}>
            <CloseIcon size={2} color={color.blue} />
            <MetropolisRegularText>
              {` ${t('common.remove')}`}
            </MetropolisRegularText>
          </MetropolisSemiBoldText>
        </TouchableOpacity>
      </View>
    ))
  ) : (
    <View style={{marginTop: 22}}>
      <View style={{flexDirection: 'row', flex: 0.6}}>
        <MetropolisSemiBoldText
          style={{flex: 1, color: '#000', fontSize: 15, fontWeight: '700'}}>
          {title}
        </MetropolisSemiBoldText>
        <MetropolisMediumText style={{color: '#000', fontSize: 12}}>
          {item.courses?.country_id === 112
            ? t('course.price_in_kd', {
                price: getPrice(),
              })
            : t('course.price_in_bd', {
                price: getPrice(),
              })}
        </MetropolisMediumText>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (item.courses) {
            onRemove(item.courses?.id);
          }
        }}
        style={{marginTop: 12}}>
        <MetropolisSemiBoldText style={{color: color.blue}}>
          <CloseIcon size={2} color={color.blue} />
          <MetropolisRegularText>
            {` ${t('common.remove')}`}
          </MetropolisRegularText>
        </MetropolisSemiBoldText>
      </TouchableOpacity>
    </View>
  );
};

const ProceedComponent = ({productData, onRemoveItemFromCart}) => {
  const [products, setProducts] = useState(null);
  // const [promocodeTotal, setPromocodeTotal] = useState(null);
  // const [total, setTotal] = useState(null);
  // const [finalTotal, setFinalTotal] = useState(null);
  // const [promo, setPromo] = useState('');
  // const [promoList, setPromoList] = useState([]);
  // const [courseList, setCourseList] = useState([]);

  const {t} = useTranslation();

  const {setIsLoading} = useLoading();
  const dispatch = useDispatch();

  const updatedData = () => {
    if (productData) {
      const keys = Object.keys(productData);
      var newArray = [];
      keys.forEach(key => {
        if (typeof productData[key] === 'object') {
          newArray.push(productData[key]);
        }
      });
      setProducts(newArray);
    }
  };

  useEffect(() => {
    updatedData();
  }, [productData]);

  const onRemoveHandler = async courseId => {
    try {
      const courseIndex = products.findIndex(
        course => course?.courses?.id == courseId,
      );
      if (courseIndex !== -1) {
        setIsLoading(true);
        await dispatch(deleteCartItemRequest(courseId));
        onRemoveItemFromCart();
        setIsLoading(false);
      }
    } catch (err) {
      console.log(
        '[onRemoveHandler] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
    }
  };

  const getChapterName = item => {
    for (let chapter of item.courses.chapter) {
      if (item.chapters.includes(chapter.id)) return chapter.name;
    }
  };

  const getChapterPrice = item => {
    for (let chapter of item.courses.chapter) {
      if (item.chapters.includes(chapter.id)) return chapter.price;
    }
  };

  const renderItem = ({item}) => {
    let chapterName, chapterPrice;
    if (item.chapters && item.chapters.length !== 0) {
      chapterName = getChapterName(item);
      chapterPrice = getChapterPrice(item);
    }

    return (
      <Item
        onRemove={onRemoveHandler}
        item={item}
        title={item.chapters.length !== 0 ? chapterName : item.courses.name}
        chapterPrice={chapterPrice}
        image={item.image}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View
        style={{
          marginHorizontal: 10,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 20,
            marginBottom: 10,
          }}>
          <MetropolisRegularText style={{fontSize: 13}}>
            Promo Code
          </MetropolisRegularText>
        </View>
        <View
          style={[
            {
              height: 40,
              flexDirection: 'row',
              marginBottom: 10,
              borderWidth: 1,
              borderColor: color.blue,
              borderRadius: 10,
            },
          ]}>
          <AppTextInput
            placeholder="Enter Promo Code"
            placeholderTextColor={'#CACACA'}
            style={{flex: 1, marginTop: 0, height: undefined}}
            value={promo}
            onChangeText={text => setPromo(text)}
          />
          <TouchableOpacity
            onPress={() => {
              applyPromoCode();
            }}
            style={{justifyContent: 'center', marginRight: 10}}>
            <MetropolisRegularText style={{color: color.skyBlue}}>
              {'Apply'}
            </MetropolisRegularText>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          margin: 10,
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}>
        <View style={{flexDirection: 'column', flex: 0.6}}>
          <Text style={{color: color.black, fontWeight: 'bold'}}>Product</Text>
        </View>
        <View
          style={{flexDirection: 'column', flex: 0.6, alignItems: 'flex-end'}}>
          <Text style={{color: color.black, fontWeight: 'bold'}}>Total</Text>
        </View>
      </View> */}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {/* <View
        style={{
          flexDirection: 'row',
          margin: 10,
          borderTopColor: '#ccc',
          borderTopWidth: 1,
          paddingTop: 10,
        }}>
        <View style={{flexDirection: 'column', flex: 0.6}}>
          <Text style={{color: color.black, fontWeight: 'bold', fontSize: 14}}>
            Sub Total
          </Text>
          <Text
            style={{
              color: color.black,
              fontWeight: 'bold',
              fontSize: 14,
              marginTop: 10,
            }}>
            After Applying Code
          </Text>
        </View>
        <View
          style={{flexDirection: 'column', flex: 0.6, alignItems: 'flex-end'}}>
          <Text style={{color: color.black}}>KD {total}</Text>
          <Text style={{color: color.black, marginTop: 10}}>
            KD {promocodeTotal}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          margin: 10,
          borderTopColor: '#ccc',
          borderTopWidth: 1,
          paddingTop: 10,
        }}>
        <View style={{flexDirection: 'column', flex: 0.6}}>
          <Text style={{color: color.black, fontWeight: 'bold', fontSize: 18}}>
            Final Total
          </Text>
        </View>
        <View
          style={{flexDirection: 'column', flex: 0.6, alignItems: 'flex-end'}}>
          <Text style={{color: color.black, fontSize: 18, fontWeight: '500'}}>
            KD {finalTotal}
          </Text>
        </View>
      </View> */}
    </SafeAreaView>
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
    width: widthPercentageToDP('50%'),
    height: widthPercentageToDP('40%'),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'contain',
  },
});

export default ProceedComponent;
