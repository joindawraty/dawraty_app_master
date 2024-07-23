import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

// Components
import MetropolisSemiBoldText from './Text/MetropolisSemiBoldText';

// Misc
import color from './color';

const CartWithBadge = props => {
  const {badgeCount, onPress} = props;
  const {i18n} = useTranslation();

  return (
    <Pressable
      style={[
        styles.btnRightMargin,
        {
          transform: [
            {
              scaleX: i18n.language === 'ar' ? -1 : 1,
            },
          ],
        },
      ]}
      onPress={onPress}>
      <MetropolisSemiBoldText
        style={[
          styles.qtyText,
          {
            marginLeft: i18n.language === 'ar' ? 0 : 10,
            marginRight: i18n.language === 'ar' ? 10 : 0,
            paddingHorizontal: 5,
            transform: [
              {
                scaleX: i18n.language === 'ar' ? -1 : 1,
              },
            ],
          },
        ]}>
        {badgeCount >= 10 ? '10+' : badgeCount ?? 0}
      </MetropolisSemiBoldText>
      <Icon name="cart-outline" color={color.black} size={24} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
});

export default CartWithBadge;
