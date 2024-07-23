import {Box} from 'native-base';
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
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {images} from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import color from '../color';
import {useNavigation} from '@react-navigation/native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    image: images.slider.slider3,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    image: images.slider.slider3,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: images.slider.slider3,
  },
];

const Item = ({title, image, navigation}) => (
  <Box
    style={{
      width: widthPercentageToDP('50%'),
      margin: 10,
      borderRadius: 10,
      elevation: 5,
      backgroundColor: '#fff',
    }}>
    <TouchableOpacity onPress={() => navigation.navigate('CourseDetail')}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column'}}>
          <Image source={image} style={styles.addPhoto} />
        </View>
      </View>
      <View style={{flexDirection: 'row', margin: 10}}>
        <View style={{flexDirection: 'column'}}>
          <Text style={{color: '#000', fontSize: 15, fontWeight: '700'}}>
            Biophysics Lecture
          </Text>
          <Text style={{color: '#000', fontSize: 12, marginTop: 20}}>
            Khalid-Ali rajhi
          </Text>
          <Text
            style={{
              color: 'red',
              fontSize: 15,
              marginTop: 10,
              fontWeight: '700',
            }}>
            KD 55.000{' '}
            <Text
              style={{
                color: color.grey,
                textDecorationLine: 'line-through',
                fontSize: 12,
              }}>
              KD 70.000
            </Text>
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', margin: 10}}>
        <View
          style={{
            flexDirection: 'column',
            marginRight: 10,
            height: 30,
            width: 30,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: color.blue,
          }}>
          <Icon name="cart" size={22} color={'#fff'} />
        </View>
        <View
          style={{
            flexDirection: 'column',
            height: 30,
            width: 30,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: color.blue,
          }}>
          <Icon name="heart-outline" size={22} color={color.blue} />
        </View>
      </View>
    </TouchableOpacity>
  </Box>
);

const LearnNext = () => {
  const navigation = useNavigation();
  const renderItem = ({item}) => (
    <Item title={item.title} image={item.image} navigation={navigation} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: widthPercentageToDP('50%'),
    height: widthPercentageToDP('40%'),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'contain',
  },
});

export default LearnNext;
