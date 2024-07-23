import React, {memo, useRef} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import BannerItem from './BannerItem';

import {BASE_API} from '../services/API_URI';
import useBanners from '../hooks/useBanners';
import {useNavigation} from '@react-navigation/native';
import RoutePaths from '../util/RoutePaths';
import {useOrientation} from '../util/useOrientation';

const BannerSlider = props => {
  // const [activeSlide, setActiveSlide] = useState(0);

  const orientation = useOrientation();

  const carouselRef = useRef(null);
  const navigation = useNavigation();
  const {banners} = useBanners();

  const listHeight = useRef(
    ((Dimensions.get('screen').width - 30) * 1251) / 2668,
  );

  const renderItem = ({item, index}) => {
    const {
      button_text, // : "All Courses"
      created_at, // : "2021-09-18T08:32:32.000000Z"
      description, // : null
      id, // : 5
      image_name, // : "61477693e4df11632073363.png"
      image_path, // : "/storage/banner/61477693e4df11632073363.png"
      preference, // : 1
      title, // : null
      updated_at, // : "2022-09-29T11:49:47.000000Z"
      url, // : https://www.dawratycourses.com/courses/all
    } = item;
    return (
      <BannerItem
        id={id}
        title={title}
        bgImg={{uri: BASE_API + image_path}}
        btnText={button_text}
        onPress={() => {
          navigation.navigate(RoutePaths.courses);
        }}
      />
    );
  };

  const onSnapToItemHandler = index => {
    // this.setState({activeSlide: index});
  };

  if (!banners?.length) {
    return null;
  }

  return (
    <Carousel
      ref={carouselRef}
      data={banners ?? []}
      renderItem={renderItem}
      loop={true}
      autoplay={!__DEV__}
      autoplayDelay={2000}
      onSnapToItem={onSnapToItemHandler}
      sliderWidth={
        orientation === 'PORTRAIT'
          ? Dimensions.get('screen').width - 30
          : Dimensions.get('screen').width - 30
      }
      itemWidth={
        orientation === 'PORTRAIT'
          ? Dimensions.get('screen').width - 30
          : Dimensions.get('screen').width - 30
      }
      itemHeight={listHeight.current}
      sliderHeight={listHeight.current}
      containerCustomStyle={{flexGrow: 0}}
      pagingEnabled={true}
      contentContainerCustomStyle={[
        sliderStyle.customContainer,
        props?.style,
        {
          height: listHeight.current,
        },
      ]}
    />
  );
};

const sliderStyle = StyleSheet.create({
  customContainer: {
    marginVertical: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default memo(BannerSlider);
