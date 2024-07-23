import {Checkbox} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {ListItem} from '@rneui/themed';

import {CourseDetailsContext} from '../../Screens/Dashboard/Dashboard/CourseFullDetails';
import MetropolisSemiBoldText from '../Text/MetropolisSemiBoldText';

import color from '../color';
import {useTranslation} from 'react-i18next';
import {lessonCompletionUpdate} from '../../services/course';
import {useLoading} from '../../context/Loading/LoadingContext';
import {errorToast, successToast} from '../../util/toastUtils';

const Lesson = ({courseId, title, lesson, isChecked, onPress}) => {
  const [checked, setChecked] = useState(isChecked);
  const {t} = useTranslation();
  const {setIsLoading} = useLoading();

  const onChangeState = async isSelected => {
    try {
      const payload = {
        course_id: +courseId,
        chapter_id: +lesson?.chapter_id,
        lesson_id:
          lesson?.type === 'quiz' ? +lesson?.id : +lesson?.media[0]?.lesson_id,
      };
      setIsLoading(true);
      const resp = await lessonCompletionUpdate(payload);
      setIsLoading(false);
      setChecked(isSelected);
      if (resp.data?.success) {
        successToast(t('alertMessage.lessonCompleted'));
      } else {
        errorToast(t('alertMessage.wrong'));
      }
    } catch (err) {
      console.log('[Item - onChangeState] Error : ', err?.response?.data);
      setIsLoading(false);
      errorToast(t('alertMessage.wrong'));
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: 10,
      }}>
      <Checkbox
        accessibilityLabel="item"
        isChecked={checked}
        onChange={onChangeState}
      />
      <MetropolisSemiBoldText
        style={{fontSize: 14, marginLeft: 10, marginTop: 3}}>
        {title}
      </MetropolisSemiBoldText>
      {/* <View style={{flex: 1, marginLeft: 15}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 8,
            marginBottom: 10,
          }}>
          <View
            style={{
              padding: 3,
              backgroundColor: `${color.black}80`,
              marginRight: 10,
              borderRadius: 100,
            }}>
            <Icon
              name="caret-forward"
              size={15}
              color={color.white}
              style={{marginLeft: 1}}
            />
          </View>
          <MetropolisLightText style={{fontSize: 12}}>
            {minute}
          </MetropolisLightText>
        </View>
      </View> */}
    </Pressable>
  );
};

const CourseContentItem = props => {
  const {courseId, name, lessons, onLessonPress, onLessonItemPress, expanded} =
    props;

  const {currentLesson} = useContext(CourseDetailsContext);

  const {t} = useTranslation();

  const [isExpanded, setExpanded] = useState(false);

  useEffect(() => {
    if (expanded) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  }, [expanded]);

  return (
    <ListItem.Accordion
      containerStyle={{
        backgroundColor: color.greyNew,
        borderRadius: 10,
      }}
      style={{
        backgroundColor: color.greyNew,
      }}
      content={
        <ListItem.Content>
          <MetropolisSemiBoldText style={{fontSize: 14}}>
            {name}
          </MetropolisSemiBoldText>
        </ListItem.Content>
      }
      onPress={() => {
        onLessonPress();
        setExpanded(prevState => !prevState);
      }}
      isExpanded={isExpanded}>
      {lessons.map((lesson, index) => {
        return (
          <View
            key={lesson?.id}
            style={
              currentLesson?.id === lesson.id
                ? {marginTop: 15, backgroundColor: '#cfe3f8'}
                : {marginTop: 15}
            }>
            <Lesson
              courseId={courseId}
              lesson={lesson}
              title={t('dynamic', {
                en: lesson.name,
                ar: lesson?.translation?.value ?? lesson.name,
              })}
              type={lesson.type}
              isChecked={!!lesson?.student_update_lesson}
              onPress={onLessonItemPress.bind(null, lesson)}
            />
          </View>
        );
      })}
    </ListItem.Accordion>
  );
};

const CourseContent = () => {
  const {t} = useTranslation();

  const {
    courseDetails,
    currentLesson,
    setCurrentLesson,
    currentChapter,
    setCurrentChapter,
    view,
    setView,
    setVideoUrl,
    setIsDownloadable,
  } = useContext(CourseDetailsContext);

  const renderItem = ({item, index}) => {
    return (
      <SafeAreaView>
        <CourseContentItem
          courseId={courseDetails?.id}
          name={t('dynamic', {
            en: item.name,
            ar: item?.translation?.value ?? item.name,
          })}
          onLessonPress={() => {
            setCurrentChapter(item);
          }}
          lessons={item.lessons}
          onLessonItemPress={lesson => {
            setCurrentLesson(lesson);
            if (lesson?.type === 'quiz') {
              setView(lesson?.type);
            } else {
              setView(lesson?.media[0].media_type);
              setVideoUrl(lesson?.media[0]?.url);
              setIsDownloadable(lesson?.media?.[0]?.is_downloadable === 1);
            }
          }}
          expanded={currentChapter?.id === item?.id}
        />
      </SafeAreaView>
    );
  };

  return (
    <FlatList
      data={courseDetails?.chapter ?? []}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      // contentContainerStyle={{
      //   flexGrow: 1,
      // }}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
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
    width: widthPercentageToDP('50%'),
    height: widthPercentageToDP('40%'),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'contain',
  },
});

export default CourseContent;
