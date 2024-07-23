import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {Radio} from 'native-base';
import {Style} from '../../assets/Styles/Style';
import color from '../color';

const PaymentComponent = () => {
  const Example = () => {
    return (
      <Radio.Group
        defaultValue="2"
        name="exampleGroup"
        accessibilityLabel="select prize">
        <View
          style={[
            {
              marginTop: 10,
              marginBottom: 10,
              fontSize: 14,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: color.blue,
              paddingHorizontal: 10,
              paddingVertical: 8,
              flexDirection: 'row',
            },
          ]}>
          <View style={{flexDirection: 'column', flex: 1}}>
            <Radio value="2" my={1}>
              KNET / Credit Card
            </Radio>
          </View>
        </View>
        {/* <View style={[Style.textemailsmall, {flexDirection: 'row'}]}>
          <View style={{flexDirection: 'column', flex: 1}}>
            <Radio value="3" my={1}>
              Cash on Delivery
            </Radio>
          </View>
        </View> */}
      </Radio.Group>
    );
  };
  return (
    <SafeAreaView style={{margin: 10}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <Example />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default PaymentComponent;
