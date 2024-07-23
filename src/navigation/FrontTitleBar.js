import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text, StatusBar, Card} from 'native-base';

import color from '../components/color';
import {useNavigation} from '@react-navigation/native';
import LanguageComponent from '../components/LanguageComponent';

const FrontTitleBar = props => {
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
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginTop: 10,
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{props.title}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={{flexDirection: 'column', flex: 0.16, alignItems: 'center'}}>
          {/* <Badge // bg="red.400"
                      colorScheme={color.blue} rounded="full" mb={-4} mr={0} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
                        fontSize: 10
                      }}>
                          2
                        </Badge>
                    <Icon name="cart-outline" size={30} /> */}
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
export default FrontTitleBar;
