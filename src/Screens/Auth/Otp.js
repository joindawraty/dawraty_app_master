import React, {useState, useEffect, useCallback} from 'react';
import {View, TouchableOpacity, SafeAreaView} from 'react-native';
import {CommonActions, StackActions} from '@react-navigation/native';
import {CloseIcon} from 'native-base';
import moment from 'moment';

import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import AppTextInput from '../../components/AppTextInput';
import MetropolisSemiBoldText from '../../components/Text/MetropolisSemiBoldText';
import MetropolisMediumText from '../../components/Text/MetropolisMediumText';
import RoundedButton from '../../components/RoundedButton';

import {saveData} from '../../redux/slices/userSlices';
import {authActions} from '../../redux/actions';
import {useLoading} from '../../context/Loading/LoadingContext';

import RoutePaths from '../../util/RoutePaths';
import {AuthApis} from '../../services';
import {Style} from '../../assets/Styles/Style';
import color from '../../components/color';
import {errorToast, successToast} from '../../util/toastUtils';

const Otp = ({navigation, route}) => {
  const email = route.params && route.params.email;
  const userData = route.params && route.params.userData;
  const isForgot = route.params && route.params.isForgot;

  const {t} = useTranslation();

  const dispatch = useDispatch();
  const [otp, setOtp] = useState(null);
  const {setIsLoading} = useLoading();

  const [timer, setTimer] = useState(20); // Initial timer value in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(isForgot ?? false);

  useEffect(() => {
    if (route.params.callResendAPI) {
      onResend();
    }
  }, [route.params, onResend]);

  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      const timeout = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);

      return () => clearTimeout(timeout);
    } else {
      setIsTimerRunning(false);
      setTimer(20); // Reset timer to 60 seconds
    }
  }, [isTimerRunning, timer]);

  const submit = async () => {
    try {
      setIsLoading(true);
      const res = await dispatch(
        authActions.otpVerifyRequest({
          otp: otp,
        }),
      );
      if (res?.type?.includes('fulfilled')) {
        if (userData) {
          var newData = {
            ...userData,
            ...{
              user: {
                ...userData.user,
                email_verified_at: moment().format('YYYY-MM-DDTHH:mm:ss'),
              },
            },
          };
          dispatch(saveData(newData));
        }
        if (res?.payload?.data?.message) {
          successToast(res?.payload?.data?.message);
        }
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: RoutePaths.home}],
          }),
        );
      }
      setIsLoading(false);
    } catch (err) {
      console.log(
        '[submit] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
      setIsLoading(false);
    }
  };

  const forgotSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await AuthApis.forgotVerifyOtp({
        email: email,
        otp: otp,
      });
      console.log('forgotSubmit: ', JSON.stringify(res?.data));
      if (res?.data?.status === 'Success') {
        if (res?.data?.message) {
          successToast(res?.data?.message);
        }
        navigation.dispatch(
          StackActions.replace(RoutePaths.changePassword, {
            email: email,
          }),
        );
      }
      setIsLoading(false);
    } catch (err) {
      errorToast(err?.response?.data?.message ?? t('alertMessage.wrong'));
      setIsLoading(false);
    }
  };

  const onResend = useCallback(async () => {
    try {
      if (isTimerRunning) {
        return;
      }
      setIsLoading(true);
      const res = await dispatch(
        authActions.forgotPasswordRequest({
          forgot: true,
          email: email,
        }),
      );
      if (res?.type?.includes('fulfilled')) {
        if (res?.payload?.data?.message) {
          successToast(res?.payload?.data?.message);
        }
      }
      setIsLoading(false);
      setIsTimerRunning(true);
    } catch (err) {
      console.log(
        '[onResend] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
      setIsLoading(false);
      setIsTimerRunning(true);
    }
  }, [dispatch, email, isTimerRunning, setIsLoading]);

  return (
    <SafeAreaView style={{flex: 1, padding: 10, backgroundColor: '#fff'}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{flex: 0.4, alignItems: 'flex-end', margin: 20}}>
        <CloseIcon style={{color: '#000'}} />
      </TouchableOpacity>
      <View style={{flex: 1, paddingHorizontal: 16}}>
        <MetropolisSemiBoldText
          style={{
            fontSize: 16,
            alignSelf: 'center',
          }}>
          {'Verification Code'}
        </MetropolisSemiBoldText>
        <MetropolisMediumText
          style={{
            marginTop: 16,
            alignSelf: 'center',
            textAlign: 'center',
          }}>
          {'Please enter the verification code sent to your registered Email'}
        </MetropolisMediumText>

        <AppTextInput
          placeholder={'Otp'}
          style={[Style.textemail, {marginTop: 16}]}
          // value={otp}
          keyboardType="number-pad"
          secureTextEntry
          onChangeText={txt => setOtp(txt)}
        />
        <MetropolisMediumText
          style={[Style.font14, {textAlign: 'center', marginTop: 16}]}>
          {"Didn't receive an OTP?"}
        </MetropolisMediumText>
        <MetropolisSemiBoldText
          onPress={onResend}
          style={{
            textDecorationLine: 'underline',
            color: color.black,
            marginTop: 16,
            alignSelf: 'center',
          }}>
          {isTimerRunning
            ? 'Resend OTP in ' + timer + ' seconds'
            : 'Resend OTP'}
        </MetropolisSemiBoldText>
        {/* <RoundedButton
          bgColor={color.blue}
          textColor={color.white}
          text={t('common.submit')}
          onPress={() => {
            isForgot ? forgotSubmit() : submit();
          }}
          style={Style.loginbutton}
          textStyle={Style.loginbuttontext}
          iconName={''}
          light={true}
        /> */}
        <RoundedButton
          bgColor={color.blue}
          textColor={color.white}
          text={t('common.submit')}
          onPress={() => {
            isForgot ? forgotSubmit() : submit();
          }}
          style={{
            marginTop: 16,
            maxHeight: 40,
            // width: 80,
            alignSelf: 'center',
            marginBottom: 16,
          }}
          isLoading={false}
          iconName={''}
          light={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default Otp;
