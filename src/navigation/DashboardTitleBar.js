import React, {useEffect, useRef, useState} from 'react';
import {TouchableOpacity, BackHandler, View, Image} from 'react-native';
import {Text, StatusBar, Card, Badge} from 'native-base';

import color from '../components/color';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {slider} from '../constants/images';
import LanguageComponent from '../components/LanguageComponent';
import {connect, useDispatch} from 'react-redux';
// import {GET_CARTCOUNT_START} from '../redux/_ActionsType';
import * as RootNavigation from '../navigation/RootNavigation';

const DashboardTitleBar = props => {
  const navigation = useNavigation();
  const [cartCount, setCartCount] = useState(null);
  const [notificationCount, setNotificationsCount] = useState(null);
  const dispatch = useDispatch();
  // console.log(props)
  // const openDrawer = () => {
  //   navigation.dispatch(DrawerActions.openDrawer())
  // }

  useEffect(() => {
    getCartCount();
  }, []);

  const getCartCount = () => {
    // dispatch({
    //   type: GET_CARTCOUNT_START,
    // });
  };

  useEffect(() => {
    if (props.cartCount != null) {
      setCartCount(props.cartCount);
      // if(props.title.split(' ').length>2){
      //   setFontScale(widthPercentageToDP('6%'))
      // }
    }
  }, [props]);
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
            <Image source={slider.logo} style={{height: 40, width: 50}}></Image>
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
        <TouchableOpacity
          onPress={() => navigation.navigate('Notification')}
          style={{
            flexDirection: 'column',
            flex: 0.16,
            alignItems: 'center',
            paddingTop: 4,
          }}>
          {notificationCount && cartCount != 0 && (
            <Badge // bg="red.400"
              colorScheme={color.blue}
              rounded="full"
              mb={-5}
              mr={0}
              zIndex={1}
              variant="solid"
              alignSelf="flex-end"
              _text={{
                fontSize: 10,
              }}>
              {notificationCount}
            </Badge>
          )}
          <Icon name="notifications-outline" color={color.black} size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => RootNavigation.navigate('Cart')}
          style={{
            flexDirection: 'column',
            flex: 0.16,
            alignItems: 'center',
            marginTop: 5,
          }}>
          {cartCount != null && cartCount != 0 && (
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
              {cartCount}
            </Badge>
          )}
          <Icon name="cart-outline" color={color.black} size={30} />
        </TouchableOpacity>
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
// const styles=StyleSheet.create({
//   container:{
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor:'#000',
//     opacity:0.9,
//     marginTop: 22
//   },
//   modalview:{
//     margin: 20,
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",

//   }
// })

export default DashboardTitleBar;
