import React from 'react';
import {Image, StyleSheet, View, SafeAreaView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// Components
import HeaderTitle from './HeaderTitle';
import SmallIconBtn from './SmallIconBtn';
import CartWithBadge from './CartWithBadge';
import HeaderLoginBtn from './HeaderLoginBtn';
import HeaderLanguageBtn from './HeaderLanguageBtn';

// Misc
import color from './color';
import {appConstants, images} from '../constants';
import RoutePaths from '../util/RoutePaths';

import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

const CommonHeader = ({withBackBtn, title, navigation, route}) => {
  const safeAreaInsets = useSafeAreaInsets();
  const {i18n} = useTranslation();

  const {userData} = useSelector(state => state.user);
  const {data: cartData, count} = useSelector(state => state.cart);

  const onPressHandler = (
    sender = 'back' | 'cart' | 'login' | 'language' | 'notification',
  ) => {
    if (sender === 'cart') {
      navigation.navigate(RoutePaths.cart);
    }
    if (sender === 'login') {
      navigation.navigate(RoutePaths.login);
    }
    if (sender === 'language') {
      // console.log('change language');
    }
    if (sender === 'notification') {
      navigation.navigate(RoutePaths.Notification);
    }
    if (sender === 'back' && navigation?.canGoBack?.()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View
        style={{
          ...styles.mainContainer,
          // height: safeAreaInsets.top + 60,
          // paddingTop: safeAreaInsets.top,
        }}>
        {route.name === 'dashboard' ? (
          <View style={styles.leftContainer}>
            <Image
              source={images.slider.logo}
              resizeMode="cover"
              style={styles.logoImg}
            />
            <HeaderTitle title={'DAWRATY'} />
          </View>
        ) : (
          <>
            {withBackBtn ? (
              <SmallIconBtn
                iconName="arrow-back-outline"
                iconColor={color.black}
                iconSize={28}
                onPress={onPressHandler.bind(null, 'back')}
                iconStyle={{
                  transform: [
                    {
                      scaleX: i18n.language === 'en' ? 1 : -1,
                    },
                  ],
                }}
              />
            ) : null}
            <HeaderTitle
              title={title ?? route.name[0].toUpperCase() + route.name.slice(1)}
            />
          </>
        )}

        <View style={styles.rightContainer}>
          {userData ? (
            <SmallIconBtn
              iconName="notifications-outline"
              iconColor={color.black}
              iconSize={22}
              onPress={onPressHandler.bind(null, 'notification')}
            />
          ) : null}
          {userData && userData?.user?.type !== appConstants.Instructor ? (
            <CartWithBadge
              badgeCount={userData ? count ?? 0 : cartData?.length ?? 0}
              onPress={onPressHandler.bind(null, 'cart')}
            />
          ) : null}
          {!userData ? (
            // <HeaderLoginBtn onPress={onPressHandler.bind(null, 'login')} />
            <></>
          ) : null}
          <HeaderLanguageBtn onPress={onPressHandler.bind(null, 'language')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: color.white,
    paddingHorizontal: 15,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImg: {
    height: 35,
    width: 55,
    marginRight: 10,
  },
  titleText: {
    fontSize: 18,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  qtyText: {
    fontSize: 10,
    backgroundColor: color.skyBlue,
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 2,
    overflow: 'hidden',
    textAlign: 'center',
    alignSelf: 'center',
    color: color.white,
    marginBottom: -10,
    marginLeft: 10,
    zIndex: 1,
  },
  btnRightMargin: {
    marginRight: 14,
  },
  loginText: {
    fontSize: 15,
  },
  languageBtnContainer: {
    shadowColor: '#000',
    backgroundColor: color.white,
    padding: 5,
    borderRadius: 30,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  languageText: {
    fontSize: 12,
  },
});

export default CommonHeader;
