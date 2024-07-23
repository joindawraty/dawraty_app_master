import React, {useCallback, useMemo} from 'react';
import {View, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DocumentPicker from 'react-native-document-picker';

import MetropolisSemiBoldText from '../../components/Text/MetropolisSemiBoldText';
import MetropolisRegularText from '../../components/Text/MetropolisRegularText';
import ControlledTextInput from '../../components/ControlledTextInput';
import SearchBarButton from '../../components/SearchBarButton';
import CountryPicker from '../../components/CountryPicker';
import RoundedButton from '../../components/RoundedButton';
import AppTextInput from '../../components/AppTextInput';
import SmallIconBtn from '../../components/SmallIconBtn';
import Password from '../../components/Password';

import {useDispatch} from 'react-redux';
import {authActions} from '../../redux/actions';

import RoutePaths from '../../util/RoutePaths';
import {normalize, vh, vw} from '../../util/dimenstions';
import color from '../../components/color';
import {appConstants} from '../../constants';
import {useTranslation} from 'react-i18next';
import {errorToast, successToast} from '../../util/toastUtils';

const studentSignupSchema = t =>
  yup.object().shape({
    first_name: yup.string().required(t('alertMessage.enterFirstName')),
    last_name: yup.string().required(t('alertMessage.enterLastName')),
    email: yup.string().required(t('alertMessage.enterEmail')),
    password: yup.string().required(t('alertMessage.enterPassword')),
    cpassword: yup.string().required(t('alertMessage.confirmPassword')),
    country_id: yup.string().required(t('common.selectYourCountry')),
  });

const instructorSignupSchema = t =>
  yup.object().shape({
    first_name: yup.string().required(t('alertMessage.enterFirstName')),
    last_name: yup.string().required(t('alertMessage.enterLastName')),
    email: yup.string().required(t('alertMessage.enterEmail')),
    password: yup.string().required(t('alertMessage.enterPassword')),
    cpassword: yup.string().required(t('alertMessage.confirmPassword')),
    country_id: yup.string().required(t('common.selectYourCountry')),
    interest: yup.string().optional(),
    cv: yup
      .object()
      .shape({
        cv_file: yup.mixed().required('Required.'),
        cv_ext: yup.string().required('Required.'),
      })
      .optional(),
  });

const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  country_id: 112,
  password: '',
  cpassword: '',
};

