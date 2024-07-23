import React, {useState} from 'react';
import {View, TouchableOpacity, SafeAreaView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import MetropolisSemiBoldText from '../../components/Text/MetropolisSemiBoldText';
import MetropolisRegularText from '../../components/Text/MetropolisRegularText';
import RoundedButton from '../../components/RoundedButton';
import AppTextInput from '../../components/AppTextInput';

import {CloseIcon} from 'native-base';
import {Style} from '../../assets/Styles/Style';
import {authActions} from '../../redux/actions';
import RoutePaths from '../../util/RoutePaths';
import color from '../../components/color';
import {errorToast, successToast} from '../../util/toastUtils';

function ForgotPassword(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      if (!email || !email.trim()) {
        errorToast(t('alertMessage.enterEmail'));
        return;
      }
      setLoading(true);
      const res = await dispatch(
        authActions.forgotPasswordRequest({
          email: email.trim(),
        }),
      );
      if (res?.type?.includes('fulfilled')) {
        if (res?.payload?.data?.message) {
          successToast(res?.payload?.data?.message);
        }
        const resData = res.payload?.data?.data;
        if (resData) {
          navigation.navigate(RoutePaths.otp, {
            email: email,
            isForgot: true,
          });
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(
        '[submit] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flex: 1,
          padding: 16,
        }}>
        <TouchableOpacity
          onPress={navigation.goBack}
          style={{padding: 10, marginLeft: 16, alignSelf: 'flex-end'}}>
          <CloseIcon style={{color: '#000'}} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <MetropolisSemiBoldText
            style={{
              fontSize: 18,
              alignSelf: 'center',
            }}>
            {t('common.forgetPassword')}
          </MetropolisSemiBoldText>
          <MetropolisRegularText
            style={{
              alignSelf: 'center',
              marginTop: 16,
            }}>
            {
              'Please enter your username or email address. You will receive a link to create a new password via email.'
            }
          </MetropolisRegularText>

          <MetropolisSemiBoldText
            style={{
              marginTop: 24,
            }}>
            {t('common.email')}
          </MetropolisSemiBoldText>
          <AppTextInput
            style={Style.textemail}
            placeholder={t('common.yourEmailAddress')}
            keyboardType="email-address"
            onChangeText={text => setEmail(text)}
          />
          <RoundedButton
            bgColor={color.blue}
            textColor={color.white}
            text={t('common.submit')}
            onPress={submit}
            style={{
              marginTop: 16,
              maxHeight: 40,
              width: 80,
              alignSelf: 'center',
              marginBottom: 16,
            }}
            isLoading={loading}
            iconName={''}
            light={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ForgotPassword;
