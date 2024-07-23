import React from 'react';
import {TouchableOpacity, BackHandler, View} from 'react-native';
import {Text, StatusBar, Badge} from 'native-base';

import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import color from '../../components/color';
import LanguageComponent from '../../components/LanguageComponent';

const InstructorBack = props => {
  const navigation = useNavigation();
  const back = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      BackHandler.exitApp();
    }
  };

  return (
    <View
      style={{
        padding: 0,
        width: '100%',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}>
      <StatusBar backgroundColor={color.blue} barStyle="light-content" />
      <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
        {/* {props.image &&
                    <View  style={{flexDirection:'column', flex:0.2, alignItems:'center', marginRight:10}}>
                        <Image source={slider.logo} style={{height:40, width:100}} ></Image>
                    </View>
                  } */}
        <TouchableOpacity
          onPress={back}
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            flex: 0.2,
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Icon name="arrow-back-outline" size={30} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'column',
            flex: 0.8,
            alignItems: 'flex-start',
            justifyContent: 'center',
            marginRight: 10,
            marginTop: 10,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{props.title}</Text>
        </View>
        {props.notification && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Notification')}
            style={{
              flexDirection: 'column',
              flex: 0.16,
              alignItems: 'center',
              marginTop: 10,
            }}>
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
            <Icon name="notifications-outline" size={25} />
          </TouchableOpacity>
        )}
        {props.cart && (
          <View
            style={{
              flexDirection: 'column',
              flex: 0.16,
              alignItems: 'center',
              marginTop: 10,
            }}>
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
            <Icon name="cart-outline" size={25} />
          </View>
        )}
        {props.share && (
          <View
            style={{
              flexDirection: 'column',
              flex: 0.16,
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Icon name="share-social" size={20} />
          </View>
        )}
        {props.login && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{
              flexDirection: 'column',
              flex: 0.16,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
              marginLeft: 10,
            }}>
            <Text style={{fontSize: 14}}>Login</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{
            flexDirection: 'column',
            alignItems: 'flex-end',
            marginTop: 10,
            marginRight: 10,
            flex: 0.2,
            justifyContent: 'center',
          }}>
          <LanguageComponent />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InstructorBack;
