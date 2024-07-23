import React, {useState} from 'react';
import {Platform, View} from 'react-native';
import FastImage from 'react-native-fast-image';

const MyImage = props => {
  const {style, source, tintColor, placeholder} = props;
  const [loaded, setLoaded] = useState(false);

  const onLoad = () => {
    setLoaded(true);
  };

  return (
    <View>
      {!loaded && (
        <View>
          <FastImage
            source={
              placeholder || require('../assets/images/ic_placeholder.png')
            }
            style={style}
          />
        </View>
      )}
      <FastImage
        style={[style, loaded ? {} : {width: 0, height: 0}]}
        source={source}
        tintColor={tintColor}
        onLoad={onLoad}
        fallback={Platform.OS == 'android'}
      />
    </View>
  );
};

export default MyImage;
