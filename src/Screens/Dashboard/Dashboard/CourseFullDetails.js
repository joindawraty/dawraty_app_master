import React, {
  useEffect,
  useState,
  createContext,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
  SafeAreaView,
  Animated,
  TouchableOpacity,
} from 'react-native';
// import {NativeModules} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SceneMap} from 'react-native-tab-view';
// import VideoPlayer from 'react-native-video-controls';
import VideoPlayer from 'react-native-media-console';
import RenderHTML from 'react-native-render-html';
import {useTranslation} from 'react-i18next';
import {
  useFocusEffect,
  useNavigation,
  useIsFocused,
} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import * as ScreenCapture from 'expo-screen-capture';

import {useLoading} from '../../../context/Loading/LoadingContext';

import MetropolisSemiBoldText from '../../../components/Text/MetropolisSemiBoldText';
import CourseContent from '../../../components/Dashboard/CourseContent';
import SmallRoundedBtn from '../../../components/SmallRoundedButton';
import Question from '../../../components/Dashboard/Question';
import AboutCourse from '../../Course/AboutCourse';
import MyImage from '../../../components/MyImage';
import {Item} from '../../../components/TabContent.js/Tabcontent';

import {
  getInstructorCourses,
  getStudentCourses,
} from '../../../services/course';
import {useSelector} from 'react-redux';

import util from '../../../util';
import color from '../../../components/color';
import RoutePaths from '../../../util/RoutePaths';
import {BASE_API} from '../../../services/API_URI';
import {errorToast} from '../../../util/toastUtils';
import {appConstants, fonts} from '../../../constants';
import {getTranslationFromMany} from '../../../util/misc';
import RNScreenshotPrevent from 'react-native-screenshot-prevent';
import {useOrientation} from '../../../util/useOrientation';
import Video, {Orientation} from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialTopTabNavigator();
const {height: SCREEN_HEIGHT} = Dimensions.get('window');

