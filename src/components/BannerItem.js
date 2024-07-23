import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import MetropolisSemiBoldText from './Text/MetropolisSemiBoldText';

import color from './color';

const BannerItem = props => {
  const {id, title, bgImg, btnText, onPress} = props;
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
            {btnText}
          </MetropolisSemiBoldText>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const bannerStyle = StyleSheet.create({
  imageBgContainer: {
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageBgImg: {
    height: '100%',
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

export default BannerItem;
