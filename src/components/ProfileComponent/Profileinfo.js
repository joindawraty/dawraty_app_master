import React, {useCallback, useMemo} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MetropolisMediumText from '../Text/MetropolisMediumText';
import InputWithTitle from '../InputWithTitle';
import ControlledTextInput from '../ControlledTextInput';
import RoundedButton from '../RoundedButton';
import CountryPicker from '../CountryPicker';
import ImageUpload from './Imageupload';
import color from '../color';
import {updateProfileRequest} from '../../redux/actions/authActions';
import {successToast} from '../../util/toastUtils';

const profileSchema = yup.object().shape({
  // thumbnail: yup.string().required('Required.'),
  first_name: yup.string().required('Required.'),
  last_name: yup.string().required('Required.'),
  country_id: yup.string().required('Required.'),
  mobile_number: yup.number().required('Required.'),
  email: yup.string().required('Required.'),
});

const ProfileInfo = props => {
  const {userData} = props;

  const {t} = useTranslation();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {isLoading, isSubmitting},
  } = useForm({
    defaultValues: {
      thumbnail: '',
      first_name: '',
      last_name: '',
      country_id: 112,
      mobile_number: '',
      email: '',
    },
    values: {
      thumbnail: userData?.user?.img_path ?? '',
      first_name: userData?.user?.first_name ?? '',
      last_name: userData?.user?.last_name ?? '',
      country_id: +userData?.user?.country_id || 112,
      mobile_number: userData?.user?.mobile_number ?? '',
      email: userData?.user?.email ?? '',
    },
    resolver: yupResolver(profileSchema),
    reValidateMode: 'onChange',
  });

  const onValidFormSubmit = useCallback(
    async validFormValues => {
      try {
        const {first_name, last_name, mobile_number} = validFormValues;
        const payload = {
          ...validFormValues,
          first_name: first_name.trim(),
          last_name: last_name.trim(),
          mobile_number: mobile_number.trim(),
        };
        const res = await dispatch(updateProfileRequest(payload));
        if (res?.type?.includes('fulfilled')) {
          if (res.payload?.data?.message) {
            successToast('User updated successfully');
          }
        }
      } catch (err) {
        console.log('Error : ', err?.message);
      }
    },
    [dispatch],
  );

  const onInvalidFormSubmit = useCallback(invalidFormValues => {
    console.log('Invalid form submission: ', invalidFormValues);
  }, []);

  const memoizedHandleSubmit = useMemo(
    () => handleSubmit(onValidFormSubmit, onInvalidFormSubmit),
    [handleSubmit, onInvalidFormSubmit, onValidFormSubmit],
  );

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={{flex: 1}}>
              <MetropolisMediumText>
                {t('common.firstName')}
              </MetropolisMediumText>
              <ControlledTextInput control={control} name={'first_name'}>
                <InputWithTitle title="" hideErrorMsg={true} />
              </ControlledTextInput>
              <MetropolisMediumText>
                {t('common.lastName')}
              </MetropolisMediumText>
              <ControlledTextInput control={control} name={'last_name'}>
                <InputWithTitle title="" hideErrorMsg={true} />
              </ControlledTextInput>
              <MetropolisMediumText>
                {t('common.selectYourCountry')}
              </MetropolisMediumText>
              <ControlledTextInput control={control} name={'country_id'}>
                <CountryPicker
                  style={{
                    backgroundColor: color.white,
                    marginBottom: 10,
                  }}
                  hideErrorMsg
                />
              </ControlledTextInput>
            </View>
            <ControlledTextInput control={control} name={'thumbnail'}>
              <ImageUpload />
            </ControlledTextInput>
          </View>
          <View
            style={{
              zIndex: -100,
            }}>
            <MetropolisMediumText>
              {t('common.mobileNumber')}
            </MetropolisMediumText>
            <ControlledTextInput control={control} name={'mobile_number'}>
              <InputWithTitle
                title=""
                hideErrorMsg={true}
                keyboardType="phone-pad"
              />
            </ControlledTextInput>
            <ControlledTextInput
              editable={false}
              control={control}
              name={'email'}>
              <InputWithTitle
                title={t('common.email')}
                hideErrorMsg={true}
                numberOfLines={1}
                multiline={false}
                editable={false}
                style={{
                  backgroundColor: color.grey,
                }}
              />
            </ControlledTextInput>
          </View>
        </View>
      </View>
      <RoundedButton
        bordered={false}
        bgColor={color.blue}
        textColor={color.white}
        text={t('common.save')}
        onPress={memoizedHandleSubmit}
        isLoading={isLoading || isSubmitting}
        iconName={''}
        light={true}
        style={{
          marginTop: 20,
          marginBottom: 30,
          height: 50,
          zIndex: -100,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileInfo;
