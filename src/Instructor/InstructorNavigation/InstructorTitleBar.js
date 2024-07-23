import React, {useEffect, useRef, useState} from 'react';
import {TouchableOpacity, BackHandler, View, Image} from 'react-native';
import {Text, StatusBar, Card, Badge} from 'native-base';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {slider} from '../../constants/images';
import color from '../../components/color';
import LanguageComponent from '../../components/LanguageComponent';

const DashboardTitleBar = props => {
  const navigation = useNavigation();

  return (
    <Card
      style={{
        padding: 0,
        width: '100%',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}>
      <StatusBar backgroundColor={color.blue} barStyle="light-content" />
      <View style={{flexDirection: 'row', marginTop: 0}}>
        {props.image && (
          <View
            style={{
              flexDirection: 'column',
              flex: 0.2,
              alignItems: 'center',
              marginRight: 10,
            }}>
            <Image
              source={slider.logo}
              style={{height: 40, width: 60, resizeMode: 'contain'}}
            />
          </View>
        )}
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginTop: 10,
            flex: 0.8,
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{props.title}</Text>
        </View>
        {props.notification && (
          <TouchableOpacity
            onPress={() => navigation.navigate('InstructorNotification')}
            style={{flexDirection: 'column', flex: 0.16, alignItems: 'center'}}>
            <Badge // bg="red.400"
              colorScheme={color.blue}
              rounded="full"
              mb={-4}
              mr={0}
              zIndex={1}
              variant="solid"
              alignSelf="flex-end"
              _text={{
                fontSize: 10,
              }}>
              0
            </Badge>
            <Icon name="notifications-outline" size={30} />
          </TouchableOpacity>
        )}
        {props.cart && (
          <View
            style={{flexDirection: 'column', flex: 0.16, alignItems: 'center'}}>
            <Badge // bg="red.400"
              colorScheme={color.blue}
              rounded="full"
              mb={-4}
              mr={0}
              zIndex={1}
              variant="solid"
              alignSelf="flex-end"
              _text={{
                fontSize: 10,
              }}>
              2
            </Badge>
            <Icon name="cart-outline" size={30} />
          </View>
        )}
        <TouchableOpacity
          style={{
            flexDirection: 'column',
            alignItems: 'flex-end',
            marginTop: 10,
            flex: 0.18,
            justifyContent: 'center',
          }}>
          <LanguageComponent />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default DashboardTitleBar;