function Register(props) {
  const registrationType = props?.route?.params?.type;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const {
    control,
    handleSubmit,
    formState: {isLoading, isSubmitting},
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(
      registrationType === appConstants.Instructor
        ? instructorSignupSchema(t)
        : studentSignupSchema(t),
    ),
  });

  const onValidFormSubmit = useCallback(
    async validFormValues => {
      try {
        const res = await dispatch(
          authActions.registerRequest({
            ...validFormValues,
            type: registrationType,
          }),
        );
        if (res.payload?.data?.message) {
          successToast(res.payload?.data?.message);
        }
        if (
          res?.type?.includes('fulfilled') &&
          res.payload?.data?.status == 'Success'
        ) {
          const signUpData = res.payload?.data?.data;
          navigation.navigate(RoutePaths.otp, {
            email: validFormValues.email,
            userData: signUpData,
            callResendAPI: false,
          });
        }
      } catch (err) {
        console.log('Error : ', err?.message);
      }
    },
    [dispatch, navigation, registrationType],
  );

  const onInvalidFormSubmit = useCallback(
    invalidFormValues => {
      console.log('Invalid form submission: ', invalidFormValues);
      errorToast(t('alertMessage.pleaseFillTheDetailsProperly'));
    },
    [t],
  );

  const memoizedHandleSubmit = useMemo(
    () => handleSubmit(onValidFormSubmit, onInvalidFormSubmit),
    [handleSubmit, onInvalidFormSubmit, onValidFormSubmit],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <SmallIconBtn
          iconName={'close-outline'}
          backgroundColor={color.white}
          iconColor={color.black}
          iconSize={30}
          onPress={navigation.goBack}
          containerStyle={styles.closeBtn}
        />
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <MetropolisSemiBoldText style={styles.loginTxt}>
            {t('common.signUp')}
          </MetropolisSemiBoldText>
          <MetropolisRegularText style={styles.doNotHaveAnAccTxt}>
            {`${t('common.haveAccount')} `}
            <MetropolisSemiBoldText
              onPress={() => navigation.navigate(RoutePaths.login)}
              style={styles.signupForFree}>
              {t('common.login')}
            </MetropolisSemiBoldText>
          </MetropolisRegularText>

          <MetropolisSemiBoldText style={styles.emailTxt}>
            {t('common.firstName')}
          </MetropolisSemiBoldText>
          <ControlledTextInput control={control} name={'first_name'}>
            <AppTextInput
              style={styles.emailInput}
              placeholder={t('common.firstName')}
            />
          </ControlledTextInput>

          <MetropolisSemiBoldText style={styles.emailTxt}>
            {t('common.lastName')}
          </MetropolisSemiBoldText>
          <ControlledTextInput control={control} name={'last_name'}>
            <AppTextInput
              style={styles.emailInput}
              placeholder={t('common.lastName')}
            />
          </ControlledTextInput>

          <MetropolisSemiBoldText style={styles.emailTxt}>
            {t('common.email')}
          </MetropolisSemiBoldText>
          <ControlledTextInput control={control} name={'email'}>
            <AppTextInput
              style={styles.emailInput}
              placeholder={t('common.yourEmailAddress')}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </ControlledTextInput>

          <MetropolisSemiBoldText style={styles.emailTxt}>
            {t('common.country')}
          </MetropolisSemiBoldText>
          <ControlledTextInput control={control} name={'country_id'}>
            <CountryPicker
              style={{
                borderWidth: 0,
              }}
            />
          </ControlledTextInput>

          <MetropolisSemiBoldText style={styles.passwordTxt}>
            {t('common.password')}
          </MetropolisSemiBoldText>
          <ControlledTextInput control={control} name={'password'}>
            <Password placeholder={t('common.password')} />
          </ControlledTextInput>

          <MetropolisSemiBoldText style={styles.passwordTxt}>
            {t('common.rePassword')}
          </MetropolisSemiBoldText>
          <ControlledTextInput control={control} name={'cpassword'}>
            <Password placeholder={t('common.rePassword')} />
          </ControlledTextInput>

          {registrationType === appConstants.Instructor ? (
            <>
              <MetropolisSemiBoldText style={styles.emailTxt}>
                {t('common.likeToTeach')}
              </MetropolisSemiBoldText>
              <ControlledTextInput control={control} name={'interest'}>
                <AppTextInput
                  style={styles.emailInput}
                  placeholder={'Biology, Pathology'}
                  autoCapitalize="none"
                />
              </ControlledTextInput>

              <MetropolisSemiBoldText style={styles.emailTxt}>
                {t('common.uploadCV')}
              </MetropolisSemiBoldText>
              <ControlledTextInput control={control} name={'cv'}>
                {props => {
                  const {value, onChangeText} = props;
                  return (
                    <SearchBarButton
                      onPress={() => {
                        DocumentPicker.pickSingle({
                          type: [
                            DocumentPicker.types.pdf,
                            DocumentPicker.types.doc,
                            DocumentPicker.types.docx,
                          ],
                        })
                          .then(res => {
                            console.log('pickSingle Res : ', res);
                            onChangeText({
                              cv_file: res.uri,
                              cv_ext: res.type?.split('/')?.[1],
                            });
                          })
                          .catch(err => {
                            console.log('pickSingle catch : ', err);
                          });
                      }}
                      placeholder={
                        value?.cv_file?.substring(
                          value?.cv_file?.lastIndexOf('/') + 1,
                        ) ?? 'Select File'
                      }
                    />
                  );
                }}
              </ControlledTextInput>
            </>
          ) : null}

          <RoundedButton
            bgColor={color.blue}
            textColor={color.white}
            text={t('common.register')}
            onPress={memoizedHandleSubmit}
            style={styles.loginBtn}
            textStyle={styles.loginBtnTxt}
            isLoading={isLoading || isSubmitting}
            iconName={''}
            light={true}
          />
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
  },
  closeBtn: {
    alignSelf: 'flex-end',
  },
  loginTxt: {
    fontSize: normalize(22),
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: vh(30),
  },
  doNotHaveAnAccTxt: {
    fontSize: 13,
    textAlign: 'center',
    alignSelf: 'center',
    marginVertical: vh(15),
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
    marginTop: 15,
  },
  emailInput: {
    backgroundColor: '#eee',
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
    marginTop: 15,
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
    marginHorizontal: 5,
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

export default Register;
