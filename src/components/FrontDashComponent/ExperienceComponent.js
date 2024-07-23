import React, {memo} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import MetropolisSemiBoldText from '../Text/MetropolisSemiBoldText';
import ExperienceItem from '../ExperienceItem';

import {images} from '../../constants';
import color from '../color';
import useTestimonials from '../../hooks/useTestimonials';
import {BASE_API} from '../../services/API_URI';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Great Quality!',
    description:
      'Loved this place. Great collection of courses & the instructor know what their teaching very well. Great place for everyone to learn, 5 starto this site.',
    name: 'Sheldon Cooper',
    role: 'Student',
    country: 'USA',
    image: images.slider.slider3,
  },
  {
    title: 'Great Quality!',
    description:
      'Loved this place. Great collection of courses & the instructor know what their teaching very well. Great place for everyone to learn, 5 starto this site.',
    name: 'Sheldon Cooper',
    role: 'Student',
    country: 'USA',
    image: images.slider.slider3,
  },
  {
    title: 'Great Quality',
    description:
      'Loved this place. Great collection of courses & the instructor know what their teaching very well. Great place for everyone to learn, 5 starto this site.',
    name: 'Sheldon Cooper',
    role: 'Student',
    country: 'USA',
    image: images.slider.slider3,
  },
];

const ExperienceComponent = props => {
  const {isLoading, testimonials} = useTestimonials();

  const renderItem = ({item}) => (
    <ExperienceItem
      title={item?.title}
      image={{uri: BASE_API + item?.image_path}}
      description={item?.comment}
      name={item?.user_name}
      role={item?.user_designation}
    />
  );

  if (!testimonials?.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <MetropolisSemiBoldText style={styles.heading}>
        {'Experience With Dawraty'}
      </MetropolisSemiBoldText>
      <FlatList
        data={testimonials}
        renderItem={renderItem}
        keyExtractor={(_, index) => index}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  heading: {
    color: color.blue,
    fontSize: 18,
    marginBottom: 20,
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
});

export default memo(ExperienceComponent);
