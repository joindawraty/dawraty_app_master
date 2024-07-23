import React, {useEffect, useMemo, useState} from 'react';
import {View, ScrollView} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';

import MetropolisMediumText from '../../components/Text/MetropolisMediumText';
import ControlledTextInput from '../../components/ControlledTextInput';
import InputWithTitle from '../../components/InputWithTitle';
import RoundedButton from '../../components/RoundedButton';
import color from '../../components/color';
import {Style} from '../../assets/Styles/Style';
import {useLoading} from '../../context/Loading/LoadingContext';
import {addAddressAPI, getCoutriesAPI} from '../../services/checkout_api';
import {appConstants} from '../../constants';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {errorToast, successToast} from '../../util/toastUtils';
import {useSelector} from 'react-redux';

const addAddressSchema = yup.object().shape({
  category: yup.string().required('Required'),
  country: yup.string().required('Required'),

  // if selected country is not kuwait
  block: yup
    .string()
    .when('country', (country, field) =>
      +country === 112 ? field.required('Required') : field,
    ),
  street: yup
    .string()
    .when('country', (country, field) =>
      +country === 112 ? field.required('Required') : field,
    ),
  houseAndBuilding: yup
    .string()
    .when('country', (country, field) =>
      +country === 112 ? field.required('Required') : field,
    ),
  apartment: yup.string().optional(),
  area: yup
    .string()
    .when('country', (country, field) =>
      +country === 112 ? field.required('Required') : field,
    ),
  directions: yup.string().optional(),

  // if selected country is kuwait
  address: yup
    .string()
    .when('country', (country, field) =>
      country != '112' ? field.required('Required') : field,
    ),
  state: yup
    .string()
    .when('country', (country, field) =>
      country != '112' ? field.required('Required') : field,
    ),
  city: yup
    .string()
    .when('country', (country, field) =>
      country != '112' ? field.required('Required') : field,
    ),
  pinCode: yup
    .string()
    .when('country', (country, field) =>
      country != '112' ? field.required('Required') : field,
    ),
});

