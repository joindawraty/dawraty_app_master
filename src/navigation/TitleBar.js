import React from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import {Text, StatusBar, Card, Badge} from 'native-base';
import images from '../constants/images';
import color from '../components/color';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import LanguageComponent from '../components/LanguageComponent';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';

const TitleBar = props => {
  const navigation = useNavigation();
  const safeAreaInsects = useSafeAreaInsets();
  const {t} = useTranslation();
  return (
    <Card
      style={{
        marginTop: safeAreaInsects.top,
        padding: 0,
        width: '100%',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}>
      <StatusBar backgroundColor={color.blue} barStyle="light-content" />
      <View style={{flexDirection: 'row', marginTop: 0}}>
        <View
          style={{flexDirection: 'column', flex: 0.2, alignItems: 'center'}}>
          <Image
            source={images.slider.logo}
            style={{height: 40, width: 50, resizeMode: 'contain'}}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginTop: 10,
            flex: 0.6,
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>DAWRATY</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={{flexDirection: 'column', flex: 0.2, alignItems: 'center'}}>
          <Badge // bg="red.400"
            colorScheme={color.blue}
            rounded="full"
            mb={-3}
            mr={0}
            zIndex={1}
            variant="solid"
            alignSelf="flex-end"
            _text={{
              fontSize: 10,
            }}>
            2
          </Badge>
          <Icon name="cart-outline" color={color.black} size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{
            flexDirection: 'column',
            marginTop: 5,
            alignItems: 'flex-end',
            flex: 0.2,
            justifyContent: 'center',
          }}>
          <Text
            onPress={() => navigation.navigate('Login')}
            style={{fontSize: 16, color: '#000'}}>
            {t('common.login')}
          </Text>
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

export default TitleBar;
