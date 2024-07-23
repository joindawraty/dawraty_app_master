import React from 'react';
import {ActivityIndicator, Alert, View} from 'react-native';
import WebView from 'react-native-webview';

import color from '../../components/color';

import RoutePaths from '../../util/RoutePaths';

const PaymentGateway = props => {
  const paymentLink = props?.route?.params?.paymentLink;
  return (
    <WebView
      source={{uri: paymentLink}}
      startInLoadingState
      renderLoading={() => {
        return (
          <View style={{position: 'absolute', alignSelf: 'center'}}>
            <ActivityIndicator size={'large'} color={color.blue} />
          </View>
        );
      }}
      onNavigationStateChange={navState => {
        const {
          // canGoBack,
          // canGoForward,
          // loading,
          // navigationType, // (iOS only)
          // target,
          // title,
          url,
        } = navState;
        if (url.includes('payments') && url.includes('Result=CAPTURED')) {
          Alert.alert('Success', 'Payment received', [
            {
              text: 'OK',
              onPress: () => {
                props.navigation.navigate(RoutePaths.home);
              },
            },
          ]);
        } else if (
          url.includes('payments') &&
          url.includes('Result=NOT%20CAPTURED')
        ) {
          Alert.alert('Failed', 'Payment failed', [
            {
              text: 'OK',
              onPress: () => {
                props.navigation.goBack();
              },
            },
          ]);
        }
      }}
    />
  );
};

export default PaymentGateway;
