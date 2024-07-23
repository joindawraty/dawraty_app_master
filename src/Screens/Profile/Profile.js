import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import DashboardTitleBar from '../../navigation/DashboardTitleBar';
import DashboardBottomTab from '../../components/DashboardBottomTab';
import Profileinfo from '../../components/ProfileComponent/Profileinfo';
import Imageupload from '../../components/ProfileComponent/Imageupload';
import color from '../../components/color';
import PaymentHistory from '../../components/ProfileComponent/PaymentHistory';
import RoutePaths from '../../util/RoutePaths';
import {useTranslation} from 'react-i18next';
import {useFocusEffect} from '@react-navigation/native';

import {getAddressesAPI} from '../../services/checkout_api';

const ProfileDashboard = props => {

  const getAddresses = async () => {
    try {
      setIsLoading(true);
      const response = await getAddressesAPI();
      console.log('addresses coming here...', response); // Existing log
      setIsLoading(false);
      if (response && response.data && response.data.success) {
        const array = response.data.data;
        console.log('Parsed address array:', array); // New log
        setAddressList(
          array.map(item => {
            return {
              ...item,
              value: item.id + '',
              label: item.category,
            };
          }),
        );
      } else {
        console.log('No success flag in response:', response); // New log
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

  const navigation = useNavigation();
  const {t} = useTranslation();

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <DashboardTitleBar title="Profile" {...props} />
      <ScrollView>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column', flex: 0.7}}>
            <Profileinfo />
          </View>
          <View style={{flexDirection: 'column', flex: 0.5}}>
            <Imageupload />
          </View>
        </View>
        <TouchableOpacity style={{flexDirection: 'row'}}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
              backgroundColor: color.blue,
              margin: 10,
              padding: 15,
              borderRadius: 5,
            }}>
            <Text style={{color: color.white, fontSize: 14}}>Save</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            margin: 10,
            borderBottomWidth: 1,
            paddingBottom: 15,
          }}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              flex: 1,
            }}>
            <Text style={{color: color.blue, fontSize: 18}}>
              Payment History
            </Text>
          </View>
        </View>
        <PaymentHistory />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            marginBottom: 10,
            marginLeft: 10,
          }}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{color: color.blue, fontSize: 20, fontWeight: '700'}}>
              Support
            </Text>
          </View>
        </View>
        <TouchableOpacity style={{flexDirection: 'row', margin: 10}}>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.9,
              justifyContent: 'center',
            }}>
            <Text style={{color: '#000', fontSize: 15, fontWeight: '500'}}>
              About Dawraty
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.1,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Icon name="chevron-forward-outline" size={20} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: 'row', margin: 10}}>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.9,
              justifyContent: 'center',
            }}>
            <Text style={{color: '#000', fontSize: 15, fontWeight: '500'}}>
              {t('common.allCourses')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.1,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Icon name="chevron-forward-outline" size={20} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: 'row', margin: 10}}>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.9,
              justifyContent: 'center',
            }}>
            <Text style={{color: '#000', fontSize: 15, fontWeight: '500'}}>
              Privacy Policy
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.1,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Icon name="chevron-forward-outline" size={20} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', margin: 10}}>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.9,
              justifyContent: 'center',
            }}>
            <Text style={{color: '#000', fontSize: 15, fontWeight: '500'}}>
              Privacy Policy
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.1,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Icon name="chevron-forward-outline" size={20} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: 'row', margin: 10}}>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.9,
              justifyContent: 'center',
            }}>
            <Text style={{color: '#000', fontSize: 15, fontWeight: '500'}}>
              FAQ
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.1,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Icon name="chevron-forward-outline" size={20} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: RoutePaths.home}],
              }),
            );
          }}
          style={{flexDirection: 'row', margin: 10}}>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.9,
              justifyContent: 'center',
            }}>
            <Text style={{color: '#000', fontSize: 15, fontWeight: '500'}}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <DashboardBottomTab />
    </View>
  );
};
export default ProfileDashboard;
