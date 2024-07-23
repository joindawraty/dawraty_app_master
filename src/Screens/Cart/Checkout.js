import React, {useCallback, useState} from 'react';
import {View, ScrollView} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import MetropolisRegularText from '../../components/Text/MetropolisRegularText';
import MetropolisMediumText from '../../components/Text/MetropolisMediumText';
import MetropolisSemiBoldText from '../../components/Text/MetropolisSemiBoldText';
import InputWithTitle from '../../components/InputWithTitle';
import RoundedButton from '../../components/RoundedButton';

import {useTranslation} from 'react-i18next';
import {useFocusEffect} from '@react-navigation/native';
import {useLoading} from '../../context/Loading/LoadingContext';

import {useSelector} from 'react-redux';
import {getAddressesAPI} from '../../services/checkout_api';

import color from '../../components/color';
import {Style} from '../../assets/Styles/Style';
import RoutePaths from '../../util/RoutePaths';
import {errorToast} from '../../util/toastUtils';

const CheckoutBillingDetailsScreen = ({route, navigation}) => {
  const safeAreaInsets = useSafeAreaInsets();
  const {setIsLoading} = useLoading();
  const userData = useSelector(state => state.user?.userData);
  const {t} = useTranslation();

  const [phoneNumber, setPhoneNumber] = useState(
    userData?.user?.mobile_number ?? '',
  );
  const [addressList, setAddressList] = useState([]);
  const [address, setAddress] = useState(null);
  const [openAddress, setOpenAddress] = useState(false);

  const getAddresses = async () => {
    try {
      setIsLoading(true);
      const response = await getAddressesAPI();
      console.log('addresses....', response);
      setIsLoading(false);
      if (response && response.data && response.data.success) {
        const array = response.data.data;
        setAddressList(
          array.map(item => {
            return {
              ...item,
              value: item.id + '',
              label: item.category,
            };
          }),
        );
      }
    } catch (err) {
      console.log(
        '[getAddresses] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getAddresses();
    }, []),
  );

  const renderAddress = () => {
    var addressArray = [];
    if (address?.apartment) {
      addressArray.push(address.apartment);
    }
    if (address?.house) {
      addressArray.push(address.house);
    }
    if (address?.street) {
      addressArray.push(address.street);
    }
    if (address?.city) {
      addressArray.push(address.city);
    }
    return (
      <MetropolisSemiBoldText style={{lineHeight: 18, marginTop: 10}}>
        {`${t('common.address')} `}
        <MetropolisRegularText style={{lineHeight: 18}}>
          {addressArray.join(', ') +
            (address?.country ? ' - ' + address?.country?.name : '')}
        </MetropolisRegularText>
      </MetropolisSemiBoldText>
    );
  };

  const onProceed = () => {
    if (phoneNumber.trim() == '') {
      errorToast('Please enter phone number.');
      return;
    }
    if (address) {
      navigation.navigate(RoutePaths.checkoutProceed, {
        address: address,
        phoneNumber: phoneNumber.trim(),
      });
    } else {
      errorToast('Please select address');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.white,
      }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 15,
          overflow: 'visible',
        }}>
        <MetropolisSemiBoldText
          style={{
            fontSize: 18,
            marginTop: 10,
            marginBottom: 15,
            color: color.blue,
          }}>
          {t('checkout.billing_details')}
        </MetropolisSemiBoldText>
        <InputWithTitle
          title={t('common.firstName')}
          placeholder={t('common.firstName')}
          inputStyle={{borderWidth: 0, backgroundColor: color.greyNew}}
          value={userData?.user?.first_name}
          editable={false}
        />
        <InputWithTitle
          title={t('common.lastName')}
          placeholder={t('common.lastName')}
          inputStyle={{borderWidth: 0, backgroundColor: color.greyNew}}
          value={userData?.user?.last_name}
          editable={false}
        />
        <InputWithTitle
          title={t('common.email')}
          placeholder={t('common.yourEmailAddress')}
          inputStyle={{borderWidth: 0, backgroundColor: color.greyNew}}
          value={userData?.user?.email}
          editable={false}
        />
        <InputWithTitle
          title={t('common.mobileNumber')}
          placeholder={t('common.mobileNumber')}
          value={phoneNumber}
          onChangeText={text => {
            setPhoneNumber(text);
          }}
          keyboardType="phone-pad"
        />
        <MetropolisMediumText>{t('common.selectAddress')}</MetropolisMediumText>
        <DropDownPicker
          items={addressList}
          style={{
            ...Style.textemailsmall,
            minHeight: 40,
            marginBottom: 0,
            backgroundColor: color.white,
          }}
          textStyle={{
            textAlign: 'left',
          }}
          arrowColor={color.Lefticon}
          arrowSize={10}
          value={address ? address.value : ''}
          placeholder={t('common.selectAddress')}
          placeholderTextColor={'#CACACA'}
          open={openAddress}
          dropDownDirection="TOP"
          listMode="SCROLLVIEW"
          setOpen={setOpenAddress}
          setValue={valueFun => {
            const value = valueFun();
            const data = addressList.find(item2 => item2.id == value);
            setAddress(data);
          }}
          zIndex={8000}
        />
        {renderAddress()}
        <RoundedButton
          bordered={false}
          bgColor={color.white}
          textColor={color.blue}
          text={t('checkout.add_address')}
          onPress={() => {
            navigation.navigate('AddAddress');
          }}
          style={{
            marginTop: 14,
            height: 50,
            flex: undefined,
            borderWidth: 1,
            borderColor: color.blue,
          }}
          isLoading={false}
          iconName={''}
          light={true}
        />
      </ScrollView>
      <RoundedButton
        bordered={false}
        bgColor={color.blue}
        textColor={color.white}
        text={t('common.checkout')}
        onPress={onProceed}
        style={{
          marginBottom: safeAreaInsets.bottom + 25,
          marginTop: 25,
          height: 50,
          flex: undefined,
          marginHorizontal: 15,
        }}
        textStyle={{
          paddingVertical: 15,
        }}
        isLoading={false}
        iconName={''}
        light={true}
      />
    </View>
  );
};
export default CheckoutBillingDetailsScreen;
