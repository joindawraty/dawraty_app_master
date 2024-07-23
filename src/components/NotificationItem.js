import React from 'react';
import {View, StyleSheet, TouchableOpacity, Pressable} from 'react-native';

import MyImage from './MyImage';
import MetropolisMediumText from './Text/MetropolisMediumText';
import MetropolisLightText from './Text/MetropolisLightText';

import {useLoading} from '../context/Loading/LoadingContext';

import {readNotification} from '../services/auth';
import {successToast} from '../util/toastUtils';
import color from './color';

const NotificationItem = ({
  notificationId,
  description,
  image,
  days,
  onPress,
  status,
}) => {
  const {setIsLoading} = useLoading();

  const onPressNotification = async () => {
    try {
      if (status != 'read') {
        setIsLoading(true);
        const res = await readNotification(notificationId);
        setIsLoading(false);
        if (res && res.data && res.data.message) {
          successToast(res.data.message);
        }
      }
      onPress();
    } catch (err) {
      console.log(
        '[onPressNotification] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
    }
  };

  return (
    <Pressable onPress={onPressNotification} style={styles.container}>
      <TouchableOpacity>
        <MyImage source={image} style={styles.img} />
      </TouchableOpacity>
      <View style={styles.rightContainer}>
        <View style={styles.textsContainer}>
          <MetropolisMediumText style={styles.titleTxt}>
            {description}
          </MetropolisMediumText>
          <MetropolisLightText style={styles.durationTxt}>
            {days}
          </MetropolisLightText>
        </View>
        {status != 'read' && <View style={styles.unreadView} />}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
  },
  img: {
    height: 65,
    width: 65,
    borderRadius: 40,
    backgroundColor: color.white,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
  },
  textsContainer: {
    flex: 1,
    marginRight: 10,
  },
  titleTxt: {
    fontSize: 14,
    lineHeight: 17,
  },
  durationTxt: {
    fontSize: 12,
    marginTop: 20,
  },
  unreadView: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: color.blue,
  },
});

export default NotificationItem;
