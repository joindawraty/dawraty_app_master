import {Progress} from 'native-base';
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {images} from '../../constants';
import color from '../color';
import MetropolisSemiBoldText from '../Text/MetropolisSemiBoldText';
import MetropolisRegularText from '../Text/MetropolisRegularText';
import MetropolisLightText from '../Text/MetropolisLightText';
import RoutePaths from '../../util/RoutePaths';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Biophysics Lecture---',
    name: 'Khalid Ali-Rajhi',
    percentage: '90% Complete',
    image: images.slider.slider3,
  },
  {
    title: 'Biophysics Lecture',
    name: 'Khalid Ali-Rajhi',
    percentage: '90% Complete',
    image: images.slider.slider3,
  },
  {
    title: 'Biophysics Lecture',
    name: 'Khalid Ali-Rajhi',
    percentage: '90% Complete',
    image: images.slider.slider3,
  },
];

const StudentCourseItem = ({title, image, name, percentage, navigation}) => (
  <View
    style={{
      flexDirection: 'row',
      marginBottom: 15,
      borderRadius: 10,
      backgroundColor: color.white,

      shadowColor: color.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      padding: 10,
    }}>
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(RoutePaths.courseFullDetails);
      }}>
      <ImageBackground
        source={image}
        style={{
          height: 120,
          width: 120,
          borderRadius: 10,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 10,
        }}>
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
      </ImageBackground>
    </TouchableOpacity>
    <View style={{flex: 1}}>
      <MetropolisSemiBoldText numberOfLines={2} style={{fontSize: 16}}>
        {title}
      </MetropolisSemiBoldText>
      <View
        style={{
          marginTop: 40,
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <MetropolisRegularText style={{fontSize: 14}}>
          {name}
        </MetropolisRegularText>
        <Progress
          colorScheme="green"
          value={80}
          borderRadius={0}
          style={{height: 4, marginVertical: 10}}
        />
        <MetropolisLightText style={{fontSize: 12}}>
          {percentage}
        </MetropolisLightText>
      </View>
    </View>
  </View>
);

const StudentCourses = () => {
  const navigation = useNavigation();
  const renderItem = (item, index) => (
    <StudentCourseItem
      key={index.toString()}
      title={item.title}
      image={item.image}
      name={item.name}
      percentage={item.percentage}
      navigation={navigation}
    />
  );

  return <View style={{paddingHorizontal: 15}}>{DATA.map(renderItem)}</View>;
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

export default StudentCourses;
