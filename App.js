import React, {useEffect, useMemo} from 'react';
import {
  TextInput,
  Text,
  StatusBar,
  Platform,
  I18nManager,
  Alert,
} from 'react-native';
import {MenuProvider} from 'react-native-popup-menu';

import RootNavigation from './src/navigation/RootNavigation';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import color from './src/components/color';
import {persistor, store} from './src/redux/store';
import {LoadingProvider} from './src/context/Loading/LoadingContext';
import AppLoader from './src/context/Loading/AppLoader';
import {useTranslation} from 'react-i18next';
import KeyboardManager from 'react-native-keyboard-manager';
import {RootSiblingParent} from 'react-native-root-siblings';
import messaging from '@react-native-firebase/messaging';

if (Platform.OS === 'ios') {
  KeyboardManager.setEnable(true);
}

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const App = () => {
  // push notifcations
  useEffect(() => {
    requestUserPermission();
    getInitialMessages();
  }, []);
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  const getInitialMessages = () => {
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'App: Firebase - Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // Handle the initial notification data
        } else {
          console.log(
            'App: Firebase - Launching App without any notifications!!',
          );
        }
      });
  };

  const {
    i18n: {language},
  } = useTranslation();

  useEffect(() => {
    I18nManager.forceRTL(language === 'ar');
  }, [language]);

  const direction = useMemo(
    () => (language === 'ar' ? 'rtl' : 'ltr'),
    [language],
  );

  return (
    <SafeAreaProvider
      style={{flex: 1, backgroundColor: color.white, direction}}>
      <MenuProvider>
        <RootSiblingParent>
          <LoadingProvider>
            <NativeBaseProvider>
              <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                  <StatusBar
                    backgroundColor={color.blue}
                    barStyle={
                      Platform.OS === 'ios' ? 'dark-content' : 'light-content'
                    }
                  />
                  {/* <IconRegistry icons={EvaIconsPack} /> */}
                  {/* <ApplicationProvider {...eva} theme={{...eva.light, ...customTheme}}> */}
                  {/* <NavigationContainer ref={navigationRef}> */}
                  {/* {createHomeStack()} */}
                  {/* </NavigationContainer> */}
                  <RootNavigation />
                  <AppLoader />
                  {/* </ApplicationProvider> */}
                </PersistGate>
              </Provider>
            </NativeBaseProvider>
          </LoadingProvider>
        </RootSiblingParent>
      </MenuProvider>
    </SafeAreaProvider>
  );
};

export default App;
