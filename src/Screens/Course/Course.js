import React from 'react';
import {FlatList, View, SafeAreaView} from 'react-native';

import SearchBar from '../../components/FrontDashComponent/SearchBar';
import StudentCourseItem from '../../components/StudentCoursesItem';

import color from '../../components/color';
import {images} from '../../constants';
import useStudentCourses from '../../hooks/useStudentCourses';
import {BASE_API} from '../../services/API_URI';
import {getTranslationFromMany} from '../../util/misc';
import {useTranslation} from 'react-i18next';
import MetropolisSemiBoldText from '../../components/Text/MetropolisSemiBoldText';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
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
  {
    title: 'Biophysics Lecture',
    name: 'Khalid Ali-Rajhi',
    percentage: null,
    image: images.slider.slider3,
  },
];

const Course = props => {
  const {t} = useTranslation();
  const {isLoading, courses, refresh} = useStudentCourses();

  const renderItem = ({item}) => {
    try {
      const {course_id, courses} = item;
      const {name, course_image, instructor} = courses;
      const {first_name, last_name} = instructor;

      let count = 0;
      let completedLectures = 0;
      let completed = 0;
      courses?.chapter?.map(_item => {
        count += _item?.lessons_count;
        completedLectures += _item?.student_update_lesson?.length;
      });
      completed = (completedLectures / count) * 100;

      return (
        <StudentCourseItem
          image={{uri: BASE_API + course_image}}
          title={t('dynamic', {
            en: name,
            ar: getTranslationFromMany(courses?.translation, 'name', name),
          })}
          name={t(
            'courseAuthors.' + first_name + ' ' + last_name,
            first_name + ' ' + last_name,
          )}
          percentage={Math.round(completed) ?? 0}
          id={course_id}
          navigation={props.navigation}
          translation={courses?.translation}
        />
      );
    } catch (err) {
      console.log('Error : ', err?.message);
      return null;
    }
  };

  const renderListEmptyComponent = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <MetropolisSemiBoldText>
          {t('common.noResultFound')}
        </MetropolisSemiBoldText>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color.white}}>
      <SearchBar placeholder={t('common.search')} />
      <FlatList
        data={courses}
        renderItem={renderItem}
        keyExtractor={(item, index) => item?.course_id ?? index?.toString()}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 15,
        }}
        onRefresh={refresh}
        refreshing={isLoading}
        ListEmptyComponent={renderListEmptyComponent}
      />
      {/* <LetsContinueComponent /> */}
      {/* <NewCourseComponent /> */}
    </SafeAreaView>
  );
};
export default Course;
