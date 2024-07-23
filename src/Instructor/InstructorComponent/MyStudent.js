import {Box} from 'native-base';
import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {images} from '../../constants';
import color from '../../components/color';
import {Style} from '../../assets/Styles/Style';

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
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: images.slider.slider3,
  },
];

const Item = ({title, image}) => (
  <Box
    style={{
      flex: 0.6,
      margin: 5,
      borderRadius: 5,
      elevation: 5,
      backgroundColor: '#fff',
    }}>
    <View style={{flexDirection: 'row'}}>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Image source={image} style={styles.addPhoto} />
      </View>
    </View>
    <View style={{flexDirection: 'row', margin: 10}}>
      <View style={{flexDirection: 'column', flex: 1, alignItems: 'center'}}>
        <Text style={{color: '#000', fontSize: 15, fontWeight: '700'}}>
          Khalid-Ali rajhi
        </Text>
        <Text style={{color: '#000', fontSize: 12, marginTop: 20}}>
          Biophysics instructor
        </Text>
      </View>
    </View>
    <View style={{flexDirection: 'row', margin: 10}}>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          marginLeft: 10,
          marginRight: 10,
          borderRadius: 20,
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: color.skyBlue,
        }}>
        <Text style={[Style.font12, {color: color.white}]}>Ask me a doubt</Text>
      </View>
    </View>
  </Box>
);

const MyStudent = () => {
  const renderItem = ({item}) => <Item title={item.title} image={item.image} />;

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      numColumns={2}
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
    width: widthPercentageToDP('30%'),
    height: widthPercentageToDP('30%'),
    borderRadius: widthPercentageToDP('15%'),
    resizeMode: 'contain',
  },
});

export default MyStudent;