const AddAddress = ({route, navigation}) => {
  const {userData} = useSelector(state => state.user);

  const {
    control,
    handleSubmit,
    watch,
    formState: {isLoading, isSubmitting},
  } = useForm({
    defaultValues: {
      category: '',
      block: '',
      street: '',
      houseAndBuilding: '',
      apartment: '',
      area: '',
      country: userData.user.country_id,
      directions: '',

      address: '',
      state: '',
      city: '',
      pinCode: '',
    },
    resolver: yupResolver(addAddressSchema),
  });

  const country = watch('country');

  const [countryList, setCountryList] = useState([]);

  const [openCountry, setOpenCountry] = useState(false);
  const [openArea, setOpenArea] = useState(false);

  const safeAreaInsets = useSafeAreaInsets();
  const {setIsLoading} = useLoading();
  const {t} = useTranslation();

  const getAddresses = async () => {
    try {
      setIsLoading(true);
      const response = await getCoutriesAPI();
      setIsLoading(false);
      if (response && response.data && response.data.success) {
        const array = response.data.data;
        setCountryList(
          array.map(item => {
            return {
              ...item,
              value: item.id + '',
              label: item.name,
            };
          }),
        );
      }
    } catch (err) {
      console.log(
        '[getAddresses] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
    }
  };

  useEffect(() => {
    getAddresses();
  }, []);

  const areaList = useMemo(() => {
    return appConstants.cities.map((item, index) => {
      return {
        value: index + '',
        label: item,
      };
    });
  }, []);

  const onAddAddress = async validAddressValues => {
    try {
      const {
        apartment,
        area,
        block,
        category,
        country,
        directions,
        houseAndBuilding,
        street,

        address,
        state,
        city,
        pinCode,
      } = validAddressValues;
      const payload =
        +country === 112
          ? {
              category,
              block,
              street,
              house: houseAndBuilding,
              apartment,
              city: area,
              directions,
              country_id: country,
            }
          : {
              category,
              country_id: country,
              address,
              state,
              city,
              pin_code: pinCode,
            };
      setIsLoading(true);
      const response = await addAddressAPI(payload);
      setIsLoading(false);
      if (response && response.data && response.data.success) {
        navigation.pop();
      }
      if (response?.data?.message) {
        successToast(response?.data?.message);
      }
    } catch (err) {
      console.log(
        '[onAddAddress] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
      if (typeof err?.response?.data?.message === 'object') {
        const keys = Object.keys(err?.response?.data?.message);
        const message = err?.response?.data?.message?.[keys?.[0]];
        if (message) {
          errorToast(message);
        }
      }
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: color.white,
      }}>
      <ControlledTextInput
        key={t('common.category')}
        control={control}
        name="category">
        <InputWithTitle
          title={t('common.category')}
          placeholder={t('common.homeCompanyPent')}
          inputStyle={{borderWidth: 1.5}}
          hideErrorMsg
        />
      </ControlledTextInput>
      {+country === 112 ? (
        <>
          <ControlledTextInput
            key={t('common.block')}
            control={control}
            name="block">
            <InputWithTitle
              title={t('common.block')}
              placeholder={t('common.block')}
              inputStyle={{borderWidth: 1.5}}
              hideErrorMsg
            />
          </ControlledTextInput>
          <ControlledTextInput
            key={t('common.street')}
            control={control}
            name="street">
            <InputWithTitle
              title={t('common.street')}
              placeholder={t('common.street')}
              inputStyle={{borderWidth: 1.5}}
              hideErrorMsg
            />
          </ControlledTextInput>

          <ControlledTextInput
            key={t('common.houseBuilding')}
            control={control}
            name="houseAndBuilding">
            <InputWithTitle
              title={t('common.houseBuilding')}
              placeholder={t('common.houseBuilding')}
              hideErrorMsg
            />
          </ControlledTextInput>

          <ControlledTextInput
            key={t('common.apartment')}
            control={control}
            name="apartment">
            <InputWithTitle
              title={t('common.apartment')}
              placeholder={t('common.apartment')}
            />
          </ControlledTextInput>

          <MetropolisMediumText>{t('common.chooseArea')}</MetropolisMediumText>
          <ControlledTextInput
            key={`area-${openArea ? 1 : 0}${areaList?.length}${t(
              'common.chooseArea',
            )}`}
            control={control}
            name="area"
            children={({value, onChangeText, error}) => {
              return (
                <DropDownPicker
                  items={areaList}
                  style={{
                    ...Style.textemailsmall,
                    marginBottom: 20,
                    backgroundColor: color.white,
                    borderColor: error ? color.red : color.blue,
                  }}
                  textStyle={{
                    textAlign: 'left',
                  }}
                  arrowColor={color.Lefticon}
                  arrowSize={10}
                  value={value}
                  placeholder={t('common.chooseArea')}
                  placeholderTextColor={'#CACACA'}
                  open={openArea}
                  listMode="SCROLLVIEW"
                  setOpen={setOpenArea}
                  setValue={getSelectedValue => {
                    console.log(getSelectedValue());
                    onChangeText(getSelectedValue());
                  }}
                  dropDownDirection="TOP"
                  zIndex={10}
                  closeOnBackPressed
                  zIndexInverse={11}
                />
              );
            }}
          />

          <View
            style={{
              position: 'relative',
              zIndex: 100,
            }}>
            <MetropolisMediumText>
              {t('common.selectYourCountry')}
            </MetropolisMediumText>
            <ControlledTextInput
              key={`country-${openCountry ? 1 : 0}${countryList?.length}${t(
                'common.selectYourCountry',
              )}`}
              control={control}
              name="country"
              children={({value, onChangeText, error}) => {
                return (
                  <DropDownPicker
                    items={countryList}
                    style={{
                      ...Style.textemailsmall,
                      marginBottom: 20,
                      backgroundColor: color.white,
                      borderColor: error ? color.red : color.blue,
                    }}
                    closeOnBackPressed
                    textStyle={{
                      textAlign: 'left',
                    }}
                    zIndex={10000}
                    zIndexInverse={110000}
                    arrowColor={color.Lefticon}
                    arrowSize={10}
                    value={'' + value}
                    dropDownDirection="TOP"
                    placeholder={t('common.selectYourCountry')}
                    placeholderTextColor={'#CACACA'}
                    open={openCountry}
                    listMode="SCROLLVIEW"
                    setOpen={setOpenCountry}
                    setValue={getSelectedValue => {
                      onChangeText(getSelectedValue());
                    }}
                  />
                );
              }}
            />
          </View>
          <ControlledTextInput
            key={t('common.jaddahDirections')}
            control={control}
            name="directions">
            <InputWithTitle
              title={t('common.jaddahDirections')}
              placeholder={t('common.jaddahDirections')}
              multiline
              style={{
                height: 100,
                borderColor: color.blue,
                borderWidth: 1.5,
                paddingVertical: 8,
              }}
            />
          </ControlledTextInput>
        </>
      ) : (
        <>
          <ControlledTextInput
            key={t('common.state')}
            control={control}
            name="state">
            <InputWithTitle
              title={t('common.state')}
              placeholder={t('common.state')}
              hideErrorMsg
            />
          </ControlledTextInput>
          <ControlledTextInput
            key={t('common.city')}
            control={control}
            name="city">
            <InputWithTitle
              title={t('common.city')}
              placeholder={t('common.city')}
              hideErrorMsg
            />
          </ControlledTextInput>
          <ControlledTextInput
            key={t('common.address')}
            control={control}
            name="address">
            <InputWithTitle
              title={t('common.address')}
              placeholder={t('common.address')}
              hideErrorMsg
            />
          </ControlledTextInput>
          <ControlledTextInput
            key={t('common.pinCode')}
            control={control}
            name="pinCode">
            <InputWithTitle
              title={t('common.pinCode')}
              placeholder={t('common.pinCode')}
              hideErrorMsg
              keyboardType="number-pad"
            />
          </ControlledTextInput>
          <View
            style={{
              position: 'relative',
              zIndex: 100,
            }}>
            <MetropolisMediumText>
              {t('common.selectYourCountry')}
            </MetropolisMediumText>
            <ControlledTextInput
              key={`country-${openCountry ? 1 : 0}${t(
                'common.selectYourCountry',
              )}`}
              control={control}
              name="country"
              children={({value, onChangeText, error}) => {
                return (
                  <DropDownPicker
                    items={countryList}
                    style={{
                      ...Style.textemailsmall,
                      marginBottom: 20,
                      backgroundColor: color.white,
                      borderColor: error ? color.red : color.blue,
                    }}
                    closeOnBackPressed
                    textStyle={{
                      textAlign: 'left',
                    }}
                    zIndex={10000}
                    zIndexInverse={110000}
                    arrowColor={color.Lefticon}
                    arrowSize={10}
                    value={'' + value}
                    dropDownDirection="TOP"
                    placeholder={t('common.selectYourCountry')}
                    placeholderTextColor={'#CACACA'}
                    open={openCountry}
                    listMode="SCROLLVIEW"
                    setOpen={setOpenCountry}
                    setValue={getSelectedValue => {
                      console.log(getSelectedValue());
                      onChangeText(getSelectedValue());
                    }}
                  />
                );
              }}
            />
          </View>
        </>
      )}

      <RoundedButton
        bordered={false}
        bgColor={color.blue}
        textColor={color.white}
        text={t('common.add')}
        onPress={handleSubmit(onAddAddress)}
        style={{
          marginTop: 20,
          marginBottom: safeAreaInsets.bottom + 10,
        }}
        textStyle={{
          paddingVertical: 15,
        }}
        isLoading={false}
        iconName={''}
        light={true}
      />
    </ScrollView>
  );
};
export default AddAddress;
