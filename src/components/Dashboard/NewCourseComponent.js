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
import {images} from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import color from '../color';
import {Style} from '../../assets/Styles/Style';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Biophysics Lecture',
    name: 'Khalid Ali-Rajhi',
    percentage: '90% Complete',
    image: images.slider.slider3,
  },
];

const Item = ({title, image, name, percentage}) => (
  <Box
    style={{
      margin: 10,
      borderRadius: 10,
      elevation: 5,
      backgroundColor: '#fff',
    }}>
    <View style={{flexDirection: 'row', margin: 10}}>
      <TouchableOpacity style={{flexDirection: 'column', flex: 0.5}}>
        <Image
          source={image}
          style={{height: 120, width: 120, borderRadius: 10}}
        />
        <View style={{position: 'absolute', bottom: 40, left: 40, right: 40}}>
          <View
            style={{
              backgroundColor: '#ddd',
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}>
            <Icon name="caret-forward" size={25} color={'#000'} />
          </View>
        </View>
      </TouchableOpacity>
      <View style={{flexDirection: 'column', flex: 0.7}}>
        <Text numberOfLines={2} style={Style.font16}>
          {title}
        </Text>
        <Text style={[Style.font12, {marginTop: 30, marginBottom: 10}]}>
          {name}
        </Text>
        {/* <Progress colorScheme='green' rounded={0} value={80} borderRadius={0} style={{borderRadius:0, width:'100%'}} /> */}
        <Text style={{marginTop: 10, color: color.skyBlue}}>START COURSE</Text>
      </View>
    </View>
  </Box>
);

const NewCourseComponent = () => {
  const renderItem = ({item}) => (
    <Item
      title={item.title}
      image={item.image}
      name={item.name}
      percentage={item.percentage}
    />
  );

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
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
    width: 200,
    height: 400,
    resizeMode: 'contain',
  },
});

export default NewCourseComponent;
