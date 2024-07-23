import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {NativeModules, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import EN from './en.json';
import AR from './ar.json';

const locale =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0]
    : NativeModules.I18nManager.localeIdentifier;

function callFallbackIfFunc(fallback, callback) {
  if (typeof fallback === 'function') {
    return fallback(callback);
  }

  return callback(fallback);
}

i18n
  .use(initReactI18next)
  .use(
    (fallback => {
      return {
        type: 'languageDetector',
        async: true,
        init: () => {},
        detect: async function (callback) {
          try {
            await AsyncStorage.getItem(
              '@i18next-async-storage/user-language',
            ).then(language => {
              if (language) {
                return callback?.(language);
              }

              return callFallbackIfFunc?.(fallback, callback);
            });
          } catch (error) {
            callFallbackIfFunc?.(fallback, callback);
          }
        },
        cacheUserLanguage: async function (language) {
          try {
            // console.log('cacheUserLanguage : ', language);
            await AsyncStorage.setItem(
              '@i18next-async-storage/user-language',
              language,
            );
          } catch (error) {
            console.log('error at cacheUserLanguage : ', error);
          }
        },
      };
    })(locale.includes('ar') ? 'ar' : 'en'),
  )
  .init({
    resources: {
      en: {
        translation: EN,
      },
      ar: {
        translation: AR,
      },
    },
    // lng: locale.includes('ar') ? 'ar' : 'en', // Get the first device language
    // fallbackLng: 'en',

    react: {
      useSuspense: false,
    },

    compatibilityJSON: 'v3', // By default React Native projects does not support Intl
  })
  .then(res => {
    // console.log('locale : ', i18n.services.languageDetector, res);
  })
  .catch(err => {
    console.log('locale error : ', err);
  });

export default i18n;
