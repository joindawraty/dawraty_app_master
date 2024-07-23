// export default Login
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Checkbox} from 'native-base';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import MetropolisSemiBoldText from '../../components/Text/MetropolisSemiBoldText';
import MetropolisRegularText from '../../components/Text/MetropolisRegularText';
import ControlledTextInput from '../../components/ControlledTextInput';
import RoundedButton from '../../components/RoundedButton';
import AppTextInput from '../../components/AppTextInput';
import SmallIconBtn from '../../components/SmallIconBtn';
import Password from '../../components/Password';

import {useDispatch} from 'react-redux';
import {authActions} from '../../redux/actions';
import {
  addBulkItemToCartService,
  getCartItemsRequest,
} from '../../redux/actions/cartActions';

import RoutePaths from '../../util/RoutePaths';
import {appConstants} from '../../constants';
import {normalize, vh, vw} from '../../util/dimenstions';
import color from '../../components/color';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../../redux/store';
import {successToast} from '../../util/toastUtils';

const loginSchema = yup.object().shape({
  email: yup.string().required('Required'),
  password: yup.string().required('Required.'),
  rememberMe: yup.boolean().optional(),
});

function Login(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  // const {data: cartData} = useSelector(state => state.cart);
  const [rememberData, setRememberData] = useState(null);
  const {
    control,
    handleSubmit,
    formState: {isLoading, isSubmitting},
  } = useForm({
    defaultValues: {
      email: '', //mufaddal.instructor@mailinator.com
      password: '', //password
      rememberMe: false,
    },
    values: {
      email: rememberData ? rememberData.email : '', //mufaddal.instructor@mailinator.com
      password: rememberData ? rememberData.password : '', //password
      rememberMe: rememberData ? true : false,
    },
    resolver: yupResolver(loginSchema),
  });

  const getData = async () => {
    const data = await AsyncStorage.getItem('REMEMBERED_CREDENTIALS');
    if (data) {
      setRememberData(JSON.parse(data));
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const onValidFormSubmit = useCallback(
    async validFormValues => {
      try {
        const {email, password, rememberMe} = validFormValues;
        const res = await dispatch(
          authActions.loginRequest({
            email: email,
            password: password,
          }),
        );

        if (res.payload?.data?.message) {
          successToast(res.payload?.data?.message);
        }

        if (res?.type?.includes('fulfilled')) {
          // if (rememberMe) {
          await AsyncStorage.setItem(
            'REMEMBERED_CREDENTIALS',
            JSON.stringify({
              email: email,
              password: password,
            }),
          );
          // } else {
          //   await AsyncStorage.removeItem('REMEMBERED_CREDENTIALS');
          // }

          const loginData = res.payload?.data?.data;
          if (loginData && loginData.user.email_verified_at != null) {
            if (loginData?.user?.type === appConstants.Student) {
              try {
                const arr = [dispatch(getCartItemsRequest())];
                const cartData = store.getState().cart?.data ?? [];
                if (cartData?.length) {
                  arr.push(
                    dispatch(
                      addBulkItemToCartService(
                        cartData.map(course => course?.id),
                      ),
                    ),
                  );
                }
                Promise.allSettled(arr);
              } catch (err) {
                console.log('[post login process] Error : ', err);
              }
            }
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: RoutePaths.home}],
              }),
            );
          } else {
            navigation.navigate(RoutePaths.otp, {
              email: loginData?.user?.email,
              userData: loginData,
              callResendAPI: false,
              isForgot: false,
            });
          }
        }
      } catch (err) {
        console.log('Error : ', err?.message);
      }
    },
    [dispatch, navigation],
  );

  const onInvalidFormSubmit = useCallback(invalidFormValues => {
    console.log('Invalid form submission: ', invalidFormValues);
  }, []);

  const memoizedHandleSubmit = useMemo(
    () => handleSubmit(onValidFormSubmit, onInvalidFormSubmit),
    [handleSubmit, onInvalidFormSubmit, onValidFormSubmit],
  );

  const loginHandler = async () => {
    // login with google here
    successToast('Coming soon');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* <SmallIconBtn
          iconName={'close-outline'}
          backgroundColor={color.white}
          iconColor={color.black}
          iconSize={30}
          onPress={navigation.goBack}
          containerStyle={styles.closeBtn}
        /> */}
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <MetropolisSemiBoldText style={styles.loginTxt}>
            {t('common.login')}
          </MetropolisSemiBoldText>
          <MetropolisRegularText style={styles.doNotHaveAnAccTxt}>
            {`${t('common.notHaveAccount')} `}
            <MetropolisSemiBoldText
              onPress={() =>
                navigation.navigate(RoutePaths.register, {
                  type: appConstants.Student,
                })
              }
              style={styles.signupForFree}>
              {t('common.signUp')}
            </MetropolisSemiBoldText>
          </MetropolisRegularText>

          <MetropolisSemiBoldText style={styles.emailTxt}>
            {t('common.email')}
          </MetropolisSemiBoldText>
          <ControlledTextInput control={control} name={'email'}>
            <AppTextInput
              style={styles.emailInput}
              placeholder={t('common.yourEmailAddress')}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={'#CACACA'}
            />
          </ControlledTextInput>

          <MetropolisSemiBoldText style={styles.passwordTxt}>
            {t('common.password')}
          </MetropolisSemiBoldText>
          <ControlledTextInput control={control} name={'password'}>
            <Password />
          </ControlledTextInput>

          <View style={styles.rememberAndForgotContainer}>
            <Controller
              name="rememberMe"
              control={control}
              render={({field, fieldState, formState}) => {
                return (
                  <Checkbox
                    isChecked={field.value}
                    backgroundColor={!field.value ? color.grey : color.blue}
                    borderWidth={0}
                    size="sm"
                    tintColor={field.value ? color.white : color.green}
                    onChange={field.onChange}>
                    <MetropolisRegularText>
                      {t('common.rememberMe')}
                    </MetropolisRegularText>
                  </Checkbox>
                );
              }}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate(RoutePaths.forgotPassword)}
              style={{}}>
              <MetropolisSemiBoldText style={styles.forgotPasswordTxt}>
                {t('common.forgetPassword')}
              </MetropolisSemiBoldText>
            </TouchableOpacity>
          </View>

          <RoundedButton
            bgColor={color.blue}
            textColor={color.white}
            text={t('common.login')}
            onPress={memoizedHandleSubmit}
            style={styles.loginBtn}
            textStyle={styles.loginBtnTxt}
            isLoading={isLoading || isSubmitting}
            iconName={''}
            light={true}
          />
          {/* <View style={styles.orContainer}>
            <View style={styles.orLine} />
            <MetropolisRegularText style={styles.orTxt}>
              {'OR'}
            </MetropolisRegularText>
            <View style={styles.orLine} />
          </View>
          <TouchableOpacity onPress={loginHandler} style={styles.googleBtn}>
            <Image source={images.slider.google} style={styles.googleImg} />
            <MetropolisMediumText
              style={[
                styles.loginBtnTxt,
                {
                  flexDirection: i18n.language === 'ar' ? 'row-reverse' : 'row',
                },
              ]}>
              {'Google'}
            </MetropolisMediumText>
          </TouchableOpacity> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 15,
    justifyContent: 'center',
  },
  closeBtn: {
    alignSelf: 'flex-end',
  },
  loginTxt: {
    fontSize: normalize(22),
    textAlign: 'center',
    alignSelf: 'center',
  },
  doNotHaveAnAccTxt: {
    fontSize: 13,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: vh(15),
    color: `${color.black}80`,
  },
  signupForFree: {
    color: color.black,
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  emailTxt: {
    color: color.blue,
    fontSize: 16,
    marginTop: 35,
  },
  emailInput: {
    backgroundColor: '#eee',
    width: '100%',
  },
  passwordTxt: {
    color: color.blue,
    fontSize: 16,
    marginTop: 15,
  },
  rememberAndForgotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 25,
  },
  forgotPasswordTxt: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  loginBtn: {
    maxHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtnTxt: {
    fontSize: 16,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#dfdfdf',
  },
  orContainer: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  orTxt: {
    fontSize: 12,
    marginHorizontal: 10,
    color: `${color.black}80`,
  },
  googleBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 5,
    flexDirection: 'row',
    height: vh(50),
    width: vw(370),
    alignSelf: 'center',
    marginTop: vh(10),
    borderColor: '#f0f0f0',
  },
  googleImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
});

export default Login;