function MyTabs(props) {
  const {tabBar} = props;
  const [isExpanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleExpanded = () => {
    const toValue = isExpanded ? 0 : SCREEN_HEIGHT;

    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setExpanded(!isExpanded);
  };

  const collapseStyle = {
    height: animation.interpolate({
      inputRange: [0, SCREEN_HEIGHT],
      outputRange: [0, SCREEN_HEIGHT],
    }),
  };

  const chevronContainerStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
  };

  return (
    <View style={styles.tabsContainer}>
      <Animated.View style={[styles.collapseContainer, collapseStyle]}>
        <Tab.Navigator style={{backgroundColor: 'white'}} tabBar={tabBar}>
          <Tab.Screen name="courseContent" component={CourseContent} />
          <Tab.Screen name="overview" component={AboutCourse} />
          <Tab.Screen name="qa" component={Question} />
        </Tab.Navigator>
      </Animated.View>
      <View style={chevronContainerStyle}>
        <TouchableOpacity onPress={toggleExpanded}>
          <Icon
            name={isExpanded ? 'chevron-down' : 'chevron-up'}
            size={20}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const CourseDetailsContext = createContext(null);

const renderScene = SceneMap({
  courseContent: CourseContent,
  overview: AboutCourse,
  qa: Question,
});

function CourseFullDetails(props) {
  // const {ScreenShieldRN} = NativeModules;

  // const isFocused = useIsFocused();

  // console.log(ScreenShieldRN);

  // const activate = async () => {
  //   await ScreenCapture.preventScreenCaptureAsync();
  // };

  // const deactivate = async () => {
  //   await ScreenCapture.allowScreenCaptureAsync();
  // };

  // if (isFocused) {
  //   activate();
  //   // ScreenShieldRN.protectScreenRecording();
  // } else {
  //   deactivate();
  // }

  const orientation = useOrientation();
  const courseId = props?.route?.params?.courseId;
  const {setIsLoading} = useLoading();

  const {userData} = useSelector(state => state.user);

  const navigation = useNavigation();

  const {t} = useTranslation();

  const routes = useMemo(() => {
    return [
      {key: 'courseContent', title: t('course.courseContent')},
      {key: 'overview', title: t('common.overview')},
      {key: 'qa', title: t('common.Q&A')},
    ];
  }, [t]);

  const renderTabBar = useCallback(
    tabProps => {
      return (
        <SafeAreaView
          style={{
            flexDirection: 'row',
            marginTop: 15,
            borderBottomColor: color.black,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}>
          {routes.map((item, tabIndex) => {
            return (
              <SafeAreaView>
                <Item
                  key={tabIndex}
                  title={item.title}
                  active={tabProps.navigationState.index}
                  setActive={() => {
                    tabProps?.navigation?.navigate(item.key);
                  }}
                  index={tabIndex}
                />
              </SafeAreaView>
            );
          })}
        </SafeAreaView>
      );
    },
    [routes],
  );

  const layout = useWindowDimensions();

  const safeAreaInsets = useSafeAreaInsets();

  const [index, setIndex] = React.useState(0);
  const [courseDetails, setCourseDetails] = React.useState(null);
  const [currentLesson, setCurrentLesson] = React.useState(null);
  const [currentChapter, setCurrentChapter] = React.useState(null);
  const [view, setView] = React.useState(null);

  const [videoUrl, setVideoUrl] = React.useState(null);
  const [isDownloadable, setIsDownloadable] = React.useState(null);

  const playerRef = useRef(null);
  const isPresentingVideoScreen = useRef(false);
  const isPresentingPDFScreen = useRef(false);

  useFocusEffect(
    useCallback(() => {
      if (props?.route?.params?.isLessonCompleted) {
        setCurrentLesson(prevState => {
          return {
            ...prevState,
            student_update_lesson: true,
          };
        });
        delete props?.route?.params?.isLessonCompleted;
      }

      return () => {
        if (playerRef?.current?.state?.paused === false) {
          playerRef.current?.methods?.togglePlayPause?.();
        }

        // if (playerRef?.current?.state?.isFullscreen === true) {
        //   playerRef.current?.methods?.toggleFullscreen?.();
        // }
      };
    }, [props?.route?.params?.isLessonCompleted]),
  );

  const getDetails = async () => {
    try {
      let res = null;
      if (userData.user?.type === appConstants.Student) {
        res = await getStudentCourses(courseId);
      } else {
        res = await getInstructorCourses(courseId);
      }
      if (res) {
        setCourseDetails(res.data?.data ?? null);

        if (
          res.data?.data?.chapter[0]?.lessons[0]?.media[0]?.is_downloadable ===
          1
        ) {
          setIsDownloadable(true);
        }
        setVideoUrl(res.data?.data?.chapter[0]?.lessons[0]?.media[0]?.url);
        setCurrentLesson(res.data?.data?.chapter[0]?.lessons[0]);
        setView(
          res.data?.data?.chapter[0]?.lessons[0]?.quiz?.length > 0
            ? 'quiz'
            : res.data?.data?.chapter[0]?.lessons[0]?.media[0]?.media_type,
        );
      }
    } catch (err) {
      console.log(
        '[getDetails] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      isPresentingVideoScreen.current = false;
      if (!__DEV__) {
        RNScreenshotPrevent.enabled(true);
        RNScreenshotPrevent.enableSecureView();
      }
      return () => {
        if (!isPresentingVideoScreen.current) {
          setTimeout(() => {
            if (!__DEV__) {
              RNScreenshotPrevent.enabled(false);
              RNScreenshotPrevent.disableSecureView();
            }
          }, 500);
        }
      };
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      isPresentingPDFScreen.current = false;
      if (!__DEV__) {
        RNScreenshotPrevent.enabled(true);
        RNScreenshotPrevent.enableSecureView();
      }
      return () => {
        if (!isPresentingPDFScreen.current) {
          setTimeout(() => {
            if (!__DEV__) {
              RNScreenshotPrevent.enabled(false);
              RNScreenshotPrevent.disableSecureView();
            }
          }, 500);
        }
      };
    }, []),
  );

  // for getting video player sizing
  const {width} = Dimensions.get('window');
  const aspectRatio = 16 / 9;
  const mediaWidth = width * 0.8;
  const mediaHeight = mediaWidth / aspectRatio;

  const currentTimeRef = useRef(0);

  const handleProgress = progress => {
    currentTimeRef.current = progress.currentTime;
  };

  const onUpdateCurrentTime = time => {
    currentTimeRef.current = time;
  };

  return (
    <CourseDetailsContext.Provider
      value={{
        courseDetails,
        currentLesson,
        currentChapter,
        setCurrentChapter: chapterPayload => {
          setCurrentChapter(chapterPayload);
        },
        setCurrentLesson: lessonPayload => {
          setCurrentLesson(lessonPayload);
        },
        view,
        setView: nextView => {
          setView(nextView);
        },
        setVideoUrl: url => {
          setVideoUrl(url);
        },
        setIsDownloadable: downloadable => {
          setIsDownloadable(downloadable);
        },
      }}>
      <ScrollView
        style={{flex: 1, backgroundColor: color.white}}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <SafeAreaView
          style={
            orientation === 'PORTRAIT'
              ? {
                  paddingHorizontal: 15,
                  marginBottom: 15,
                  height: mediaHeight,
                }
              : {
                  // paddingHorizontal: 15,
                  marginBottom: 15,
                  height: '60%',
                }
          }>
          {view === 'video' ? (
            <Video
              source={{uri: BASE_API + videoUrl}} // Can be a URL or a local file.
              style={
                orientation === 'PORTRAIT'
                  ? {
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'black',
                    }
                  : {
                      width: '80%',
                      height: '80%',
                      backgroundColor: 'black',
                    }
              }
              controls={true}
              pictureInPicture={true}
              playInBackground={true}
              playWhenInactive={true}
              ignoreSilentSwitch="ignore"
            />
          ) : view === 'pdf' ? (
            <SafeAreaView
              style={{
                height: 210,
                justifyContent: 'center',
              }}>
              <MetropolisSemiBoldText
                numberOfLines={2}
                style={{
                  textAlign: 'center',
                  // marginBottom: 15,
                }}>
                {t('dynamic', {
                  en: currentLesson.name,
                  ar: currentLesson?.translation?.value ?? currentLesson.name,
                })}
              </MetropolisSemiBoldText>
              <SmallRoundedBtn
                text={t('course.openDocument')}
                onPress={() => {
                  isPresentingPDFScreen.current = true;
                  navigation.navigate(RoutePaths.pdfView, {
                    link: BASE_API + currentLesson?.media?.[0]?.url,
                    isDownloadable,
                  });
                }}
                containerStyle={{
                  width: '50%',
                  backgroundColor: color.blue,
                  alignSelf: 'center',
                  paddingVertical: 10,
                  marginVertical: 10,
                }}
                textStyle={{
                  color: color.white,
                  fontSize: 14,
                }}
              />
              {isDownloadable ? (
                <SmallRoundedBtn
                  text={t('course.downloadDocument')}
                  onPress={async () => {
                    if (isDownloadable) {
                      try {
                        setIsLoading(true);
                        await util.MethodUtils.downloadDocument(
                          BASE_API + currentLesson?.media?.[0]?.url,
                        );
                        setIsLoading(false);
                      } catch (err) {
                        console.log('Error : ', err?.message);
                        errorToast(t('alertMessage.wrong'));
                        setIsLoading(false);
                      }
                    } else {
                      errorToast(t('common.contentNotDownloadable'));
                    }
                  }}
                  containerStyle={{
                    width: '50%',
                    backgroundColor: color.blue,
                    alignSelf: 'center',
                    paddingVertical: 10,
                    // marginVertical: 10,
                  }}
                  textStyle={{
                    color: color.white,
                    fontSize: 14,
                  }}
                />
              ) : null}
            </SafeAreaView>
          ) : view === 'image' ? (
            <MyImage
              src={BASE_API + videoUrl}
              style={{
                height: 210,
                width: '100%',
              }}
              resizeMode="cover"
            />
          ) : view === 'quiz' ? (
            <View
              style={{
                height: 210,
                justifyContent: 'center',
              }}>
              <MetropolisSemiBoldText
                numberOfLines={2}
                style={{
                  textAlign: 'center',
                  // marginBottom: 15,
                }}>
                {t('dynamic', {
                  en: currentLesson.name,
                  ar: currentLesson?.translation?.value ?? currentLesson.name,
                })}
              </MetropolisSemiBoldText>
              <SmallRoundedBtn
                text={t('course.startQuiz')}
                onPress={() => {
                  navigation.navigate(RoutePaths.quizView, {
                    lesson: currentLesson,
                    courseId,
                  });
                }}
                containerStyle={{
                  width: '50%',
                  backgroundColor: color.blue,
                  alignSelf: 'center',
                  paddingVertical: 10,
                  // marginVertical: 10,
                }}
                textStyle={{
                  color: color.white,
                  fontSize: 14,
                }}
              />
            </View>
          ) : view === 'audio' ? null : null}
        </SafeAreaView>
        <View style={{paddingHorizontal: 15}}>
          <MetropolisSemiBoldText style={{color: color.black, fontSize: 16}}>
            {t('dynamic', {
              ar: getTranslationFromMany(
                courseDetails?.translation,
                'name',
                courseDetails?.name,
              ),
              en: courseDetails?.name,
            })}
          </MetropolisSemiBoldText>
          <RenderHTML
            contentWidth={
              orientation === 'PORTRAIT'
                ? Dimensions.get('window').width
                : '80%'
            }
            defaultTextProps={styles.defaultTextProps}
            source={{
              html: t('dynamic', {
                ar:
                  getTranslationFromMany(
                    courseDetails?.translation,
                    'description',
                    courseDetails?.description?.replace(/<[^>]*>/g, '') ?? '',
                  ).replace(/<[^>]*>/g, '') ?? '',
                en: courseDetails?.description?.replace(/<[^>]*>/g, '') ?? '',
              }),
            }}
          />
        </View>
        <MyTabs tabBar={renderTabBar} />
      </ScrollView>
    </CourseDetailsContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  item: {
    backgroundColor: '#f9c2ff',
  },
  title: {
    fontSize: 32,
  },
  defaultTextProps: {
    style: {
      fontFamily: fonts.MetropolisRegular,
      lineHeight: 16,
      fontSize: 12,
      color: color.blue,
      // marginTop: 10,
      textAlign: 'left',
    },
  },
  tabsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  collapseContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  chevronContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default CourseFullDetails;
