import React, {useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import color from '../../components/color';
import ProceedComponent from '../../components/CartComponent/ProceedComponent';
import {Checkbox} from 'native-base';
import PaymentComponent from '../../components/CartComponent/PaymentComponent';
import {useLoading} from '../../context/Loading/LoadingContext';
import {
  applyPromoCodeAPI,
  checkoutOrdersAPI,
  getCheckoutProductsAPI,
} from '../../services/checkout_api';
import {getStudentCredit} from '../../services/profile_api';
import MetropolisRegularText from '../../components/Text/MetropolisRegularText';
import {useSelector} from 'react-redux';
import AppTextInput from '../../components/AppTextInput';
import {useTranslation} from 'react-i18next';
import MetropolisMediumText from '../../components/Text/MetropolisMediumText';
import MetropolisSemiBoldText from '../../components/Text/MetropolisSemiBoldText';
import RoutePaths from '../../util/RoutePaths';
import {errorToast, successToast} from '../../util/toastUtils';

const CheckoutProceed = ({route, navigation}) => {
  const {address, phoneNumber} = route.params;

  const {t} = useTranslation();

  const {isLoading, setIsLoading} = useLoading();

  const [productData, setProductData] = useState(null);
  const [noProducts, setNoProducts] = useState(false);
  const [isTermSelected, setTermSelected] = useState(false);
  const {userData} = useSelector(state => state.user);
  const [promocodeTotal, setPromocodeTotal] = useState(null);
  const [total, setTotal] = useState(null);
  const [finalTotal, setFinalTotal] = useState(null);
  const [promo, setPromo] = useState('');
  const [promoList, setPromoList] = useState([]);
  const [courseList, setCourseList] = useState([]);

  const [userCredit, setUserCredit] = useState(0);
  const [creditApplied, setCreditApplied] = useState(0);

  const getCheckoutData = async () => {
    try {
      setIsLoading(true);
      const response = await getCheckoutProductsAPI();
      getCredit().then(res => {
        setUserCredit(res.data.data[0].credit_balance);
      });
      setIsLoading(false);
      if (response && response.data && response.data.success) {
        const data = response.data.data;
        const keys = Object.keys(data);
        var newArray = [];
        keys.forEach(key => {
          if (typeof data[key] === 'object') {
            newArray.push(data[key]);
          }
        });
        setProductData(data);
        setNoProducts(newArray.length == 0);
        setTotal(data.total);
        setFinalTotal(data.total);
        setPromocodeTotal(0);

        let courseIds = [];
        let chapterInfo = [];

        newArray.map(_item => {
          //map ids and replace prices with apple prices here
          if (_item.chapters.length) {
            _item.chapters.map(chapterId => {
              chapterInfo.push({
                courseId: _item.course_id,
                chapterId: chapterId,
              });
            });
          }
          courseIds.push(_item.course_id);
        });

        setCourseList(courseIds);
      }
    } catch (err) {
      console.log(
        '[getCheckoutData] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
      setIsLoading(false);
    }
  };

  async function getCredit() {
    const resp = await getStudentCredit(userData.user?.id);
    if (resp.data.success) {
      return resp;
    } else {
      throw new Error('Could not fetch credit');
    }
  }

  useEffect(() => {
    getCheckoutData();
  }, []);

  const onPlaceOrder = async () => {
    if (!isTermSelected) {
      errorToast('Please agree to the terms and conditions.');
      return;
    }
    // Object.entries(details).map(_item => {
    //   if (_item[1] === '') {
    //     delete details[_item[0]];
    //   }
    // });
    try {
      const payload = {
        address_id: address.id,
        applied_promocode: promoList,
        cart_course: courseList,
        country_id: userData?.user?.country_id,
        final_total: finalTotal,
        total: finalTotal,
        email: userData?.user?.email,
        first_name: userData?.user?.first_name,
        last_name: userData?.user?.last_name,
        mobile_number: phoneNumber,
        promocode_total: promocodeTotal,
        credit_applied: userCredit,
      };

      setIsLoading(true);
      const response = await checkoutOrdersAPI(payload);
      console.log('response : ', response?.data);
      setIsLoading(false);
      if (response && response.data && response.data?.message === 'success') {
        navigation.navigate(RoutePaths.paymentGateway, {
          paymentLink: response.data.transaction.url,
        });
      }
      //if tap payments
      if (
        response &&
        response.data &&
        response.data?.response?.code === '100'
      ) {
        navigation.navigate(RoutePaths.paymentGateway, {
          paymentLink: response.data.transaction.url,
        });
      }
    } catch (err) {
      console.log(
        '[onPlaceOrder] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
      setIsLoading(false);
      errorToast(t('alertMessage.wrong'));
    }
  };
  async function applyPromoCode() {
    try {
      if (!promo) {
        errorToast('Please enter promo code.');
        return;
      }
      let payload = {
        cart_course: courseList,
        code: [promo, ...promoList],
      };
      setIsLoading(true);
      const resp = await applyPromoCodeAPI(payload);
      setIsLoading(false);
      if (resp && resp.data && resp.data.success) {
        if (resp.data.data == finalTotal) {
          errorToast('Promo code do not exist.');
          return;
        }
        const amount = parseFloat(resp.data.data).toFixed(2);
        setFinalTotal(amount);
        setPromocodeTotal((total - amount).toFixed(2));
        setPromoList([...promoList, promo]);
        // setPromo('');
      }
      if (resp && resp.data && resp.data.message) {
        successToast(resp.data.message);
      }
    } catch (err) {
      const respErr = err?.response?.data?.message;
      console.log('Error : ', respErr ?? err?.message);
      if (respErr && Array.isArray(respErr)) {
        errorToast(respErr[0] ?? t('alertMessage.wrong'));
      }
      setIsLoading(false);
    }
  }

  const applyCredit = () => {
    if (userCredit > 0 && finalTotal > 0) {
      if (finalTotal - userCredit < 0) {
        setUserCredit(userCredit - finalTotal);
        setCreditApplied(finalTotal);
        setFinalTotal(0);
      } else {
        setFinalTotal(finalTotal - userCredit);
        setCreditApplied(userCredit);
        setUserCredit(0);
      }
    }
  };

  const removeCredit = () => {
    setUserCredit(userCredit + creditApplied);
    setFinalTotal(finalTotal + creditApplied);
    setCreditApplied(0);
  };

  if (productData && !noProducts) {
    return (
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          backgroundColor: color.white,
        }}>
        <View>
          <MetropolisSemiBoldText style={{fontSize: 16, color: color.blue}}>
            {t('checkout.review_order')}
          </MetropolisSemiBoldText>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 20,
              marginBottom: 10,
            }}>
            <MetropolisRegularText style={{fontSize: 13}}>
              {t('checkout.promo_code')}
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
              placeholder={t('checkout.enter_promo_code')}
              placeholderTextColor={'#CACACA'}
              style={{flex: 1, marginTop: 0, height: undefined}}
              value={promo}
              onChangeText={text => setPromo(text)}
              // editable={!!promocodeTotal}
            />
            <TouchableOpacity
              onPress={applyPromoCode}
              style={{justifyContent: 'center', marginRight: 10}}>
              <MetropolisRegularText style={{color: color.skyBlue}}>
                {t('checkout.apply')}
              </MetropolisRegularText>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
              marginBottom: 10,
            }}>
            <MetropolisRegularText style={{fontSize: 13}}>
              {t('checkout.credit')}
            </MetropolisRegularText>
          </View>
          <View
            style={[
              {
                height: 40,
                display: 'flex',
                // flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
                borderWidth: 1,
                borderColor: color.blue,
                borderRadius: 10,
                borderColor: color.blue,
                textAlign: t.language === 'ar' ? 'right' : 'left',
              },
            ]}>
            <Text style={{marginHorizontal: 10}}>
              {userData.user.country_id === 112
                ? t('course.price_in_kd', {price: userCredit})
                : t('course.price_in_bd', {price: userCredit})}
            </Text>
            {creditApplied > 0 ? (
              <TouchableOpacity
                onPress={removeCredit}
                style={{justifyContent: 'center', marginRight: 10}}>
                <MetropolisRegularText style={{color: color.red}}>
                  {t('checkout.remove')}
                </MetropolisRegularText>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={applyCredit}
                style={{justifyContent: 'center', marginRight: 10}}>
                <MetropolisRegularText style={{color: color.skyBlue}}>
                  {t('checkout.apply')}
                </MetropolisRegularText>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              paddingBottom: 10,
            }}>
            <View style={{flexDirection: 'column', flex: 0.6}}>
              <MetropolisSemiBoldText
                style={{color: color.black, fontWeight: 'bold'}}>
                {t('common.product')}
              </MetropolisSemiBoldText>
            </View>
            <View
              style={{
                flexDirection: 'column',
                flex: 0.6,
                alignItems: 'flex-end',
              }}>
              <MetropolisSemiBoldText
                style={{color: color.black, fontWeight: 'bold'}}>
                {t('common.total')}
              </MetropolisSemiBoldText>
            </View>
          </View>
          <ProceedComponent
            onRemoveItemFromCart={getCheckoutData}
            productData={productData}
          />
          <View
            style={{
              flexDirection: 'row',
              margin: 10,
              borderTopColor: '#ccc',
              borderTopWidth: 1,
              paddingTop: 10,
            }}>
            <View style={{flexDirection: 'column', flex: 0.6}}>
              <MetropolisSemiBoldText
                style={{color: color.black, fontWeight: 'bold', fontSize: 14}}>
                {t('common.sub_total')}
              </MetropolisSemiBoldText>
              <MetropolisSemiBoldText
                style={{
                  color: color.black,
                  fontWeight: 'bold',
                  fontSize: 14,
                  marginTop: 10,
                }}>
                {t('checkout.after_applying_code')}
              </MetropolisSemiBoldText>
              <MetropolisSemiBoldText
                style={{
                  color: color.black,
                  fontWeight: 'bold',
                  fontSize: 14,
                  marginTop: 10,
                }}>
                {t('checkout.credit_applied')}
              </MetropolisSemiBoldText>
            </View>
            <View
              style={{
                flexDirection: 'column',
                flex: 0.6,
                alignItems: 'flex-end',
              }}>
              <MetropolisSemiBoldText style={{color: color.black}}>
                {userData.user.country_id === 112
                  ? t('course.price_in_kd', {
                      price: total,
                    })
                  : t('course.price_in_bd', {
                      price: total,
                    })}
              </MetropolisSemiBoldText>
              <MetropolisSemiBoldText
                style={{color: color.black, marginTop: 10}}>
                {userData.user.country_id === 112
                  ? t('course.price_in_kd', {
                      price: Number(promocodeTotal) + (finalTotal - finalTotal),
                    })
                  : t('course.price_in_bd', {
                      price: Number(promocodeTotal) + (finalTotal - finalTotal),
                    })}
              </MetropolisSemiBoldText>
              <MetropolisSemiBoldText
                style={{color: color.black, marginTop: 10}}>
                {userData.user.country_id === 112
                  ? t('course.price_in_kd', {
                      price: Number(creditApplied) + (finalTotal - finalTotal),
                    })
                  : t('course.price_in_bd', {
                      price: Number(creditApplied) + (finalTotal - finalTotal),
                    })}
              </MetropolisSemiBoldText>
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
              <MetropolisSemiBoldText
                style={{color: color.black, fontWeight: 'bold', fontSize: 18}}>
                {t('common.total')}
              </MetropolisSemiBoldText>
            </View>
            <View
              style={{
                flexDirection: 'column',
                flex: 0.6,
                alignItems: 'flex-end',
              }}>
              <MetropolisSemiBoldText
                style={{color: color.black, fontSize: 18, fontWeight: '500'}}>
                {userData.user.country_id === 112
                  ? t('course.price_in_kd', {
                      price: finalTotal,
                    })
                  : t('course.price_in_bd', {
                      price: finalTotal,
                    })}
              </MetropolisSemiBoldText>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
          }}>
          <Checkbox
            isChecked={isTermSelected}
            tintColor={isTermSelected ? color.white : color.green}
            onChange={() => {
              setTermSelected(!isTermSelected);
            }}>
            {/* <Trans i18nKey="common.termsAndCondition"> */}
            <MetropolisMediumText style={{color: color.black, fontSize: 16}}>
              {'I have read and agree to the '}
              <MetropolisMediumText style={{color: color.blue}}>
                terms and conditions.
              </MetropolisMediumText>
            </MetropolisMediumText>
            {/* </Trans> */}
          </Checkbox>
        </View>
        <PaymentComponent />
        <TouchableOpacity
          onPress={onPlaceOrder}
          style={{
            flexDirection: 'row',
            borderRadius: 5,
            marginBottom: 20,
            backgroundColor: color.blue,
            margin: 10,
            padding: 10,
          }}>
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              alignItems: 'center',
              padding: 5,
            }}>
            <MetropolisSemiBoldText style={{color: '#fff'}}>
              {t('common.placeOrder')}
            </MetropolisSemiBoldText>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
  return (
    <MetropolisSemiBoldText
      style={{fontSize: 15, textAlign: 'center', marginTop: 40}}>
      {t('common.noResultFound')}
    </MetropolisSemiBoldText>
  );
};
export default CheckoutProceed;
