import React, {useRef} from 'react';
import {ActivityIndicator, View} from 'react-native';
import WebView from 'react-native-webview';

import color from '../../components/color';

const FAQ = props => {
  const webViewRef = useRef(null);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.white,
      }}>
      <WebView
        source={{
          uri: 'https://www.dawratycourses.com/',
        }}
        ref={webViewRef}
        startInLoadingState
        renderLoading={() => {
          return (
            <View
              style={{
                position: 'absolute',
                alignSelf: 'center',
              }}>
              <ActivityIndicator size={'large'} color={color.black} />
            </View>
          );
        }}
        onLoadEnd={() => {
          webViewRef.current.injectJavaScript(
            `
              setTimeout(() => {
                const header = document.querySelector('header')
                header.style.display='none'
                const footer = document.querySelector('footer')
                footer.style.display='none'
              }, 100);
              true;
            `,
          );
        }}
      />
    </View>
  );
};

export default FAQ;
