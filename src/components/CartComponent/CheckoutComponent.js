import React, {useState} from 'react';
import {View, TouchableOpacity, TextInput, SafeAreaView} from 'react-native';
import {Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import color from '../color';
import {Style} from '../../assets/Styles/Style';
import DropDownPicker from 'react-native-dropdown-picker';
import RoutePaths from '../../util/RoutePaths';

let e = 'Justinbrooks@gmail.com';
let selectcountry = 'abc';
let mobilenumber = '65675674646';

const CheckoutComponent = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState(e);
  const [country, setCountry] = useState(selectcountry);
  const [mobile, setMobile] = useState(mobilenumber);

  return (
    <SafeAreaView style={{margin: 10}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <Text>{'First Name'}</Text>
          <TextInput
            style={Style.textemailsmall}
            placeholder="First Name"
            onChangeText={text => setEmail(text)}
            placeholderTextColor={'#000'}
          />
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <Text>{'Last Name'}</Text>
          <TextInput
            style={Style.textemailsmall}
            placeholder="Last Name"
            onChangeText={text => setEmail(text)}
            placeholderTextColor={'#CACACA'}
          />
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <Text>{'Email'}</Text>
          <TextInput
            style={Style.textemailsmall}
            placeholder="Enter Email Address"
            onChangeText={text => setEmail(text)}
            placeholderTextColor={'#CACACA'}
          />
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <Text>{'Select Country'}</Text>
          <DropDownPicker
            items={[
              {label: 'EN', value: 'en'},
              {label: 'GN', value: 'gr'},
            ]}
            style={Style.textemailsmall}
            arrowColor={color.Lefticon}
            arrowSize={10}
            value={country}
            placeholder="Select Country"
            placeholderTextColor={'#CACACA'}
            itemStyle={[
              {
                justifyContent: 'flex-start',
              },
            ]}
          />
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <Text>{'Mobile Number'}</Text>
          <TextInput
            style={Style.textemailsmall}
            value={mobile}
            onChangeText={text => setEmail(text)}
            placeholderTextColor={'#CACACA'}
          />
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <Text>Address line 1</Text>
          <TextInput
            style={Style.textemailsmall}
            placeholder="Address line 1"
            onChangeText={text => setEmail(text)}
            placeholderTextColor={'#CACACA'}
          />
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <Text>Address line 2</Text>
          <TextInput
            style={Style.textemailsmall}
            placeholder="Address line 2"
            onChangeText={text => setEmail(text)}
            placeholderTextColor={'#CACACA'}
          />
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <Text>Address line 3</Text>
          <TextInput
            style={Style.textemailsmall}
            placeholder="Address line 3"
            onChangeText={text => setEmail(text)}
            placeholderTextColor={'#CACACA'}
          />
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <Text>Address line 4</Text>
          <TextInput
            style={Style.textemailsmall}
            placeholder="Address line 4"
            onChangeText={text => setEmail(text)}
            placeholderTextColor={'#CACACA'}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: 20,
          marginBottom: 20,
          marginLeft: 5,
        }}>
        <Text style={{fontSize: 16, fontWeight: '500', color: color.blue}}>
          Promo Code
        </Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row', marginLeft: 5}}>
        <Text>Promo Code</Text>
      </View>
      <View
        style={[
          Style.textemailsmall,
          {flexDirection: 'row', marginBottom: 20},
        ]}>
        <View style={{flexDirection: 'column', flex: 0.8}}>
          <TextInput
            placeholder="Enter Promo Code"
            onChangeText={text => setEmail(text)}
            placeholderTextColor={'#CACACA'}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            flex: 0.2,
            justifyContent: 'center',
          }}>
          <Text style={{color: color.skyBlue}}>Apply</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate(RoutePaths.checkoutProceed)}
        style={{
          flexDirection: 'row',
          borderRadius: 5,
          marginBottom: 20,
          backgroundColor: color.blue,
          padding: 10,
        }}>
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
            alignItems: 'center',
            padding: 5,
          }}>
          <Text style={{color: '#fff'}}>Proceed</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default CheckoutComponent;
