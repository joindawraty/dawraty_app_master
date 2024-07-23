import React, {useEffect, useRef, useState} from 'react';
import {TouchableOpacity, BackHandler, View} from 'react-native';
import {Text, StatusBar, Badge} from 'native-base';

import color from '../components/color';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import LanguageComponent from '../components/LanguageComponent';
import {connect, useDispatch} from 'react-redux';
import MetropolisBoldText from '../components/Text/MetropolisBoldText';

const BackTitleBar = props => {
  const navigation = useNavigation();
  const [cartCount, setCartCount] = useState(null);
  const dispatch = useDispatch();
  // console.log(props)
  const back = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      BackHandler.exitApp();
    }
  };
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
            flex: 0.1,
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Icon color={color.black} name="arrow-back-outline" size={30} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'column',
            flex: 0.6,
            alignItems: 'flex-start',
            justifyContent: 'center',
            marginRight: 10,
            marginTop: 10,
          }}>
          <MetropolisBoldText style={{fontSize: 20, fontWeight: 'bold'}}>
            {props.title}
          </MetropolisBoldText>
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
        {props.cart && cartCount != null && cartCount != 0 && (
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
              {cartCount}
            </Badge>
            <Icon name="cart-outline" color={color.black} size={25} />
          </View>
        )}
        {props.share && (
          <View
            style={{
              flexDirection: 'column',
              flex: 0.16,
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Icon name="share-social" size={20} color={color.black} />
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

export default BackTitleBar;
