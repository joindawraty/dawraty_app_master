import React from 'react';
import {
  Alert,
  I18nManager,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

import {useTranslation} from 'react-i18next';

// Components
import MetropolisRegularText from './Text/MetropolisRegularText';

// Misc
import color from './color';

const HeaderLanguageBtn = props => {
  const {onPress} = props;
  const {i18n} = useTranslation();

  const changeLanguageHandler = () => {
    if (Platform.OS === 'android') {
      Alert.alert(
        'Restart required.',
        'To apply language change app needs to reload.',
        [
          {
            text: 'Reload',
            onPress: async () => {
              const nextLanguage = i18n.language === 'ar' ? 'en' : 'ar';
              await AsyncStorage.setItem(
                '@i18next-async-storage/user-language',
                nextLanguage,
              );
              I18nManager.forceRTL(nextLanguage === 'ar');
              RNRestart.Restart();
            },
            style: 'default',
          },
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
        ],
      );
      return;
    }
    const nextLanguage = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(nextLanguage);
  };

  return (
    <Pressable
      style={styles.languageBtnContainer}
      onPress={changeLanguageHandler}>
      <View
        style={[
          styles.languageTextContainer,
          {
            backgroundColor: i18n.language === 'en' ? color.blue : color.white,
          },
        ]}>
        <MetropolisRegularText
          style={[
            styles.languageText,
            {
              color: !(i18n.language === 'en') ? color.blue : color.white,
            },
          ]}>
          {'EN'}
        </MetropolisRegularText>
      </View>
      <View
        style={[
          styles.languageTextContainer,
          {
            backgroundColor: !(i18n.language === 'en')
              ? color.blue
              : color.white,
          },
        ]}>
        <MetropolisRegularText
          style={[
            styles.languageText,
            {
              color: i18n.language === 'en' ? color.blue : color.white,
            },
          ]}>
          {'AR'}
        </MetropolisRegularText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  sep: {
    width: 1,
    height: '100%',
    marginHorizontal: 5,
    backgroundColor: color.blue,
  },
  languageBtnContainer: {
    flexDirection: 'row',
    shadowColor: '#000',
    backgroundColor: color.white,
    height: 24,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: color.blue,
    borderWidth: 1,
    borderRadius: 5,
  },
  languageText: {
    fontSize: 12,
  },
  languageTextContainer: {
    height: '100%',
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
});

export default HeaderLanguageBtn;
