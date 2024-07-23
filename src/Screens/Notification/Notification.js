import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import NotificationItem from '../../components/NotificationItem';

import color from '../../components/color';
import {images} from '../../constants';
import {getNotifications} from '../../services/auth';
import moment from 'moment';
import {useLoading} from '../../context/Loading/LoadingContext';

const Notification = props => {
  const [notificationData, setNotificationData] = useState([]);
  const {setIsLoading} = useLoading();

  const getData = async () => {
    try {
      setIsLoading(true);
      const res = await getNotifications();
      setIsLoading(false);
      if (res && res.data && res.data.data) {
        setNotificationData(res.data.data);
      }
    } catch (err) {
      console.log(
        '[getData] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onNotificationPress = () => {
    console.log('Coming Soon');
  };

  const renderItem = ({item}) => (
    <NotificationItem
      notificationId={item.id}
      description={item.title}
      image={
        item.notification_type && item.notification_type.image_path
          ? {uri: item.notification_type && item.notification_type.image_path}
          : images.slider.ic_logo_text
      }
      days={moment(item.created_at).fromNow()}
      status={item.status}
      onPress={onNotificationPress}
    />
  );

  const renderItemSeparatorComponent = () => (
    <View
      style={{
        height: StyleSheet.hairlineWidth,
        backgroundColor: color.black,
      }}
    />
  );

  return (
    <FlatList
      data={notificationData}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={renderItemSeparatorComponent}
      contentContainerStyle={styles.listContentContainerStyle}
    />
  );
};

const styles = StyleSheet.create({
  listContentContainerStyle: {
    flex: 1,
    backgroundColor: color.white,
  },
});

export default Notification;
