import {StackActions, useFocusEffect} from '@react-navigation/native';
import React, {useRef} from 'react';
// import VideoPlayer from 'react-native-video-controls';
import VideoPlayer from 'react-native-media-console';
import RNScreenshotPrevent from 'react-native-screenshot-prevent';

const VideoPlayerScreen = ({navigation, route}) => {
  const {
    url,
    isPrevent = true,
    currentTime,
    onUpdateCurrentTime,
  } = route.params;

  const currentTimeRef = useRef(0);

  const handleProgress = progress => {
    currentTimeRef.current = progress.currentTime;
  };

  const videoPlayerRef = useRef(null);
  useFocusEffect(
    React.useCallback(() => {
      if (isPrevent) {
        if (!__DEV__) {
          RNScreenshotPrevent.enabled(true);
          RNScreenshotPrevent.enableSecureView();
        }
      }
      return () => {
        if (isPrevent) {
          if (!__DEV__) {
            RNScreenshotPrevent.enabled(false);
            RNScreenshotPrevent.disableSecureView();
          }
        }
      };
    }, [isPrevent]),
  );

  useFocusEffect(() => {
    return () => {
      videoPlayerRef.current?.methods?.togglePlayPause?.();
    };
  });

  console.log('currentTime: ', currentTime);

  return (
    <VideoPlayer
      pictureInPicture={true}
      playInBackground={false}
      playWhenInactive={true}
      ignoreSilentSwitch="ignore"
      ref={videoPlayerRef}
      source={{uri: url}}
      currentTime={currentTime}
      navigator={navigation}
      resizeMode="contain"
      onBack={() => {
        onUpdateCurrentTime(currentTimeRef.current);
        navigation.dispatch(StackActions.pop(1));
      }}
    />
  );
};

export default VideoPlayerScreen;
