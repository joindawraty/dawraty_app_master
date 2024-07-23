import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import color from '../color';
import {BASE_API} from '../../services/API_URI';
import {useNavigation} from '@react-navigation/native';
import dummyData from '../../data/dummyData';
const {width: screenWidth} = Dimensions.get('window');
import MetropolisBoldText from '../Text/MetropolisBoldText';
import MetropolisRegularText from '../Text/MetropolisRegularText';
import MetropolisSemiBoldText from '../Text/MetropolisSemiBoldText';

const BannerItem = props => {
  const {id, title, bgImg, onPress} = props;
  return (
    <ImageBackground
      key={id}
      source={bgImg} // {uri: BASE_API + (item.course_image || item.image_path)}}
      resizeMode="cover"
      imageStyle={bannerStyle.imageBgImg}
      style={bannerStyle.imageBgContainer}>
      <View style={bannerStyle.contentContainer}>
        <MetropolisSemiBoldText style={bannerStyle.titleStyle}>
          {title}
        </MetropolisSemiBoldText>
        <TouchableOpacity onPress={onPress}>
          <MetropolisSemiBoldText style={bannerStyle.btnStyle}>
            {'Join Now'}
          </MetropolisSemiBoldText>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const bannerStyle = StyleSheet.create({
  imageBgContainer: {
    height: 210,
    marginHorizontal: 15,
    backgroundColor: 'pink',
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageBgImg: {
    height: 210,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000020',
  },
  titleStyle: {
    color: color.white,
    fontSize: 20,
    marginBottom: 5,
  },
  btnStyle: {
    color: '#fff',
    backgroundColor: color.blue,
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

const Slider = props => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [courses, setCourses] = useState([]);
  const carouselRef = useRef();
  const navigation = useNavigation();

  // let timer = null;

  useEffect(() => {
    if (props.courses) {
      setCourses(props.courses);
    }
  }, [props.courses]);

  // useEffect(() => {
  //   timer = setInterval(() => {
  //     if (carouselRef.current != null) {
  //       if (activeSlide == 2) {
  //         carouselRef.current.snapToItem(0);
  //         setActiveSlide(0);
  //       } else {
  //         let active = activeSlide;
  //         active++;
  //         carouselRef.current.snapToItem(active);
  //         setActiveSlide(active);
  //       }
  //     }
  //   }, 2000);
  //   return clearInterval(timer);
  // }, []);

  const renderItem = ({item, index}) => {
    const {id, title, bgImage} = item;
    return (
      <BannerItem id={id} title={title} bgImg={bgImage} onPress={() => {}} />
    );
  };

  // const pagination = () => {
  //   return (
  //     <Pagination
  //       dotsLength={courses.length}
  //       activeDotIndex={activeSlide}
  //       dotStyle={{
  //         width: 10,
  //         height: 10,
  //         borderRadius: 5,
  //         backgroundColor: color.blue,
  //       }}
  //       inactiveDotStyle={{
  //         backgroundColor: '#fff',
  //       }}
  //       inactiveDotOpacity={0.9}
  //       inactiveDotScale={0.6}
  //     />
  //   );
  // };

  return (
    <Carousel
      ref={carouselRef}
      loop={dummyData.dashboard.banner > 1}
      sliderWidth={screenWidth}
      itemWidth={screenWidth - 0}
      activeSlideOffset={activeSlide}
      // onSnapToItem={index => setActiveSlide(index)}
      data={dummyData.dashboard.banner}
      renderItem={renderItem}
      hasParallaxImages={true}
      containerCustomStyle={styles.container}
      pagingEnabled={true}
      // enableMomentum={true}
      // decelerationRate={0.9}
    />

    // {/* <View style={{bottom: 0, left: 120, right: 120, position: 'absolute'}}>
    //   {pagination()}
    // </View> */}
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    backgroundColor: '#fff',
  },
  mainContainer: {},
  addPhoto: {
    width: wp('100%'),
    height: hp('35%'),
    resizeMode: 'contain',
    borderRadius: 20,
  },
});

export default Slider;
