import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {images} from '../../constants';
import color from '../../components/color';
import BackTitleBar from '../../navigation/BackTitleBar';

const DATA = [
  {
    description:
      'Biophysics Lecture by Khalid Ali-Rajhi successfully purchased.',
    days: '2 days ago',
    image: images.slider.slider3,
  },
  {
    description:
      'Biophysics Lecture by Khalid Ali-Rajhi successfully purchased.',
    days: '2 days ago',
    image: images.slider.slider3,
  },
  {
    description:
      'Biophysics Lecture by Khalid Ali-Rajhi successfully purchased.',
    days: '2 days ago',
    image: images.slider.slider3,
  },
];

const Item = ({description, image, days}) => (
  <View
    style={{
      flexDirection: 'row',
      margin: 10,
      backgroundColor: '#fff',
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      paddingBottom: 20,
    }}>
    <TouchableOpacity style={{flexDirection: 'column', flex: 0.35}}>
      <Image source={image} style={{height: 80, width: 80, borderRadius: 40}} />
    </TouchableOpacity>
    <View
      style={{flexDirection: 'column', flex: 0.8, justifyContent: 'center'}}>
      <Text style={{color: '#000', fontSize: 15, fontWeight: '700'}}>
        {description}
      </Text>
      <Text style={{color: '#000', fontSize: 12, marginTop: 10}}>{days}</Text>
    </View>
    <View style={{flexDirection: 'column', flex: 0.1, marginTop: 5}}>
      <View
        style={{
          height: 15,
          width: 15,
          borderRadius: 10,
          backgroundColor: color.blue,
        }}
      />
    </View>
  </View>
);

const InstructorNotification = props => {
  const renderItem = ({item}) => (
    <Item
      description={item.description}
      image={item.image}
      days={item.days}
      percentage={item.percentage}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackTitleBar title="Notification" {...props} notification cart />
      <View style={{marginTop: 30}}></View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  addPhoto: {
    width: 200,
    height: 400,
    resizeMode: 'contain',
  },
});

export default InstructorNotification;
