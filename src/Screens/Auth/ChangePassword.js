// export default Login
import React, {useCallback, useMemo} from 'react';
import {View, TouchableOpacity, SafeAreaView} from 'react-native';
import {useDispatch} from 'react-redux';
import {CloseIcon} from 'native-base';
import {Style} from '../../assets/Styles/Style';
import RoundedButton from '../../components/RoundedButton';
import {authActions} from '../../redux/actions';
import Password from '../../components/Password';
import ControlledTextInput from '../../components/ControlledTextInput';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useTranslation} from 'react-i18next';
import MetropolisSemiBoldText from '../../components/Text/MetropolisSemiBoldText';
import color from '../../components/color';
import MetropolisBoldText from '../../components/Text/MetropolisBoldText';
import RoutePaths from '../../util/RoutePaths';
import {successToast} from '../../util/toastUtils';

const passwordSchema = t =>
  yup.object().shape({
    password: yup.string().required(t('alertMessage.enterPassword')),
    confirmPassword: yup.string().required(t('alertMessage.confirmPassword')),
  });

const ChangePassword = ({navigation, route}) => {
  const email = route.params.email;

  const dispatch = useDispatch();
  const {t} = useTranslation();

  const {
    control,
    handleSubmit,
    formState: {isLoading, isSubmitting},
  } = useForm({
    defaultValues: {
      confirmPassword: '',
      password: '',
    },
    resolver: yupResolver(passwordSchema(t)),
  });

  const onValidFormSubmit = useCallback(
    async validFormValues => {
      try {
        const {confirmPassword, password} = validFormValues;
        const res = await dispatch(
          authActions.setNewPasswordRequest(
            email
              ? {
                  new_password: password,
                  confirm_password: confirmPassword,
                }
              : {
                  old_password: '',
                  new_password: password,
                  confirm_password: confirmPassword,
                },
          ),
        );
        if (res?.type?.includes('fulfilled')) {
          if (res.payload?.data?.message) {
            successToast(res.payload?.data?.message);
          }
          navigation.navigate(RoutePaths.login);
        }
      } catch (err) {
        console.log('Error : ', err?.message);
      }
    },
    [dispatch, email, navigation],
  );

  const onInvalidFormSubmit = useCallback(invalidFormValues => {
    console.log('Invalid form submission: ', invalidFormValues);
  }, []);

  const memoizedHandleSubmit = useMemo(() => {
    return handleSubmit(onValidFormSubmit, onInvalidFormSubmit);
  }, [handleSubmit, onInvalidFormSubmit, onValidFormSubmit]);

  return (
    <SafeAreaView style={{flex: 1, padding: 10, backgroundColor: '#fff'}}>
      <TouchableOpacity
        onPress={navigation.goBack}
        style={{marginLeft: 16, padding: 10}}>
        <CloseIcon style={{color: '#000'}} />
      </TouchableOpacity>
      <View style={{flex: 1, paddingHorizontal: 16, justifyContent: 'center'}}>
        <MetropolisBoldText
          style={{
            alignSelf: 'center',
            fontSize: 16,
            color: color.blue,
          }}>
          {'Set New Password'}
        </MetropolisBoldText>

        <MetropolisSemiBoldText style={Style.textinputbox}>
          {t('common.password')}
        </MetropolisSemiBoldText>
        <ControlledTextInput control={control} name={'password'}>
          <Password
            placeholder={t('common.password')}
            container={Style.passwordText}
          />
        </ControlledTextInput>

        <MetropolisSemiBoldText style={Style.textinputbox}>
          {t('common.rePassword')}
        </MetropolisSemiBoldText>
        <ControlledTextInput control={control} name={'confirmPassword'}>
          <Password
            placeholder={t('common.rePassword')}
            container={Style.passwordText}
          />
        </ControlledTextInput>

        <RoundedButton
          bgColor={color.blue}
          textColor={color.white}
          text={t('common.submit')}
          onPress={memoizedHandleSubmit}
          style={{
            marginTop: 24,
            maxHeight: 40,
            width: 80,
            alignSelf: 'center',
            marginBottom: 16,
          }}
          isLoading={isLoading || isSubmitting}
          iconName={''}
          light={true}
        />
      </View>
    </SafeAreaView>
  );
};
// const mapStateToProps = state => ({
//   error: state.LoginReducer.error,
//   user: state.LoginReducer.data,
//   loading: state.LoaderReducer.loader,
// });

// const mapDispatchToProps = () => ({});

export default ChangePassword;
