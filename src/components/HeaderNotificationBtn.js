import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Components
import MetropolisSemiBoldText from './Text/MetropolisSemiBoldText';

// Misc
import color from './color';

const HeaderNotificationBtn = props => {
  const {badgeCount, onPress} = props;
  return (
    <Pressable style={styles.btnRightMargin} onPress={onPress}>
      <MetropolisSemiBoldText style={styles.countText}>
        {badgeCount}
      </MetropolisSemiBoldText>
      <Icon name="notifications-outline" color={color.black} size={24} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  countText: {
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

export default HeaderNotificationBtn;
