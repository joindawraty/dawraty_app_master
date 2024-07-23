import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {images} from '../../constants';
import color from '../color';
import {BASE_API} from '../../services/API_URI';
const {width: screenWidth} = Dimensions.get('window');
const {slider, logo} = images;

const styles = StyleSheet.create({
  mainContainer: {},
  addPhoto: {
    width: wp('100%'),
    height: hp('35%'),
    resizeMode: 'contain',
    borderRadius: 20,
  },
});

const Slider = props => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [banners, setBanners] = useState([]);
  const carouselRef = useRef();

  let timer = null;

  useEffect(() => {
    console.log('Banners', props.banners);
    if (props.banners) {
      setBanners(props.banners);
    }
  }, [props.banners]);

  useEffect(() => {
    timer = setInterval(() => {
      if (carouselRef.current != null) {
        if (activeSlide == 2) {
          carouselRef.current.snapToItem(0);
          setActiveSlide(0);
        } else {
          let active = activeSlide;
          active++;
          carouselRef.current.snapToItem(active);
          setActiveSlide(active);
        }
      }
    }, 2000);
    return clearInterval(timer);
  }, []);

  const _renderItem = ({item}) => {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column', backgroundColor: '#fff'}}>
            <Image
              source={{uri: BASE_API + item.image_path}}
              style={styles.addPhoto}
            />
          </View>
        </View>
        {/* <View style={{flexDirection:'row', position:'absolute',top:80}}>
                        <View style={{flexDirection:'column', flex:1, alignItems:'center'}}>
                            <Text style={{color:'#fff', fontSize:20, fontWeight:'700'}}>{item.name}</Text>
                            <TouchableOpacity><Text style={{color:'#fff', backgroundColor:color.blue, padding:5, paddingLeft:20,paddingRight:20,marginTop:10, borderRadius:10}}>Join Now</Text></TouchableOpacity>
                        </View>
                    </View> */}
      </View>
    );
  };

  const pagination = () => {
    return (
      <Pagination
        dotsLength={banners.length}
        activeDotIndex={activeSlide}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: color.blue,
        }}
        inactiveDotStyle={{
          backgroundColor: '#fff',
        }}
        inactiveDotOpacity={0.9}
        inactiveDotScale={0.6}
      />
    );
  };
  return (
    <View style={{flex: 1}}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 0}
        activeSlideOffset={activeSlide}
        onSnapToItem={index => setActiveSlide(index)}
        data={banners}
        renderItem={_renderItem}
        hasParallaxImages={true}
        pagingEnabled={true}
        containerCustomStyle={{
          marginTop: 0,
          backgroundColor: '#fff',
        }}
      />

      <View style={{bottom: 0, left: 120, right: 120, position: 'absolute'}}>
        {pagination()}
      </View>
    </View>
  );
};

export default Slider;
